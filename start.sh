#!/bin/sh
# Run database migrations before starting the server
npx prisma migrate deploy
# Start the Next.js server
node server.js
