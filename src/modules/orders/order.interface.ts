import { Document, Types } from 'mongoose';
import { Schema, model, connect } from 'mongoose';

export interface IOrder extends Document {
  email: string;
  product: Types.ObjectId;
  quantity: number;
  totalPrice: number;
}
