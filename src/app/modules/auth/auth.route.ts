import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidations } from '../user/user.validation';
import { AuthControllers } from './auth.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post(
  '/signup',
  validateRequest(UserValidations.createUserValidationSchema),
  AuthControllers.signUpFamilyPortal,
);

router.post(
  '/login',
  validateRequest(UserValidations.loginValidationSchema),
  AuthControllers.loginUser,
);

router.post(
  '/change-password',
  auth(USER_ROLE.ADMIN, USER_ROLE.VA_COORDINATOR, USER_ROLE.CARE_STAFF, USER_ROLE.FAMILY_PORTAL),
  validateRequest(UserValidations.changePasswordValidationSchema),
  AuthControllers.changePassword,
);

export const AuthRoutes = router;
