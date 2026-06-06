import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../user/user.model';
import { TUser } from '../user/user.interface';
import config from '../../config';
import AppError from '../../errors/AppError';

const signUpFamilyPortal = async (payload: TUser) => {
  const isUserExist = await User.findOne({ email: payload.email });
  if (isUserExist) {
    throw new AppError(400, 'User already exists with this email');
  }

  payload.role = 'FAMILY_PORTAL';
  payload.status = 'ACTIVE';

  const result = await User.create(payload);
  const resultObj = result.toObject();
  delete resultObj.password;
  return resultObj;
};

const loginUser = async (payload: Record<string, string>) => {
  const { email, password } = payload;

  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    throw new AppError(404, 'User does not exist');
  }

  if (user.status === 'BLOCKED') {
    throw new AppError(403, 'This user is blocked');
  }

  const isPasswordMatch = await bcryptjs.compare(password, user.password || '');
  if (!isPasswordMatch) {
    throw new AppError(401, 'Invalid password');
  }

  const jwtPayload = {
    userId: user._id.toString(),
    email: user.email,
    role: user.role,
  };

  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret, {
    expiresIn: config.jwt_access_expires_in,
  });

  const userData = user.toObject();
  delete userData.password;

  return {
    accessToken,
    user: userData,
  };
};

const changePassword = async (userId: string, payload: Record<string, string>) => {
  const { oldPassword, newPassword } = payload;

  const user = await User.findById(userId).select('+password');
  if (!user) {
    throw new AppError(404, 'User does not exist');
  }

  const isPasswordMatch = await bcryptjs.compare(oldPassword, user.password || '');
  if (!isPasswordMatch) {
    throw new AppError(401, 'Old password is incorrect');
  }

  user.password = newPassword;
  await user.save();

  return null;
};

export const AuthServices = {
  signUpFamilyPortal,
  loginUser,
  changePassword,
};
