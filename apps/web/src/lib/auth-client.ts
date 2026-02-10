import { createAuthClient } from "better-auth/react";
import { env } from "@fivesight/env/web";

export const authClient = createAuthClient({
  baseURL: env.client.VITE_SERVER_URL
})
