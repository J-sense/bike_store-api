import { model, Schema } from 'mongoose';
import { IBike } from './bike.interface';

const bikeSchema = new Schema<IBike>({
  name: {
    type: String,
    required: [true, 'Bike name is required'],
    trim: true,
    minlength: [3, 'Bike name must be at least 3 characters long'],
    maxlength: [50, 'Bike name cannot exceed 50 characters'],
  },
  brand: {
    type: String,
    required: [true, 'Brand is required'],
    trim: true,
    minlength: [2, 'Brand name must be at least 2 characters long'],
    maxlength: [30, 'Brand name cannot exceed 30 characters'],
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price must be a positive number'],
    validate: {
      validator: (value: number) => Number.isInteger(value),
      message: 'Price must be an integer',
    },
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: {
      values: ['Mountain', 'Road', 'Hybrid', 'Electric'],
      message:
        "Category must be one of 'Mountain', 'Road', 'Hybrid', or 'Electric'",
    },
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters'],
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
    min: [0, 'Quantity must be a positive number or zero'],
    validate: {
      validator: (value: number) => Number.isInteger(value),
      message: 'Quantity must be an integer',
    },
    default: 0,
  },
  inStock: {
    type: Boolean,
    default: function () {
      return this.quantity > 0;
    },
  },
});

// Create a model
export const BikeModel = model<IBike>('Bike', bikeSchema);
