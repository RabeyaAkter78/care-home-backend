import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { InvoiceValidations } from './invoice.validation';
import { InvoiceControllers } from './invoice.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.ADMIN),
  validateRequest(InvoiceValidations.createInvoiceValidationSchema),
  InvoiceControllers.createInvoice,
);

router.get(
  '/',
  auth(USER_ROLE.ADMIN, USER_ROLE.VA_COORDINATOR, USER_ROLE.FAMILY_PORTAL),
  InvoiceControllers.getAllInvoices,
);

router.get(
  '/:id',
  auth(USER_ROLE.ADMIN, USER_ROLE.VA_COORDINATOR, USER_ROLE.FAMILY_PORTAL),
  InvoiceControllers.getSingleInvoice,
);

router.patch(
  '/:id/status',
  auth(USER_ROLE.ADMIN, USER_ROLE.FAMILY_PORTAL),
  validateRequest(InvoiceValidations.updateInvoiceStatusValidationSchema),
  InvoiceControllers.updateInvoiceStatus,
);

export const InvoiceRoutes = router;
