import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { IncidentReportValidations } from './incidentReport.validation';
import { IncidentReportControllers } from './incidentReport.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.CARE_STAFF),
  validateRequest(IncidentReportValidations.createIncidentReportValidationSchema),
  IncidentReportControllers.createIncidentReport,
);

router.get(
  '/',
  auth(USER_ROLE.ADMIN, USER_ROLE.VA_COORDINATOR, USER_ROLE.CARE_STAFF),
  IncidentReportControllers.getAllIncidentReports,
);

router.get(
  '/:id',
  auth(USER_ROLE.ADMIN, USER_ROLE.VA_COORDINATOR, USER_ROLE.CARE_STAFF),
  IncidentReportControllers.getSingleIncidentReport,
);

export const IncidentReportRoutes = router;
