import { TMessage } from './message.interface';
import { Message } from './message.model';

const sendMessageIntoDB = async (payload: TMessage, senderId: string) => {
  payload.senderId = senderId as any;
  const result = await Message.create(payload);
  return result;
};

const getConversationFromDB = async (userId: string, contactId: string) => {
  // Retrieve all messages between userId and contactId
  const result = await Message.find({
    $or: [
      { senderId: userId, receiverId: contactId },
      { senderId: contactId, receiverId: userId },
    ],
  })
    .sort({ timestamp: 1 })
    .populate('senderId', 'name email role')
    .populate('receiverId', 'name email role');

  // Mark retrieved messages as read if receiver was the current user
  await Message.updateMany(
    { senderId: contactId, receiverId: userId, isRead: false },
    { isRead: true },
  );

  return result;
};

const getMyActiveChatsFromDB = async (userId: string) => {
  // Find all distinct users the user has conversed with
  const messages = await Message.find({
    $or: [{ senderId: userId }, { receiverId: userId }],
  })
    .sort({ timestamp: -1 })
    .populate('senderId', 'name email role')
    .populate('receiverId', 'name email role');

  const contactsMap = new Map();
  messages.forEach((msg) => {
    const contact = msg.senderId._id.toString() === userId ? msg.receiverId : msg.senderId;
    if (!contactsMap.has(contact._id.toString())) {
      contactsMap.set(contact._id.toString(), {
        contact,
        lastMessage: msg.content,
        timestamp: msg.timestamp,
        isRead: msg.isRead || msg.senderId._id.toString() === userId,
      });
    }
  });

  return Array.from(contactsMap.values());
};

export const MessageServices = {
  sendMessageIntoDB,
  getConversationFromDB,
  getMyActiveChatsFromDB,
};
