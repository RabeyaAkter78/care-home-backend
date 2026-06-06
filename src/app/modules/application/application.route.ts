import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ApplicationValidations } from './application.validation';
import { ApplicationControllers } from './application.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.ADMIN, USER_ROLE.FAMILY_PORTAL),
  validateRequest(ApplicationValidations.createApplicationValidationSchema),
  ApplicationControllers.createApplication,
);

router.get(
  '/',
  auth(USER_ROLE.ADMIN, USER_ROLE.VA_COORDINATOR, USER_ROLE.FAMILY_PORTAL),
  ApplicationControllers.getAllApplications,
);

router.get(
  '/:id',
  auth(USER_ROLE.ADMIN, USER_ROLE.VA_COORDINATOR, USER_ROLE.FAMILY_PORTAL),
  ApplicationControllers.getSingleApplication,
);

router.patch(
  '/:id',
  auth(USER_ROLE.ADMIN, USER_ROLE.VA_COORDINATOR),
  validateRequest(ApplicationValidations.updateApplicationStatusValidationSchema),
  ApplicationControllers.updateApplication,
);

export const ApplicationRoutes = router;
