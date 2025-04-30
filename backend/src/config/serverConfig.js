import "dotenv/config";

export const PORT = process.env.PORT;
export const DB_DEV_URL = process.env.DB_DEV_URL;
export const DB_PROD_URL = process.env.DB_PROD_URL;
export const NODE_ENV = process.env.NODE_ENV;
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;
export const JWT_SECRET = process.env.JWT_SECRET;
