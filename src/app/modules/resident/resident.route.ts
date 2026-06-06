import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ResidentValidations } from './resident.validation';
import { ResidentControllers } from './resident.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.ADMIN, USER_ROLE.VA_COORDINATOR),
  validateRequest(ResidentValidations.createResidentValidationSchema),
  ResidentControllers.createResident,
);

router.get(
  '/',
  auth(USER_ROLE.ADMIN, USER_ROLE.VA_COORDINATOR, USER_ROLE.CARE_STAFF),
  ResidentControllers.getAllResidents,
);

router.get(
  '/:id',
  auth(USER_ROLE.ADMIN, USER_ROLE.VA_COORDINATOR, USER_ROLE.CARE_STAFF, USER_ROLE.FAMILY_PORTAL),
  ResidentControllers.getSingleResident,
);

router.patch(
  '/:id',
  auth(USER_ROLE.ADMIN, USER_ROLE.VA_COORDINATOR, USER_ROLE.CARE_STAFF),
  validateRequest(ResidentValidations.updateResidentValidationSchema),
  ResidentControllers.updateResident,
);

router.post(
  '/:id/vital-signs',
  auth(USER_ROLE.CARE_STAFF),
  validateRequest(ResidentValidations.addVitalSignsValidationSchema),
  ResidentControllers.addVitalSigns,
);

export const ResidentRoutes = router;
