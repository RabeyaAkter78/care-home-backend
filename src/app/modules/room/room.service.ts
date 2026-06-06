import mongoose from 'mongoose';
import { TRoom, TBed } from './room.interface';
import { Room, Bed } from './room.model';
import { CareHome } from '../careHome/careHome.model';
import QueryBuilder from '../../utils/QueryBuilder';
import AppError from '../../errors/AppError';

const createRoomIntoDB = async (payload: TRoom) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const careHome = await CareHome.findById(payload.careHomeId).session(session);
    if (!careHome) {
      throw new AppError(404, 'Care Home not found');
    }

    // Create room
    const room = await Room.create([payload], { session });
    const createdRoom = room[0];

    // Auto-create beds
    const bedsToCreate = [];
    const letters = ['A', 'B', 'C', 'D', 'E', 'F'];
    for (let i = 0; i < payload.bedsCount; i++) {
      const suffix = letters[i] || `${i + 1}`;
      bedsToCreate.push({
        bedNo: `${payload.roomNo}-${suffix}`,
        roomId: createdRoom._id,
        careHomeId: payload.careHomeId,
        status: 'AVAILABLE',
      });
    }

    await Bed.create(bedsToCreate, { session });

    // Update care home capacity
    careHome.totalCapacity += payload.bedsCount;
    await careHome.save({ session });

    await session.commitTransaction();
    session.endSession();

    return createdRoom;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

const createBedIntoDB = async (payload: TBed) => {
  const room = await Room.findById(payload.roomId);
  if (!room) {
    throw new AppError(404, 'Room not found');
  }

  const result = await Bed.create(payload);

  // Update care home capacity
  await CareHome.findByIdAndUpdate(payload.careHomeId, {
    $inc: { totalCapacity: 1 },
  });

  return result;
};

const getAllRoomsFromDB = async (query: Record<string, unknown>) => {
  const roomQuery = new QueryBuilder(Room.find().populate('careHomeId'), query)
    .search(['roomNo', 'roomType'])
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await roomQuery.modelQuery;
  const meta = await roomQuery.countTotal();

  return {
    meta,
    result,
  };
};

const getAllBedsFromDB = async (query: Record<string, unknown>) => {
  const bedQuery = new QueryBuilder(Bed.find().populate('roomId').populate('careHomeId').populate('residentId'), query)
    .search(['bedNo', 'status'])
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await bedQuery.modelQuery;
  const meta = await bedQuery.countTotal();

  return {
    meta,
    result,
  };
};

const getSingleBedFromDB = async (id: string) => {
  const result = await Bed.findById(id).populate('roomId').populate('careHomeId').populate('residentId');
  return result;
};

const updateBedInDB = async (id: string, payload: Partial<TBed>) => {
  const oldBed = await Bed.findById(id);
  if (!oldBed) {
    throw new AppError(404, 'Bed not found');
  }

  const result = await Bed.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  // Handle Care Home Occupancy count changes
  if (payload.status && payload.status !== oldBed.status) {
    let occupancyChange = 0;
    if (payload.status === 'OCCUPIED' && oldBed.status !== 'OCCUPIED') {
      occupancyChange = 1;
    } else if (oldBed.status === 'OCCUPIED' && payload.status !== 'OCCUPIED') {
      occupancyChange = -1;
    }

    if (occupancyChange !== 0) {
      await CareHome.findByIdAndUpdate(oldBed.careHomeId, {
        $inc: { currentOccupancy: occupancyChange },
      });
    }
  }

  return result;
};

export const RoomServices = {
  createRoomIntoDB,
  createBedIntoDB,
  getAllRoomsFromDB,
  getAllBedsFromDB,
  getSingleBedFromDB,
  updateBedInDB,
};
