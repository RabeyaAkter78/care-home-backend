import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { IncidentReportServices } from './incidentReport.service';

const createIncidentReport = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user.userId;
  const result = await IncidentReportServices.createIncidentReportIntoDB(req.body, userId);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Incident report filed successfully',
    data: result,
  });
});

const getAllIncidentReports = catchAsync(async (req: Request, res: Response) => {
  const result = await IncidentReportServices.getAllIncidentReportsFromDB(req.query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Incident reports retrieved successfully',
    meta: result.meta,
    data: result.result,
  });
});

const getSingleIncidentReport = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await IncidentReportServices.getSingleIncidentReportFromDB(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Incident report retrieved successfully',
    data: result,
  });
});

export const IncidentReportControllers = {
  createIncidentReport,
  getAllIncidentReports,
  getSingleIncidentReport,
};
