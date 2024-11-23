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
    bike.inStock = false; // Mark as out of stock
  }
  await bike.save();
  const totalPrice = bike.price * quantity;

  const newOrder = new Ordermodel({
    email,
    product: bike._id,
    quantity,
    totalPrice,
  });
  await newOrder.save(); // Save the order

  return newOrder;
};

export const orderService = {
  createOrder,
};
