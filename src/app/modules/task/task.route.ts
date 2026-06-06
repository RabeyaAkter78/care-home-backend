import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { TaskValidations } from './task.validation';
import { TaskControllers } from './task.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.ADMIN, USER_ROLE.VA_COORDINATOR),
  validateRequest(TaskValidations.createTaskValidationSchema),
  TaskControllers.createTask,
);

router.get(
  '/',
  auth(USER_ROLE.ADMIN, USER_ROLE.VA_COORDINATOR, USER_ROLE.CARE_STAFF),
  TaskControllers.getAllTasks,
);

router.get(
  '/:id',
  auth(USER_ROLE.ADMIN, USER_ROLE.VA_COORDINATOR, USER_ROLE.CARE_STAFF),
  TaskControllers.getSingleTask,
);

router.patch(
  '/:id/status',
  auth(USER_ROLE.ADMIN, USER_ROLE.VA_COORDINATOR, USER_ROLE.CARE_STAFF),
  validateRequest(TaskValidations.updateTaskStatusValidationSchema),
  TaskControllers.updateTaskStatus,
);

export const TaskRoutes = router;
