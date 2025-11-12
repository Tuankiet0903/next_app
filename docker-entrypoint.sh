#!/bin/sh
set -e

# Run Prisma migrations if DATABASE_URL is set
if [ -n "$DATABASE_URL" ]; then
  echo "Running Prisma migrations..."
  npx prisma db push
else
  echo "DATABASE_URL not set. Skipping migrations."
fi

# Start Next.js server
node server.js
