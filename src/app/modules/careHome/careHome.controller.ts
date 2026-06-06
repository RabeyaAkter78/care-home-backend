import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CareHomeServices } from './careHome.service';

const createCareHome = catchAsync(async (req: Request, res: Response) => {
  const result = await CareHomeServices.createCareHomeIntoDB(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Care Home created successfully',
    data: result,
  });
});

const getAllCareHomes = catchAsync(async (req: Request, res: Response) => {
  const result = await CareHomeServices.getAllCareHomesFromDB(req.query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Care Homes retrieved successfully',
    meta: result.meta,
    data: result.result,
  });
});

const getSingleCareHome = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await CareHomeServices.getSingleCareHomeFromDB(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Care Home retrieved successfully',
    data: result,
  });
});

const updateCareHome = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await CareHomeServices.updateCareHomeInDB(id, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Care Home updated successfully',
    data: result,
  });
});

export const CareHomeControllers = {
  createCareHome,
  getAllCareHomes,
  getSingleCareHome,
  updateCareHome,
};
