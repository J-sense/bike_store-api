import { Request, Response } from 'express';
import { orderService } from './order.service';

// const orderService = require('../services/orderService');

const createOrder = async (req: Request, res: Response) => {
  try {
    const { email, product, quantity } = req.body;

    // Call the order service to handle order creation and stock update
    const order = await orderService.createOrder(email, product, quantity);

    // Return success response with the created order
    res.status(201).json({
      message: 'Order placed successfully!',
      order,
    });
  } catch (error) {
    // Return error response
    res.status(400).json({
      message: (error as Error).message || 'Error while placing the order',
    });
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

export const orderController = {
  createOrder,
  getRevenue,
};
