import dotenv from "dotenv";
import { Config } from "../types/types";
dotenv.config();

export const config: Config = {
  port: Number(process.env.PORT),
  jwtKey: process.env.JWT_KEY || "",
  jwtExpiredIn: Number(process.env.JWT_EXPIREDIN),
  dbName: process.env.DB_NAME || "",
  dbPort: Number(process.env.DB_PORT),
  dbHost: process.env.DB_HOST || "",
  dbUser: process.env.DB_USER || "",
  dbPassword: process.env.DB_PASSWORD || "",
};
