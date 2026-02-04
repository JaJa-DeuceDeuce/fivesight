import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { env } from "@fivesight/env/server";
import { db } from  "@fivesight/db";
import * as schema from "@fivesight/db/schema/auth";

// This is our auth, it controls what auth we use and how it works and whatnot
export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: schema,
  }),
  trustedOrigins: [ env.CORS_ORIGIN ],
  emailAndPassword: {
    enabled: true,
  },
  advanced: {
    defaultCookieAttributes: {
      sameSite: "none",
      secure: true,
      httpOnly: true,
    },
  },
  plugins: [],
})
