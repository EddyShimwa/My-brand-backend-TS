import { Request, Response, NextFunction } from 'express';

export function asyncHandler(fn: Function) {
    return (req: Request, res: Response, next: NextFunction): Promise<void> => {
      return Promise.resolve(fn(req, res, next)).catch(next);
    };
  }