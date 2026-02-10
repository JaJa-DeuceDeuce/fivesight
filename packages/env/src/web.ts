import "dotenv/config";
import arkenv from 'arkenv';

export const env = arkenv({
  clientPrefix: "'VITE_'",
  client: {
    VITE_SERVER_URL: "string.url"
  },
  runtimeEnv: (import.meta as any).env,
})
