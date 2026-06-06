import { TCarePlan } from './carePlan.interface';
import { CarePlan } from './carePlan.model';
import QueryBuilder from '../../utils/QueryBuilder';

const createOrUpdateCarePlanIntoDB = async (payload: TCarePlan) => {
  const result = await CarePlan.findOneAndUpdate(
    { residentId: payload.residentId },
    payload,
    {
      new: true,
      upsert: true,
      runValidators: true,
    },
  );
  return result;
};

const getAllCarePlansFromDB = async (query: Record<string, unknown>) => {
  const carePlanQuery = new QueryBuilder(
    CarePlan.find().populate({
      path: 'residentId',
      populate: {
        path: 'roomId bedId careHomeId',
      },
    }),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await carePlanQuery.modelQuery;
  const meta = await carePlanQuery.countTotal();

  return {
    meta,
    result,
  };
};

const getCarePlanByResidentFromDB = async (residentId: string) => {
  const result = await CarePlan.findOne({ residentId }).populate({
    path: 'residentId',
    populate: {
      path: 'roomId bedId careHomeId',
    },
  });
  return result;
};

export const CarePlanServices = {
  createOrUpdateCarePlanIntoDB,
  getAllCarePlansFromDB,
  getCarePlanByResidentFromDB,
};
