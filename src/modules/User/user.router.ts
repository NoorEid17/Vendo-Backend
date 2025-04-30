import { Router } from "express";
import * as UserController from "./user.controller";
import * as UserValidator from "./user.validator";
import { checkValidationResult } from "../../middlewares/checkValidationResult";
import { checkAuth } from "../../middlewares/checkAuth";
import { upload } from "../../config/multer";
import { check } from "express-validator";

const router: Router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         createdAt:
 *           type: string
 */

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User management
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *        description: Internal server error
 */
router.get("/", UserController.getUsers);

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User management
 * /users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *                 token:
 *                   type: string
 *         headers:
 *           Set-Cookie:
 *             description: Refresh token cookie
 *             schema:
 *               type: string
 *               example: refreshToken=your_refresh_token; HttpOnly; Path=/; Max-Age=604800; SameSite=None; Secure
 *       400:
 *         description: Bad request (invalid data) or (email is already used)
 *       500:
 *         description: Internal server error
 */
router.post(
  "/register",
  UserValidator.register,
  checkValidationResult,
  UserController.register
);

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User management
 * /login:
 *   post:
 *     summary: Login user
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *                 token:
 *                   type: string
 *         headers:
 *           Set-Cookie:
 *             description: Refresh token cookie
 *             schema:
 *               type: string
 *               example: refreshToken=your_refresh_token; HttpOnly; Path=/; Max-Age=604800; SameSite=None; Secure
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized (invalid email or password)
 *       500:
 *         description: Internal server error
 */
router.post(
  "/login",
  UserValidator.login,
  checkValidationResult,
  UserController.login
);

/**
 * @swagger
 * tags:
 *  name: User
 *  description: User management
 * /users/refresh-token:
 *  post:
 *   summary: Refresh access token
 *   description: Refresh the access token using the refresh token stored in the cookie.
 *   tags: [User]
 *   responses:
 *    200:
 *     description: Access token refreshed successfully
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *         token:
 *          type: string
 *    401:
 *     description: Unauthorized (invalid or expired refresh token)
 */
router.post("/refresh-token", UserController.refreshToken);

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User management
 * /users/logout:
 *   post:
 *     summary: Logout user
 *     tags: [User]
 *     responses:
 *       200:
 *         description: User logged out successfully
 *       500:
 *         description: Internal server error
 */
router.post("/logout", UserController.logout);

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User management
 * /users/me:
 *   get:
 *     summary: Get current user profile
 *     description: Get the profile of the currently logged-in user.
 *     tags: [User]
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized (invalid or expired access token)
 *       500:
 *         description: Internal server error
 */
router.get("/me", checkAuth, UserController.getMyProfile);

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User management
 * /users/:id:
 *   get:
 *     summary: Get a user profile
 *     description: Get the profile of a specific user.
 *     tags: [User]
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       500:
 *         description: Internal server error
 */
router.get("/:id", UserController.getUserById);

/**
 * @swagger
 * tags:
 *  name: User
 * description: User management
 * /users/me:
 *  patch:
 *   summary: Update user profile
 *   description: Update the profile of the currently logged-in user.
 *   tags: [User]
 *   requestBody:
 *    required: true
 *    content:
 *     form-data:
 *      schema:
 *       type: object
 *       properties:
 *        name:
 *         type: string
 *        email:
 *         type: string
 *        password:
 *         type: string
 *        oldPassword:
 *         type: string
 *        profilePicture:
 *         type: string
 *         format: binary
 *         description: Profile picture (optional)
 *   responses:
 *    200:
 *     description: User profile updated successfully
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *         user:
 *          $ref: '#/components/schemas/User'
 *    400:
 *     description: Bad request (invalid data) or (email used)
 *    401:
 *     description: Unauthorized (invalid or expired access token) or incorrect old password
 */
router.patch(
  "/me",
  checkAuth,
  upload.single("profilePicture"),
  UserValidator.update,
  checkValidationResult,
  UserController.updateUser
);

export default router;
