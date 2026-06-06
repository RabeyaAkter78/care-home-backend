import { TTask } from './task.interface';
import { Task } from './task.model';
import { Resident } from '../resident/resident.model';
import QueryBuilder from '../../utils/QueryBuilder';
import AppError from '../../errors/AppError';

const createTaskIntoDB = async (payload: TTask) => {
  const resident = await Resident.findById(payload.residentId);
  if (!resident) {
    throw new AppError(404, 'Resident not found');
  }

  // Auto-assign home, room, bed info from resident record
  payload.careHomeId = resident.careHomeId;
  payload.roomId = resident.roomId;
  payload.bedId = resident.bedId;
  payload.status = 'INCOMPLETED';

  const result = await Task.create(payload);
  return result;
};

const getAllTasksFromDB = async (query: Record<string, unknown>) => {
  const taskQuery = new QueryBuilder(
    Task.find().populate('residentId').populate('careStaffId').populate('careHomeId').populate('roomId').populate('bedId'),
    query,
  )
    .search(['taskName', 'taskType', 'priority', 'status'])
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await taskQuery.modelQuery;
  const meta = await taskQuery.countTotal();

  return {
    meta,
    result,
  };
};

const getSingleTaskFromDB = async (id: string) => {
  const result = await Task.findById(id)
    .populate('residentId')
    .populate('careStaffId')
    .populate('careHomeId')
    .populate('roomId')
    .populate('bedId');
  return result;
};

const updateTaskStatusInDB = async (id: string, status: 'COMPLETED' | 'INCOMPLETED') => {
  const completedAt = status === 'COMPLETED' ? new Date() : undefined;
  const result = await Task.findByIdAndUpdate(
    id,
    { status, completedAt },
    { new: true, runValidators: true },
  );
  if (!result) {
    throw new AppError(404, 'Task not found');
  }
  return result;
};

export const TaskServices = {
  createTaskIntoDB,
  getAllTasksFromDB,
  getSingleTaskFromDB,
  updateTaskStatusInDB,
};
