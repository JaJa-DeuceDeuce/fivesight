import { treaty } from "@elysiajs/eden";
import type { App } from "@fivesight/server";
import { env } from "@fivesight/env/server";

export const api = treaty<App>(`localhost:${env.PORT}`);
