import { Elysia } from 'elysia';
import { auth as betterAuth} from "@fivesight/auth";

export const auth = new Elysia()
  .all("/auth/*", async ({ request, status }) => {
    if (["POST", "GET"].includes(request.method)) {
      return betterAuth.handler(request)
    }
    return status(405);
  })
