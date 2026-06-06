import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthServices } from './auth.service';

const signUpFamilyPortal = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.signUpFamilyPortal(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Family Portal user registered successfully',
    data: result,
  });
});

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.loginUser(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User logged in successfully',
    data: result,
  });
});

const changePassword = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user.userId;
  await AuthServices.changePassword(userId, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Password changed successfully',
    data: null,
  });
});

export const AuthControllers = {
  signUpFamilyPortal,
  loginUser,
  changePassword,
};
