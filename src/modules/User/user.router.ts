import { Router } from "express";
import * as UserController from "./user.controller";
import * as UserValidator from "./user.validator";
import { checkValidationResult } from "../../middlewares/checkValidationResult";

const router: Router = Router();

router.get("/", UserController.getUsers);

router.post(
  "/register",
  UserValidator.register,
  checkValidationResult,
  UserController.register
);

router.post(
  "/login",
  UserValidator.login,
  checkValidationResult,
  UserController.login
);

export default router;
