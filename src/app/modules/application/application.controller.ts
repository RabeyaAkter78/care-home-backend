import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ApplicationServices } from './application.service';

const createApplication = catchAsync(async (req: Request, res: Response) => {
  const submitterId = req.user?.role === 'FAMILY_PORTAL' ? req.user.userId : undefined;
  const result = await ApplicationServices.createApplicationIntoDB(req.body, submitterId);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Application submitted successfully',
    data: result,
  });
});

const getAllApplications = catchAsync(async (req: Request, res: Response) => {
  const result = await ApplicationServices.getAllApplicationsFromDB(req.query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Applications retrieved successfully',
    meta: result.meta,
    data: result.result,
  });
});

const getSingleApplication = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ApplicationServices.getSingleApplicationFromDB(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Application retrieved successfully',
    data: result,
  });
});

const updateApplication = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ApplicationServices.updateApplicationInDB(id, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Application updated successfully',
    data: result,
  });
});

export const ApplicationControllers = {
  createApplication,
  getAllApplications,
  getSingleApplication,
  updateApplication,
};
