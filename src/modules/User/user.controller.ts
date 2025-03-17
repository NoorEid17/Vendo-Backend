import { BCRYPT_SALT, JWT_SECRET } from "../../config/config";
import AppDataSource from "../../config/db";
import asyncHandler from "../../utils/asyncHandler";
import { User } from "./user.entity";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";

const userRepository = AppDataSource.getRepository(User);

const generateToken = (user: User) => {
  return jwt.sign({ id: user.id }, JWT_SECRET);
};

export const getUsers = asyncHandler(async (req, res) => {
  const users = await userRepository.find();
  res.json(users);
});

export const register = asyncHandler(async (req, res) => {
  req.body.password = await bcrypt.hash(req.body.password, BCRYPT_SALT);
  const user = userRepository.create(req.body as User);
  await userRepository.save(user);
  const accessToken = generateToken(user);
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
  const accessToken = generateToken(user);
  const refreshToken = generateToken(user);
  res.cookie("refreshToken", refreshToken, { httpOnly: true });
  delete user.password;
  res.json({ user, token: accessToken });
});
