import cors from "@elysiajs/cors";
import { env } from "@fivesight/env/server";
import { Elysia } from "elysia";
import { auth as authController } from "./auth/controller"
import { todoController } from "./example/controller";

const app = new Elysia()
  .use(
    cors({
      origin: env.CORS_ORIGIN,
      methods: ["GET", "POST", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true,
    })
  )
  .use(authController)
  .get("/", () => "OK")
  .get("/hi", () => 'Hi Elyssia')
  .use(todoController)
  .listen(env.PORT, () => {
    console.log(`Server is running on http://localhost:${env.PORT} 🦊}`)
  })

export type App = typeof app;
