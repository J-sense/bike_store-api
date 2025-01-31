import { BikeModel } from '../product/bike.modal';
import { User } from '../user/user.model';
import { IOrder } from './order.interface';
import { Ordermodel } from './order.model';
import { orderUtils } from './utilis';

// const createOrder = async (
//   email: string,
//   productId: string,
//   quantity: number,
// ) => {
//   const bike = await BikeModel.findById(productId);
//   if (!bike) {
//     throw new Error('Bike not found');
//   }
//   if (bike.quantity < quantity) {
//     throw new Error('Not enough stock available');
//   }

//   bike.quantity -= quantity;
//   if (bike.quantity === 0) {
//     bike.inStock = false;
//   }
//   await bike.save();
//   const totalPrice = bike.price * quantity;
//   const isUserExist = await User.findOne({ email: email });
//   if (!isUserExist) {
//     throw new Error('Not enough stock available');
//   }
//   const newOrder = new Ordermodel({
//     email,
//     product: bike._id,
//     quantity,
//     totalPrice,
//   });
//   await newOrder.save();

//   return newOrder;
// };
const orderCreate = async (orderData: IOrder, client_ip: string) => {
  const { email } = orderData;
  const isUSerExist = await User.findOne({ email: email });
  if (!isUSerExist) {
    throw new Error('User not Exist');
  }
  const productExist = await BikeModel.findById(orderData.product);
  if (!productExist) {
    throw new Error('Product is not exist');
  }
  let totalPrice;
  if (productExist) {
    totalPrice = orderData.totalPrice = orderData.quantity * productExist.price;
  }
  let result = await Ordermodel.create(orderData);
  const shorjopayPayload = {
    amount: totalPrice,
    order_id: result._id,
    currency: 'BDT',
    customer_name: 'N/A',
    customer_address: 'N/A',
    customer_email: 'N/A',
    customer_phone: 'N/A',
    customer_city: 'N/A',
    client_ip,
  };
  const payment = await orderUtils.makePayment(shorjopayPayload);
  if (payment?.transactionStatus) {
    result = await Ordermodel.updateOne({
      transaction: {
        id: payment.sp_order_id,
        transactionStatus: payment.transactionStatus,
      },
    });
  }

  return payment.checkout_url;
};
const verifyPayment = async (order_id: string) => {
  try {
    const verifiedPayment = await orderUtils.varifyPayment(order_id);
    if (verifiedPayment.length) {
      await Ordermodel.findOneAndUpdate(
        {
          'transaction.id': order_id,
        },
        {
          'transaction.bank_status': verifiedPayment[0].bank_status,
          'transaction.sp_code': verifiedPayment[0].sp_code,
          'transaction.sp_message': verifiedPayment[0].sp_message,
          'transaction.transactionStatus':
            verifiedPayment[0].transaction_status,
          'transaction.method': verifiedPayment[0].method,
          'transaction.date_time': verifiedPayment[0].date_time,
          status:
            verifiedPayment[0].bank_status == 'Success'
              ? 'Paid'
              : verifiedPayment[0].bank_status == 'Failed'
                ? 'Pending'
                : verifiedPayment[0].bank_status == 'Cancel'
                  ? 'Cancelled'
                  : '',
        },
      );
    }
    return verifiedPayment; // ✅ Return the API response
  } catch (error) {
    console.error('Payment verification failed:', error);
    throw error; // ✅ Properly throw errors
  }
};
const calculateRevenue = async () => {
  const stats = await Ordermodel.aggregate([
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: '$totalPrice' },
        totalOrders: { $sum: 1 },
        avgRevenuePerOrder: { $avg: '$totalPrice' },
      },
    },
    {
      $project: {
        _id: 0,
        totalRevenue: 1,
      },
    },
  ]);
  return stats[0] || { totalRevenue: 0 };
};
const getAllOrder = async () => {
  const result = await Ordermodel.find();
  return result;
};
export const orderService = {
  orderCreate,
  calculateRevenue,
  getAllOrder,
  verifyPayment,
};
