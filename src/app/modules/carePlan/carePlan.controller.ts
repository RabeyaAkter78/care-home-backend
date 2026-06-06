import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CarePlanServices } from './carePlan.service';

const createOrUpdateCarePlan = catchAsync(async (req: Request, res: Response) => {
  const result = await CarePlanServices.createOrUpdateCarePlanIntoDB(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Care Plan saved successfully',
    data: result,
  });
});

const getAllCarePlans = catchAsync(async (req: Request, res: Response) => {
  const result = await CarePlanServices.getAllCarePlansFromDB(req.query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Care Plans retrieved successfully',
    meta: result.meta,
    data: result.result,
  });
});

const getCarePlanByResident = catchAsync(async (req: Request, res: Response) => {
  const { residentId } = req.params;
  const result = await CarePlanServices.getCarePlanByResidentFromDB(residentId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Care Plan retrieved successfully',
    data: result,
  });
});

export const CarePlanControllers = {
  createOrUpdateCarePlan,
  getAllCarePlans,
  getCarePlanByResident,
};
