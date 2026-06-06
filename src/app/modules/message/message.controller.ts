import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { MessageServices } from './message.service';

const sendMessage = catchAsync(async (req: Request, res: Response) => {
  const senderId = req.user.userId;
  const result = await MessageServices.sendMessageIntoDB(req.body, senderId);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Message sent successfully',
    data: result,
  });
});

const getConversation = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user.userId;
  const { contactId } = req.params;
  const result = await MessageServices.getConversationFromDB(userId, contactId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Conversation retrieved successfully',
    data: result,
  });
});

const getMyActiveChats = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user.userId;
  const result = await MessageServices.getMyActiveChatsFromDB(userId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Active chats retrieved successfully',
    data: result,
  });
});

export const MessageControllers = {
  sendMessage,
  getConversation,
  getMyActiveChats,
};
