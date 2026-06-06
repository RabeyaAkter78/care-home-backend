import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import AppError from '../errors/AppError';
import catchAsync from '../utils/catchAsync';
import { User } from '../modules/user/user.model';

// Extend Express Request interface
declare global {
  namespace Express {
    interface Request {
      user: JwtPayload;
    }
  }
}

const auth = (...requiredRoles: string[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
      throw new AppError(401, 'You are not authorized!');
    }

    // Check if token format is Bearer <token>
    let jwtToken = token;
    if (token.startsWith('Bearer ')) {
      jwtToken = token.split(' ')[1];
    }

    let decoded;
    try {
      decoded = jwt.verify(jwtToken, config.jwt_access_secret) as JwtPayload;
    } catch (error) {
      throw new AppError(401, 'Token is invalid or expired!');
    }

    const { role, userId } = decoded;

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      throw new AppError(404, 'User was not found!');
    }

    // Check if user is blocked
    if (user.status === 'BLOCKED') {
      throw new AppError(403, 'This user is blocked!');
    }

    if (requiredRoles.length && !requiredRoles.includes(role)) {
      throw new AppError(403, 'You have no permission to access this resource!');
    }

    req.user = decoded;
    next();
  });
};

export default auth;
