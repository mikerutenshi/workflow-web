#!/bin/sh
set -e

/wait
npm run migrate:deploy

exec "$@"
