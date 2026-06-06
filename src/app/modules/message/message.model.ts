import { Schema, model } from 'mongoose';
import { TMessage } from './message.interface';

const messageSchema = new Schema<TMessage>(
  {
    senderId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    receiverId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    isRead: { type: Boolean, default: false },
    timestamp: { type: Date, required: true, default: Date.now },
  },
  {
    timestamps: true,
  },
);

export const Message = model<TMessage>('Message', messageSchema);
