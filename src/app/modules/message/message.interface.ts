import { Types } from 'mongoose';

export interface TMessage {
  senderId: Types.ObjectId;
  receiverId: Types.ObjectId;
  content: string;
  isRead: boolean;
  timestamp: Date;
}
