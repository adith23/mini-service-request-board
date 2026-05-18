import dotenv from "dotenv";

dotenv.config();

type NodeEnv = "development" | "test" | "production";

interface AppConfig {
  env: NodeEnv;
  isProduction: boolean;
  port: number;
  corsOrigins: string[];
  mongoUri: string;
  jwtSecret: string;
  jwtExpiresIn: string;
}

function readRequiredEnv(name: string): string {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

function readPort(value: string | undefined): number {
  const port = Number(value ?? 5000);

  if (!Number.isInteger(port) || port <= 0 || port > 65535) {
    throw new Error("PORT must be a valid TCP port number");
  }

  return port;
}

function readNodeEnv(value: string | undefined): NodeEnv {
  const env = value ?? "development";

  if (env !== "development" && env !== "test" && env !== "production") {
    throw new Error("NODE_ENV must be one of: development, test, production");
  }

  return env;
}

function readCorsOrigins(value: string | undefined): string[] {
  const origins = (value?.trim() || "http://localhost:3000")
    .split(",")
    .map((origin) => origin.trim().replace(/\/+$/, ""))
    .filter(Boolean);

  return origins.length > 0 ? origins : ["http://localhost:3000"];
}

const env = readNodeEnv(process.env.NODE_ENV);

export const config: AppConfig = {
  env,
  isProduction: env === "production",
  port: readPort(process.env.PORT),
  corsOrigins: readCorsOrigins(process.env.CORS_ORIGIN),
  mongoUri: readRequiredEnv("MONGODB_URI"),
  jwtSecret: readRequiredEnv("JWT_SECRET"),
  jwtExpiresIn: process.env.JWT_EXPIRES_IN?.trim() || "7d",
};
