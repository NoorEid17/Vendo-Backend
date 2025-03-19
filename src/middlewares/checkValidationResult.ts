import { type FieldValidationError, validationResult } from "express-validator";

export const checkValidationResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors
        .array()
        .map((err) => ({
          field: (err as FieldValidationError).path,
          message: err.msg,
        })),
    });
  }
  next();
};
