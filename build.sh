#!/bin/bash
set -e  # Exit on any error
echo "Clearing node_modules and package-lock.json"
rm -rf node_modules package-lock.json
echo "Running npm install"
npm install --verbose
echo "Running npm run build"
npm run build