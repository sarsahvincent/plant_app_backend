import { Schema, model, Document } from 'mongoose';

/* export interface PaymentModel extends Document {
  orderId: string;
  userId: string;
  amount: number;
  status: string;
} */

const paymentSchema = new Schema({
  orderId: { type: Schema.Types.ObjectId, ref: 'Order', required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  status: { type: String, required: true },
},  { timestamps: true });

export default model('Payment', paymentSchema);
