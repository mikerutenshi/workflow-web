import 'dotenv/config';
import { defineConfig } from 'prisma/config';
// import { config } from 'dotenv';
// import { resolve } from 'path';

// config({ path: resolve(__dirname, '.env.staging') });
export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    url: process.env.DATABASE_URL,
    shadowDatabaseUrl: process.env.SHADOW_DATABASE_URL,
  },
});
