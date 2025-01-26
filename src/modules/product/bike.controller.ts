import { Response, Request } from 'express';
import { bikeService } from './bike.service';
// import { BikeModel } from './bike.modal';

const createBike = async (req: Request, res: Response) => {
  try {
    const product = req.body;

    const result = await bikeService.createProducInDb(product);
    res.status(200).json({
      message: 'Product created successfully',
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: 'An unexpected error occurred',
      success: false,
      error: (error as Error).message || 'Unknown error',
    });
  }
};
const findall = async (req: Request, res: Response) => {
  try {
    console.log(req.query);
    const result = await bikeService.findall(req.query);
    res.status(200).json({
      message: 'Products retrieved successfully',
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: 'An unexpected error occurred while retrieving products',
      success: false,
      error: (error as Error).message || 'Unknown error',
    });
  }
};
const findOneProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const result = await bikeService.getoneproudct(id);

    if (!result) {
      res.status(404).json({
        message: 'Product not found.',
        success: false,
      });
      return;
    }

    res.status(200).json({
      message: 'Product retrieved successfully.',
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: 'An unexpected error occurred while retrieving the product.',
      success: false,
      error: (error as Error).message || 'Unknown error',
    });
  }
};
const updateProduct = async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id;
    const data = req.body;
    const result = await bikeService.updateProduct(id, data);
    res.status(200).json({
      message: 'Product updated successfully.',
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(200).json({
      message:
        (error as Error).message ||
        'Failed to update product price and quantity.',
      success: true,
    });
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const result = await bikeService.deleteProduct(id);
    res.status(200).json({
      message: 'Bike Deleted Successfully',
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(200).json({
      message: (error as Error).message,
      success: true,
      data: false,
    });
  }
};

export const bikeController = {
  createBike,
  findall,
  updateProduct,
  deleteProduct,
  findOneProduct,
};
