import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { RoomServices } from './room.service';

const createRoom = catchAsync(async (req: Request, res: Response) => {
  const result = await RoomServices.createRoomIntoDB(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Room and beds created successfully',
    data: result,
  });
});

const createBed = catchAsync(async (req: Request, res: Response) => {
  const result = await RoomServices.createBedIntoDB(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Bed created successfully',
    data: result,
  });
});

const getAllRooms = catchAsync(async (req: Request, res: Response) => {
  const result = await RoomServices.getAllRoomsFromDB(req.query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Rooms retrieved successfully',
    meta: result.meta,
    data: result.result,
  });
});

const getAllBeds = catchAsync(async (req: Request, res: Response) => {
  const result = await RoomServices.getAllBedsFromDB(req.query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Beds retrieved successfully',
    meta: result.meta,
    data: result.result,
  });
});

const getSingleBed = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await RoomServices.getSingleBedFromDB(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Bed retrieved successfully',
    data: result,
  });
});

const updateBed = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await RoomServices.updateBedInDB(id, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Bed updated successfully',
    data: result,
  });
});

export const RoomControllers = {
  createRoom,
  createBed,
  getAllRooms,
  getAllBeds,
  getSingleBed,
  updateBed,
};
