import { Request, Response, NextFunction } from "express";
import { NODE_ENV } from "../config/config";

interface Error {
  status?: number;
  message?: string;
}

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = err.status || 500;
  const message =
    NODE_ENV === "development" ? err.message : "Internal Server Error";
  if (NODE_ENV !== "development") {
    console.error(err);
  }

  res.status(status).json({
    status,
    message,
  });
};

export default errorHandler;
