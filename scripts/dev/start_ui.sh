#!/bin/sh

set -e

echo 'installing required node modules'
cd frontend
npm install
echo "node modules installed succesfully"
echo "starting the node server"
npm start --port 3000