#!/usr/bin/env bash
set -e
PORT="${PORT:-3000}"

if lsof -nP -iTCP:"$PORT" -sTCP:LISTEN >/dev/null 2>&1; then
  echo "Server already running on http://localhost:$PORT"
  exit 0
fi

echo "Starting Next.js dev server on port $PORT..."
nohup env PORT="$PORT" npm run dev > dev-cli.log 2>&1 &
echo $! > .next-dev-cli.pid

for i in {1..90}; do
  if lsof -nP -iTCP:"$PORT" -sTCP:LISTEN >/dev/null 2>&1; then
    echo "Server started on http://localhost:$PORT"
    exit 0
  fi
  sleep 1
done

echo "Timed out waiting for server on port $PORT" >&2
exit 1

