import cors from "@elysiajs/cors";
import { auth } from "@fivesight/auth";
import { env } from "@fivesight/env/server";
import { Elysia } from "elysia";
import { logger } from "@grotto/logysia";

const app = new Elysia()
  .use(logger())
  .use(
    cors({
      origin: env.CORS_ORIGIN,
      methods: ["GET", "POST", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true,
    })
  )
  .all("/api/auth/*", async (context) => {
    const { request, status } = context;
    if(["POST", "GET"].includes(request.method)) {
      return auth.handler(request);
    }
    return status(405);
  })
  .get("/", () => "OK")
  .listen(env.PORT, () => {
    console.log(`Server is running on http://localhost:${env.PORT} 🦊}`)
  });
