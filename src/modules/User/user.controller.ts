import { BCRYPT_SALT, JWT_SECRET } from "../../config/config";
import AppDataSource from "../../config/db";
import { AuthReq } from "../../types/AuthReq";
import asyncHandler from "../../utils/asyncHandler";
import { User } from "./user.entity";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";

const userRepository = AppDataSource.getRepository(User);

const generateToken = (user: User, options?: jwt.SignOptions) => {
  return jwt.sign({ id: user.id }, JWT_SECRET, options);
};

export const getUsers = asyncHandler(async (req, res) => {
  const users = await userRepository.find();
  users.forEach((user) => {
    delete user.password;
  });
  res.json(users);
});

export const register = asyncHandler(async (req, res) => {
  req.body.password = await bcrypt.hash(req.body.password, BCRYPT_SALT);
  const user = userRepository.create(req.body as User);
  await userRepository.save(user);
  const accessToken = generateToken(user, {
    expiresIn: "1h",
  });
  const refreshToken = generateToken(user);
  res.cookie("refreshToken", refreshToken, { httpOnly: true });
  delete user.password;
  res.json({ user, token: accessToken });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body as User;
  const user = await userRepository.findOneBy({ email });
  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid email or password" });
  }
  const accessToken = generateToken(user, {
    expiresIn: "1h",
  });
  const refreshToken = generateToken(user);
  res.cookie("refreshToken", refreshToken, { httpOnly: true });
  delete user.password;
  res.json({ user, token: accessToken });
});

export const logout = asyncHandler(async (req, res) => {
  res.clearCookie("refreshToken");
  res.json({ message: "Logged out" });
});

export const refreshToken = asyncHandler(async (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
    const accessToken = generateToken(user, {
      expiresIn: "1h",
    });
    res.json({ token: accessToken });
  });
});

export const getUserById = asyncHandler(async (req, res) => {
  const user = await userRepository.findOneBy({ id: req.params.id });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  delete user.password;
  res.json(user);
});

export const getMyProfile = asyncHandler(async (req: AuthReq, res) => {
  const user = await userRepository.findOneBy({ id: req.user.id });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  delete user.password;
  res.json(user);
});

export const updateUser = asyncHandler(async (req: AuthReq, res) => {
  const id = req.user.id;
  const user = await userRepository.findOneBy({ id });
  if (!user) {
    return res.status(400).json({ message: "Bad Request, token invalid" });
  }
  if (req.body.email) {
    const existingUser = await userRepository.findOneBy({
      email: req.body.email,
    });
    if (existingUser && existingUser.id !== id) {
      return res.status(400).json({ message: "Email already in use" });
    }
  }
  if (req.body.password) {
    const isPasswordValid = await bcrypt.compare(
      req.body.oldPassword,
      user.password
    );
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }
    req.body.password = await bcrypt.hash(req.body.password, BCRYPT_SALT);
  }
  if (req.body.oldPassword) {
    delete req.body.oldPassword;
  }
  if (req.file) {
    req.body.profilePicture = req.file.filename;
    console.log("File:", req.file.filename);
    console.log(req.body);
  }
  await userRepository.update(id, req.body as User);
  const updatedUser = await userRepository.findOneBy({ id: req.params.id });
  delete updatedUser.password;
  res.json(updatedUser);
});
