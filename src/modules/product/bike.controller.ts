import { Response, Request } from 'express';
import { bikeService } from './bike.service';

const createBike = async (req: Request, res: Response) => {
  try {
    const product = req.body.data;
    console.log(product);
    const result = await bikeService.createProducInDb(product);
    res.status(200).json({
      message: 'Product created successfully',
      success: true,
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

export const bikeController = {
  createBike,
};
