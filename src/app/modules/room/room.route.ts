import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { RoomValidations } from './room.validation';
import { RoomControllers } from './room.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post(
  '/create-room',
  auth(USER_ROLE.ADMIN),
  validateRequest(RoomValidations.createRoomValidationSchema),
  RoomControllers.createRoom,
);

router.post(
  '/create-bed',
  auth(USER_ROLE.ADMIN),
  validateRequest(RoomValidations.createBedValidationSchema),
  RoomControllers.createBed,
);

router.get(
  '/rooms',
  auth(USER_ROLE.ADMIN, USER_ROLE.VA_COORDINATOR, USER_ROLE.CARE_STAFF, USER_ROLE.FAMILY_PORTAL),
  RoomControllers.getAllRooms,
);

router.get(
  '/beds',
  auth(USER_ROLE.ADMIN, USER_ROLE.VA_COORDINATOR, USER_ROLE.CARE_STAFF, USER_ROLE.FAMILY_PORTAL),
  RoomControllers.getAllBeds,
);

router.get(
  '/beds/:id',
  auth(USER_ROLE.ADMIN, USER_ROLE.VA_COORDINATOR, USER_ROLE.CARE_STAFF, USER_ROLE.FAMILY_PORTAL),
  RoomControllers.getSingleBed,
);

router.patch(
  '/beds/:id',
  auth(USER_ROLE.ADMIN, USER_ROLE.VA_COORDINATOR),
  validateRequest(RoomValidations.updateBedValidationSchema),
  RoomControllers.updateBed,
);

export const RoomRoutes = router;
