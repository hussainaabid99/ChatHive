import "dotenv/config";

export const PORT = process.env.PORT;
export const DB_DEV_URL = process.env.DB_DEV_URL;
export const DB_PROD_URL = process.env.DB_PROD_URL;
export const NODE_ENV = process.env.NODE_ENV;
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;
export const JWT_SECRET = process.env.JWT_SECRET;
export const MAIL_ID = process.env.MAIL_ID;
export const MAIL_APP_PASS = process.env.MAIL_APP_PASS;
export const REDIS_HOST = process.env.REDIS_HOST || "localhost";
export const REDIS_PORT = process.env.REDIS_PORT || 6379;
export const ENABLE_EMAIL_VERIFICATION =
  process.env.ENABLE_EMAIL_VERIFICATION || false;
export const APP_NAME = process.env.APP_NAME || "App";
export const APP_LINK = process.env.APP_LINK || "http://localhost:3000";
export const CLOUDINARY_URL = process.env.CLOUDINARY_URL;
export const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;
