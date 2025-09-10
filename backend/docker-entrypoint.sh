#!/bin/sh
set -e

/wait
npm run db:migrate

exec "$@"
