import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidations } from './user.validation';
import { UserControllers } from './user.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from './user.constant';

const router = express.Router();

router.post(
  '/create-user',
  auth(USER_ROLE.ADMIN),
  validateRequest(UserValidations.createUserValidationSchema),
  UserControllers.createUser,
);

router.get(
  '/',
  auth(USER_ROLE.ADMIN, USER_ROLE.VA_COORDINATOR),
  UserControllers.getAllUsers,
);

router.get(
  '/:id',
  auth(USER_ROLE.ADMIN, USER_ROLE.VA_COORDINATOR, USER_ROLE.CARE_STAFF, USER_ROLE.FAMILY_PORTAL),
  UserControllers.getSingleUser,
);

router.patch(
  '/:id',
  auth(USER_ROLE.ADMIN, USER_ROLE.VA_COORDINATOR, USER_ROLE.CARE_STAFF, USER_ROLE.FAMILY_PORTAL),
  validateRequest(UserValidations.updateUserValidationSchema),
  UserControllers.updateUser,
);

export const UserRoutes = router;
