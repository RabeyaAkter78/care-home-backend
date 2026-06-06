import { TCareHome } from './careHome.interface';
import { CareHome } from './careHome.model';
import QueryBuilder from '../../utils/QueryBuilder';

const createCareHomeIntoDB = async (payload: TCareHome) => {
  const result = await CareHome.create(payload);
  return result;
};

const getAllCareHomesFromDB = async (query: Record<string, unknown>) => {
  const careHomeQuery = new QueryBuilder(CareHome.find(), query)
    .search(['name', 'address', 'manager'])
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await careHomeQuery.modelQuery;
  const meta = await careHomeQuery.countTotal();

  return {
    meta,
    result,
  };
};

const getSingleCareHomeFromDB = async (id: string) => {
  const result = await CareHome.findById(id);
  return result;
};

const updateCareHomeInDB = async (id: string, payload: Partial<TCareHome>) => {
  const result = await CareHome.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

export const CareHomeServices = {
  createCareHomeIntoDB,
  getAllCareHomesFromDB,
  getSingleCareHomeFromDB,
  updateCareHomeInDB,
};
