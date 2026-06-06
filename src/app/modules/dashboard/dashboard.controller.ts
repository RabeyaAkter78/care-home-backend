import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { DashboardServices } from './dashboard.service';

const getDashboardStats = catchAsync(async (req: Request, res: Response) => {
  const { role, userId } = req.user;
  let data;

  if (role === 'ADMIN') {
    data = await DashboardServices.getAdminDashboard();
  } else if (role === 'CARE_STAFF') {
    data = await DashboardServices.getCareStaffDashboard(userId);
  } else if (role === 'VA_COORDINATOR') {
    data = await DashboardServices.getVACoordinatorDashboard();
  } else if (role === 'FAMILY_PORTAL') {
    data = await DashboardServices.getFamilyPortalDashboard(userId);
  }

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: `${role} Dashboard analytics retrieved successfully`,
    data,
  });
});

const getCareHomeAnalytics = catchAsync(async (req: Request, res: Response) => {
  const data = await DashboardServices.getCareHomeAnalytics();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Care Home analytics retrieved successfully',
    data,
  });
});

export const DashboardControllers = {
  getDashboardStats,
  getCareHomeAnalytics,
};
