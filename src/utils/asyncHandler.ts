import { Request, Response, NextFunction } from "express";
import { AuthReq } from "../types/AuthReq";

const asyncHandler =
  (
    fn: (
      req: Request | AuthReq,
      res: Response,
      next: NextFunction
    ) => Promise<any>
  ) =>
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

export default asyncHandler;
