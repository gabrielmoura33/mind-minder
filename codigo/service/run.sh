#!/bin/sh
set -e
npx prisma migrate deploy
yarn start:dev