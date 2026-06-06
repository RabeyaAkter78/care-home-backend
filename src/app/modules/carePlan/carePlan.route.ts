import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { CarePlanValidations } from './carePlan.validation';
import { CarePlanControllers } from './carePlan.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.ADMIN, USER_ROLE.VA_COORDINATOR),
  validateRequest(CarePlanValidations.createCarePlanValidationSchema),
  CarePlanControllers.createOrUpdateCarePlan,
);

router.get(
  '/',
  auth(USER_ROLE.ADMIN, USER_ROLE.VA_COORDINATOR, USER_ROLE.CARE_STAFF),
  CarePlanControllers.getAllCarePlans,
);

router.get(
  '/resident/:residentId',
  auth(USER_ROLE.ADMIN, USER_ROLE.VA_COORDINATOR, USER_ROLE.CARE_STAFF),
  CarePlanControllers.getCarePlanByResident,
);

export const CarePlanRoutes = router;
