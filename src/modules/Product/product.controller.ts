import AppDataSource from "../../config/db";
import { Product, ProductCategory } from "./product.entity";
import asyncHandler from "../../utils/asyncHandler";
import { AuthReq } from "../../types/AuthReq";

export const getProducts = asyncHandler(async (req, res) => {
  const products = await AppDataSource.getRepository(Product).find();
  res.json(products);
});

export const createNewProduct = asyncHandler(async (req: AuthReq, res) => {
  const mainImage = req.files["mainImage"] as Express.Multer.File;
  const images = (req.files["images"] as Express.Multer.File[]) || [];

  if (!mainImage) {
    return res.status(400).json({ message: "Main Image is required" });
  }

  const mainImageId = mainImage[0].filename;

  const imagesIds = images.map((file) => file.filename);

  const newProduct = AppDataSource.getRepository(Product).create({
    ...(req.body as Product),
    mainImage: mainImageId,
    images: imagesIds,
    userId: (req.user as any).id,
  });

  const savedProduct = await AppDataSource.getRepository(Product).save(
    newProduct
  );

  res
    .status(201)
    .json({ message: "Product Created Successfully", product: savedProduct });
});

export const getProductById = asyncHandler(async (req, res) => {
  const product = await AppDataSource.getRepository(Product).findOneBy({
    id: req.params.id,
  });
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  res.json(product);
});

export const paginateProducts = asyncHandler(async (req, res) => {
  // const page = parseInt(req.query.page as string) || 1;
  // const limit = parseInt(req.query.limit as string) || 10;
  // const skip = (page - 1) * limit;
  const category = req.query.category as ProductCategory | undefined;
  const userId = req.query.userId as string | undefined;

  const filter = {};

  if (category) {
    Object.assign(filter, { category });
  }

  if (userId) {
    Object.assign(filter, { userId });
  }

  const [products, total] = await AppDataSource.getRepository(
    Product
  ).findAndCount({
    // take: limit,
    // skip,
    where: filter,
  });

  res.json({ products, total });
});

export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await AppDataSource.getRepository(Product).findOneBy({
    id: req.params.id,
  });
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  await AppDataSource.getRepository(Product).remove(product);
  res.json({ message: "Product deleted successfully" });
});
