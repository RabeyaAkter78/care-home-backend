import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { CareHomeValidations } from './careHome.validation';
import { CareHomeControllers } from './careHome.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.ADMIN),
  validateRequest(CareHomeValidations.createCareHomeValidationSchema),
  CareHomeControllers.createCareHome,
);

router.get(
  '/',
  auth(USER_ROLE.ADMIN, USER_ROLE.VA_COORDINATOR, USER_ROLE.CARE_STAFF, USER_ROLE.FAMILY_PORTAL),
  CareHomeControllers.getAllCareHomes,
);

router.get(
  '/:id',
  auth(USER_ROLE.ADMIN, USER_ROLE.VA_COORDINATOR, USER_ROLE.CARE_STAFF, USER_ROLE.FAMILY_PORTAL),
  CareHomeControllers.getSingleCareHome,
);

router.patch(
  '/:id',
  auth(USER_ROLE.ADMIN),
  validateRequest(CareHomeValidations.updateCareHomeValidationSchema),
  CareHomeControllers.updateCareHome,
);

export const CareHomeRoutes = router;
