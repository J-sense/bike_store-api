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

export const bikeService = {
  createProducInDb,
  findall,
};
