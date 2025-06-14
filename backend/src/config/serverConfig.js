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
