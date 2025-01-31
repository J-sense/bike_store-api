import { NextFunction, Request, Response } from 'express';
import { orderService } from './order.service';

// const orderService = require('../services/orderService');

// const createOrder = async (req: Request, res: Response) => {
//   try {
//     const { email, product, quantity } = req.body;

//     // Call the order service to handle order creation and stock update
//     const order = await orderService.createOrder(email, product, quantity);

//     // Return success response with the created order
//     res.status(201).json({
//       message: 'Order placed successfully!',
//       order,
//     });
//   } catch (error) {
//     // Return error response
//     res.status(400).json({
//       message: (error as Error).message || 'Error while placing the order',
//     });
//   }
// };

const createOrderController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const order = await orderService.orderCreate(req.body, req.ip!);
    res.status(201).json({
      message: 'Orders successfully',
      success: true,
      data: order,
    });
  } catch (error) {
    next(error);
  }
};
const verifyOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await orderService.verifyPayment(
      req.query.order_id as string,
    );

    res.status(200).json({
      message: 'Order verified successfully',
      success: true,
      data: result,
    });
  } catch (error) {
    next(error); // ✅ Properly handle errors
  }
};

const getRevenue = async (req: Request, res: Response) => {
  try {
    const totalRevenue = await orderService.calculateRevenue();

    res.status(200).json({
      message: 'Revenue calculated successfully',
      revenue: totalRevenue,
    });
  } catch (error: unknown) {
    res.status(500).json({
      message: (error as Error).message || 'Error calculating revenue',
    });
  }
};
const allOrderComtroller = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await orderService.getAllOrder();
    res.status(201).json({
      message: 'All order rettrived successfully',
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
export const orderController = {
  getRevenue,
  createOrderController,
  allOrderComtroller,
  verifyOrder,
};
