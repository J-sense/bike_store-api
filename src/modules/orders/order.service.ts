import { BikeModel } from '../product/bike.modal';
import { Ordermodel } from './order.model';

const createOrder = async (
  email: string,
  productId: string,
  quantity: number,
) => {
  const bike = await BikeModel.findById(productId);
  if (!bike) {
    throw new Error('Bike not found');
  }
  if (bike.quantity < quantity) {
    throw new Error('Not enough stock available');
  }

  bike.quantity -= quantity;
  if (bike.quantity === 0) {
    bike.inStock = false;
  }
  await bike.save();
  const totalPrice = bike.price * quantity;

  const newOrder = new Ordermodel({
    email,
    product: bike._id,
    quantity,
    totalPrice,
  });
  await newOrder.save();

  return newOrder;
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

export const orderService = {
  createOrder,
  calculateRevenue,
};
