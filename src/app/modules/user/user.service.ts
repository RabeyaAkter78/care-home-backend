import { TUser } from './user.interface';
import { User } from './user.model';
import QueryBuilder from '../../utils/QueryBuilder';
import { UserSearchableFields } from './user.constant';
import AppError from '../../errors/AppError';
import bcryptjs from 'bcryptjs';

const createUserIntoDB = async (payload: TUser) => {
  const isUserExist = await User.findOne({ email: payload.email });
  if (isUserExist) {
    throw new AppError(400, 'User already exists with this email');
  }
  const result = await User.create(payload);
  const resultObj = result.toObject();
  delete resultObj.password;
  return resultObj;
};

const getAllUsersFromDB = async (query: Record<string, unknown>) => {
  const userQuery = new QueryBuilder(User.find().populate('careHomeId'), query)
    .search(UserSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await userQuery.modelQuery;
  const meta = await userQuery.countTotal();

  return {
    meta,
    result,
  };
};

const getSingleUserFromDB = async (id: string) => {
  const result = await User.findById(id).populate('careHomeId');
  if (!result) {
    throw new AppError(404, 'User not found');
  }
  return result;
};

const updateUserInDB = async (id: string, payload: Partial<TUser>) => {
  const result = await User.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  if (!result) {
    throw new AppError(404, 'User not found');
  }
  return result;
};

export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  updateUserInDB,
};
