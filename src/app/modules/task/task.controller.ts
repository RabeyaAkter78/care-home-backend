import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { TaskServices } from './task.service';

const createTask = catchAsync(async (req: Request, res: Response) => {
  const result = await TaskServices.createTaskIntoDB(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Task created successfully',
    data: result,
  });
});

const getAllTasks = catchAsync(async (req: Request, res: Response) => {
  const result = await TaskServices.getAllTasksFromDB(req.query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Tasks retrieved successfully',
    meta: result.meta,
    data: result.result,
  });
});

const getSingleTask = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await TaskServices.getSingleTaskFromDB(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Task retrieved successfully',
    data: result,
  });
});

const updateTaskStatus = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;
  const result = await TaskServices.updateTaskStatusInDB(id, status);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Task status updated successfully',
    data: result,
  });
});

export const TaskControllers = {
  createTask,
  getAllTasks,
  getSingleTask,
  updateTaskStatus,
};
