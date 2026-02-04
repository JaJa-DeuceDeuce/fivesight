import { env } from "@fivesight/env/server";
import * as schema from "./schema";

import { drizzle } from "drizzle-orm/node-postgres";

export const db = drizzle(env.DATABASE_URL, { schema });
