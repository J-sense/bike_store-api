// import { JwtPayload } from 'jsonwebtoken';
// import { JwtPayload } from 'jsonwebtoken';
import { BikeModel } from '../product/bike.modal';
// import { User } from '../user/user.model';
// import { IOrder } from './order.interface';
import { Ordermodel } from './order.model';
import { orderUtils } from './utilis';
import { IOrder } from './order.interface';
import { User } from '../user/user.model';
// import { IOrder } from './order.interface';

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
  const { email, quantity, product } = orderData;

  // Check if user exists
  const isUserExist = await User.findOne({ email });
  if (!isUserExist) {
    throw new Error('User does not exist');
  }

  // Check if product exists
  const productExist = await BikeModel.findById(product);
  if (!productExist) {
    throw new Error('Product does not exist');
  }

  // Calculate total price
  const totalPrice = quantity * (productExist.price || 0);

  // Create order
  const result = await Ordermodel.create({ ...orderData, totalPrice });

  // Payment payload
  const shorjopayPayload = {
    amount: totalPrice,
    order_id: result._id,
    currency: 'BDT',
    customer_name: 'N/A',
    customer_address: 'N/A',
    customer_email: email || 'N/A',
    customer_phone: 'N/A',
    customer_city: 'N/A',
    client_ip,
  };

  // Make payment
  const payment = await orderUtils.makePayment(shorjopayPayload);

  // If payment is successful, update the order with transaction details
  if (payment?.transactionStatus) {
    await Ordermodel.findByIdAndUpdate(
      result._id,
      {
        $set: {
          transaction: {
            id: payment.sp_order_id,
            transactionStatus: payment.transactionStatus,
          },
        },
      },
      { new: true },
    );
  }

  // ✅ Return the checkout URL for redirection
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
const yourOrders = async (id: string) => {
  const user = await User.findById(id);
  if (!user) {
    throw new Error('User not exist');
  }
  const result = await Ordermodel.find({ email: user.email });

  return result;
};
export const orderService = {
  orderCreate,
  calculateRevenue,
  getAllOrder,
  verifyPayment,
  yourOrders,
};
