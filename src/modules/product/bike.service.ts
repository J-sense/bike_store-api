import { IBike } from './bike.interface';
import { BikeModel } from './bike.modal';

const createProducInDb = async (product: IBike) => {
  const result = await BikeModel.create(product);
  return result;
};

export const bikeService = {
  createProducInDb,
};
