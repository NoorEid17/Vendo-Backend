import { Router } from "express";
import * as CategoryController from "./category.controller";
import * as CategoryValidator from "./category.validator";
import { upload } from "../../config/multer";
import { checkValidationResult } from "../../middlewares/checkValidationResult";

const router: Router = Router();

router.get("/", CategoryController.getAllCategories);

router.post(
  "/",
  upload.single("image"),
  CategoryValidator.createCategory,
  checkValidationResult,
  CategoryController.createCategory
);

export default router;
