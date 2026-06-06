import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ResidentServices } from './resident.service';

const createResident = catchAsync(async (req: Request, res: Response) => {
  const result = await ResidentServices.createResidentIntoDB(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Resident created successfully',
    data: result,
  });
});

const getAllResidents = catchAsync(async (req: Request, res: Response) => {
  const result = await ResidentServices.getAllResidentsFromDB(req.query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Residents retrieved successfully',
    meta: result.meta,
    data: result.result,
  });
});

const getSingleResident = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ResidentServices.getSingleResidentFromDB(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Resident retrieved successfully',
    data: result,
  });
});

const updateResident = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ResidentServices.updateResidentInDB(id, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Resident updated successfully',
    data: result,
  });
});

const addVitalSigns = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const recordedBy = req.user.userId;
  const result = await ResidentServices.addVitalSignsIntoDB(id, req.body, recordedBy);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Vital signs added successfully',
    data: result,
  });
});

export const ResidentControllers = {
  createResident,
  getAllResidents,
  getSingleResident,
  updateResident,
  addVitalSigns,
};
