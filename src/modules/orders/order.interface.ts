import { Document, Types } from 'mongoose';
// import { Schema, model, connect } from 'mongoose';

export interface IOrder extends Document {
  email: string;
  product: Types.ObjectId;
  quantity: number;
  totalPrice: number;
  status: 'Pending' | 'Paid' | 'Shipped' | 'Completed' | 'Cancelled';
  transaction: {
    id: string;
    transactionStatus: string;
    bank_status: string;
    sp_code: string;
    sp_message: string;
    method: string;
    date_time: string;
  };
}
