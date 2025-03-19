import { Router } from "express";
import { upload } from "../../config/multer";
import * as ProductController from "./product.controller";
import * as ProductValidator from "./product.validator";
import { checkAuth } from "../../middlewares/checkAuth";
import { checkValidationResult } from "../../middlewares/checkValidationResult";

const router: Router = Router();

router.get("/", checkAuth, ProductController.getProducts);

router.get(
  "/paginate",
  ProductValidator.paginate,
  checkValidationResult,
  checkAuth,
  ProductController.paginateProducts
);

router.get("/:id", checkAuth, ProductController.getProductById);

router.post(
  "/",
  checkAuth,
  upload.fields([
    { name: "mainImage", maxCount: 1 },
    { name: "images", maxCount: 5 },
  ]),
  ProductValidator.createProduct,
  checkValidationResult,
  ProductController.createNewProduct
);

export default router;
