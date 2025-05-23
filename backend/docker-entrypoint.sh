#!/bin/sh
set -e

/wait
npx prisma migrate deploy
npm run db:seed

exec "$@"
