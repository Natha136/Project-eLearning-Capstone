import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../types/authenticated-request-type';

const onlyMentorMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (req.user.role !== 'mentor') {
      return res.status(403).json({
        statusCode: 403,
        message: 'Akses ditolak! Hanya mentor yang diperbolehkan.',
      });
    }

    next();
  } catch (err) {
    return res.status(401).json({
      statusCode: 401,
      message: 'Token invalid atau kedaluwarsa!',
    });
  }
};

module.exports = onlyMentorMiddleware;
