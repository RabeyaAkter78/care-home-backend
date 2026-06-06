import express from 'express';
import { DashboardControllers } from './dashboard.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.get(
  '/',
  auth(USER_ROLE.ADMIN, USER_ROLE.VA_COORDINATOR, USER_ROLE.CARE_STAFF, USER_ROLE.FAMILY_PORTAL),
  DashboardControllers.getDashboardStats,
);

router.get(
  '/care-homes',
  auth(USER_ROLE.ADMIN, USER_ROLE.VA_COORDINATOR),
  DashboardControllers.getCareHomeAnalytics,
);

export const DashboardRoutes = router;
