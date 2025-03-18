export const NODE_ENV = process.env.NODE_ENV || "development";
export const PORT = parseInt(process.env.PORT || "3000");

export const DB_HOST = process.env.DB_HOST || "localhost";
export const DB_PORT = parseInt(process.env.DB_PORT || "3306");
export const DB_USER = process.env.DB_USER;
export const DB_PASS = process.env.DB_PASS;
export const DB_NAME = process.env.DB_NAME;

export const JWT_SECRET = process.env.JWT_SECRET || "secret";
export const BCRYPT_SALT = parseInt(process.env.BCRYPT_SALT || "10");
