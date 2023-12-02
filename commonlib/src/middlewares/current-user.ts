import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

interface UserPayload {
  instituteName: string;
  fullName: string;
  uniqueId: string;
  instituteId: string;
  role: string;
  authorizedClassrooms: Array<String>;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

export const currentUser = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  if (!req.session?.jwt) {
    return next();
  }

  try {
    const payload = jwt.verify(
      req.session.jwt,
      "abcd"
    ) as UserPayload;
    req.currentUser = payload;
  } catch (err) {}

  next();
};