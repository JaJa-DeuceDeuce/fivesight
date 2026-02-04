import "dotenv/config";
import arkenv from 'arkenv';

export const env = arkenv({
  PORT: "number.port",

  CORS_ORIGIN: "string.url",

  DATABASE_URL: "string.url",
  DATABASE_USER: "string",
  DATABASE_PASSWORD: "string",

  BETTER_AUTH_SECRET: "string.base64",
  BETTER_AUTH_URL: "string.url"
});
