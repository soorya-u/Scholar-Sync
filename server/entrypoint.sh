#!/bin/bash
set -e

echo "🕒 Sleeping for 10 seconds to wait for SurrealDB..."
sleep 10

echo "🚀 Starting server..."
exec /app/main
