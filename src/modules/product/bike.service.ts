import { IBike } from './bike.interface';
import { BikeModel } from './bike.modal';

const createProducInDb = async (product: IBike) => {
  const result = await BikeModel.create(product);
  return result;
};
const findall = async () => {
  const result = await BikeModel.find();
  return result;
};

const getoneproudct = async (id: string) => {
  const result = await BikeModel.findOne({ _id: id });
  return result;
};
const updateProduct = async (product: unknown, data: IBike) => {
  const { price, quantity } = data;
  const result = await BikeModel.findByIdAndUpdate(
    product,
    {
      price,
      quantity,
    },
    { new: true },
  );
  return result;
};

const deleteProduct = async (id: string) => {
  const result = await BikeModel.findOneAndDelete({ _id: id });
  return result;
};

export const bikeService = {
  createProducInDb,
  findall,
  getoneproudct,
  updateProduct,
  deleteProduct,
};
