#!/bin/bash
echo "🎵 YT Tier Maker を起動中..."
cd "$(dirname "$0")"
node server.js &
sleep 1
echo "✅ http://localhost:3456 で起動しました"
# Open browser (Mac/Linux compatible)
if command -v open &>/dev/null; then
  open http://localhost:3456
elif command -v xdg-open &>/dev/null; then
  xdg-open http://localhost:3456
else
  echo "ブラウザで http://localhost:3456 を開いてください"
fi
wait
