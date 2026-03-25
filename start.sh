#!/bin/sh
set -e

echo "=== DEBUG: Environment check ==="
echo "NODE_ENV: $NODE_ENV"
echo "DATABASE_URL set: $([ -n "$DATABASE_URL" ] && echo 'yes' || echo 'NO')"
echo "AUTH_SECRET set: $([ -n "$AUTH_SECRET" ] && echo 'yes' || echo 'NO')"
echo "GITHUB_ID set: $([ -n "$GITHUB_ID" ] && echo 'yes' || echo 'NO')"

echo "=== DEBUG: File check ==="
echo "prisma.config.ts exists: $([ -f prisma.config.ts ] && echo 'yes' || echo 'NO')"
echo "prisma/schema.prisma exists: $([ -f prisma/schema.prisma ] && echo 'yes' || echo 'NO')"
echo "prisma/migrations dir exists: $([ -d prisma/migrations ] && echo 'yes' || echo 'NO')"
ls -la prisma/migrations/ 2>&1 || echo "Cannot list migrations dir"
echo "src/generated/prisma exists: $([ -d src/generated/prisma ] && echo 'yes' || echo 'NO')"
echo "node_modules/prisma exists: $([ -d node_modules/prisma ] && echo 'yes' || echo 'NO')"
echo "node_modules/@prisma exists: $([ -d node_modules/@prisma ] && echo 'yes' || echo 'NO')"

echo "=== DEBUG: Running prisma migrate deploy ==="
node node_modules/prisma/build/index.js migrate deploy 2>&1 || echo "!!! MIGRATION FAILED !!!"

echo "=== DEBUG: Starting server ==="
node server.js
