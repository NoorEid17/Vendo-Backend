import { Router } from "express";
import { upload } from "../../config/multer";
import * as ProductController from "./product.controller";
import * as ProductValidator from "./product.validator";
import { checkAuth } from "../../middlewares/checkAuth";
import { checkValidationResult } from "../../middlewares/checkValidationResult";

const router: Router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The product ID
 *         title:
 *           type: string
 *           description: The product title
 *         location:
 *           type: string
 *           description: The product location
 *         phoneNumber:
 *           type: string
 *           description: The product phone number
 *         price:
 *           type: number
 *           description: The product price
 *         category:
 *           type: string
 *           description: The product category
 *         description:
 *           type: string
 *           description: The product description
 *         mainImage:
 *           type: string
 *           description: The main image of the product
 *         images:
 *           type: array
 *           items:
 *             type: string
 *           description: The images of the product
 */

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management and retrieval
 */
/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get a list of products with optional filters
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter products by category
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         description: Filter products by user id
 *     responses:
 *       200:
 *         description: A list of products
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 products:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *                 total:
 *                   type: integer
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The product ID
 *     responses:
 *       200:
 *         description: Product details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     security:
 *      bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               mainImage:
 *                 type: string
 *                 format: binary
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               location:
 *                type: string
 *               phoneNumber:
 *                type: string
 *               category:
 *                type: string
 *               whatsappLink:
 *                type: string
 *     responses:
 *       201:
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 product:
 *                   $ref: '#/components/schemas/Product'
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Delete a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The product ID
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Product not found
 *       401:
 *         description: Unauthorized
 */

router.get(
  "/",
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

router.delete("/:id", checkAuth, ProductController.deleteProduct);

export default router;
