import { TResident, TVitalSign } from './resident.interface';
import { Resident } from './resident.model';
import { Bed } from '../room/room.model';
import QueryBuilder from '../../utils/QueryBuilder';
import AppError from '../../errors/AppError';

const createResidentIntoDB = async (payload: TResident) => {
  const result = await Resident.create(payload);

  // If a bed is specified during creation, mark it as occupied
  if (payload.bedId) {
    await Bed.findByIdAndUpdate(payload.bedId, {
      status: 'OCCUPIED',
      residentId: result._id,
      moveInDate: payload.admittedDate || new Date(),
    });
  }

  return result;
};

const getAllResidentsFromDB = async (query: Record<string, unknown>) => {
  const residentQuery = new QueryBuilder(
    Resident.find()
      .populate('roomId')
      .populate('bedId')
      .populate('careHomeId')
      .populate('assignedCareStaffId')
      .populate('assignedCoordinatorId'),
    query,
  )
    .search(['name', 'phone', 'allergies', 'physician'])
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await residentQuery.modelQuery;
  const meta = await residentQuery.countTotal();

  return {
    meta,
    result,
  };
};

const getSingleResidentFromDB = async (id: string) => {
  const result = await Resident.findById(id)
    .populate('roomId')
    .populate('bedId')
    .populate('careHomeId')
    .populate('assignedCareStaffId')
    .populate('assignedCoordinatorId')
    .populate('vitalSigns.recordedBy', 'name email role');
  if (!result) {
    throw new AppError(404, 'Resident not found');
  }
  return result;
};

const updateResidentInDB = async (id: string, payload: Partial<TResident>) => {
  // If the bed is changing, handle the old bed and new bed status
  const currentResident = await Resident.findById(id);
  if (!currentResident) {
    throw new AppError(404, 'Resident not found');
  }

  if (payload.bedId && payload.bedId.toString() !== currentResident.bedId?.toString()) {
    // Release the old bed
    if (currentResident.bedId) {
      await Bed.findByIdAndUpdate(currentResident.bedId, {
        status: 'AVAILABLE',
        residentId: null,
      });
    }
    // Reserve/Occupy the new bed
    await Bed.findByIdAndUpdate(payload.bedId, {
      status: 'OCCUPIED',
      residentId: currentResident._id,
    });
  }

  // If status is changed to DISCHARGED, release the bed
  if (payload.status === 'DISCHARGED' && currentResident.bedId) {
    await Bed.findByIdAndUpdate(currentResident.bedId, {
      status: 'AVAILABLE',
      residentId: null,
    });
    payload.roomId = null as any;
    payload.bedId = null as any;
  }

  const result = await Resident.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

const addVitalSignsIntoDB = async (id: string, payload: Partial<TVitalSign>, recordedBy: string) => {
  const resident = await Resident.findById(id);
  if (!resident) {
    throw new AppError(404, 'Resident not found');
  }

  const newVitalSign = {
    ...payload,
    recordedBy: recordedBy as any,
    recordedAt: new Date(),
  };

  const result = await Resident.findByIdAndUpdate(
    id,
    {
      $push: { vitalSigns: newVitalSign },
      $set: { lastCheckup: new Date() },
    },
    { new: true },
  ).populate('vitalSigns.recordedBy', 'name email role');

  return result;
};

export const ResidentServices = {
  createResidentIntoDB,
  getAllResidentsFromDB,
  getSingleResidentFromDB,
  updateResidentInDB,
  addVitalSignsIntoDB,
};
