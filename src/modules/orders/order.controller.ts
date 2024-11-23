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
  } catch (error: any) {
    // Return error response
    res.status(400).json({
      message: error.message || 'Error while placing the order',
    });
  }
};

export const orderController = {
  createOrder,
};
