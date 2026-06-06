import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.route';
import { UserRoutes } from '../modules/user/user.route';
import { CareHomeRoutes } from '../modules/careHome/careHome.route';
import { RoomRoutes } from '../modules/room/room.route';
import { ApplicationRoutes } from '../modules/application/application.route';
import { ResidentRoutes } from '../modules/resident/resident.route';
import { TaskRoutes } from '../modules/task/task.route';
import { IncidentReportRoutes } from '../modules/incidentReport/incidentReport.route';
import { CarePlanRoutes } from '../modules/carePlan/carePlan.route';
import { InvoiceRoutes } from '../modules/invoice/invoice.route';
import { MessageRoutes } from '../modules/message/message.route';
import { DashboardRoutes } from '../modules/dashboard/dashboard.route';

const router = express.Router();

const moduleRoutes = [
  { path: '/auth', route: AuthRoutes },
  { path: '/users', route: UserRoutes },
  { path: '/care-homes', route: CareHomeRoutes },
  { path: '/rooms-beds', route: RoomRoutes },
  { path: '/applications', route: ApplicationRoutes },
  { path: '/residents', route: ResidentRoutes },
  { path: '/tasks', route: TaskRoutes },
  { path: '/incident-reports', route: IncidentReportRoutes },
  { path: '/care-plans', route: CarePlanRoutes },
  { path: '/invoices', route: InvoiceRoutes },
  { path: '/messages', route: MessageRoutes },
  { path: '/dashboard', route: DashboardRoutes },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
