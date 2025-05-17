#!/bin/sh
set -e

/wait
npm run db:push
npm run db:seed

exec "$@"
