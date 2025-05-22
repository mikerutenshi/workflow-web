#!/bin/sh
set -e

/wait
npx prisma migrate deploy

exec "$@"
