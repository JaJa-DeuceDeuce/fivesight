import { defineConfig } from "drizzle-kit";
import dotenv from "dotenv";

dotenv.config({
  path: "../../apps/server/.env"
})
// Couldn't use the env here because race conditions or something, it's lame

 export default defineConfig({
   schema: "./src/schema",
   out: "./src/migrations",
   dialect: "postgresql",
   dbCredentials: {
     url: process.env.DATABASE_URL || "", //FIXME: This should fail if it doesn't exist
     user: process.env.DATABASE_USER || "", //FIXME: This should fail if it doesn't exist
     password: process.env.DATABASE_PASSWORD || "" //FIXME: This should fail if it doesn't exist
   }
 })
