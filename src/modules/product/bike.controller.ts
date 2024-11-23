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
  } catch (error: any) {
    res.status(500).json({
      message: 'An unexpected error occurred',
      success: false,
      error: error.message || 'Unknown error',
    });
  }
};
const findall = async (req: Request, res: Response) => {
  try {
    const result = await bikeService.findall();
    console.log(result);
    res.status(200).json({
      message: 'Products retrieved successfully',
      success: true,
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      message: 'An unexpected error occurred while retrieving products',
      success: false,
      error: error.message || 'Unknown error',
    });
  }
};

export const bikeController = {
  createBike,
  findall,
};
