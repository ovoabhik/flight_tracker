#!/bin/bash
cd "$(dirname "$0")"
echo "Starting Flight Tracker..."
open http://localhost:3000
npm run dev
