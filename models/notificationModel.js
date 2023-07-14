import { Schema, model, Document } from 'mongoose';

/* export interface NotificationModel extends Document {
  userId: string;
  message: string;
  isRead: boolean;
}
 */
const notificationSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  message: { type: String, required: true },
  isRead: { type: Boolean, default: false },
},  { timestamps: true });

export default model('Notification', notificationSchema);
