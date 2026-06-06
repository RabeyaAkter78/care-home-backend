import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { MessageValidations } from './message.validation';
import { MessageControllers } from './message.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.ADMIN, USER_ROLE.VA_COORDINATOR, USER_ROLE.CARE_STAFF, USER_ROLE.FAMILY_PORTAL),
  validateRequest(MessageValidations.sendMessageValidationSchema),
  MessageControllers.sendMessage,
);

router.get(
  '/active-chats',
  auth(USER_ROLE.ADMIN, USER_ROLE.VA_COORDINATOR, USER_ROLE.CARE_STAFF, USER_ROLE.FAMILY_PORTAL),
  MessageControllers.getMyActiveChats,
);

router.get(
  '/:contactId',
  auth(USER_ROLE.ADMIN, USER_ROLE.VA_COORDINATOR, USER_ROLE.CARE_STAFF, USER_ROLE.FAMILY_PORTAL),
  MessageControllers.getConversation,
);

export const MessageRoutes = router;
