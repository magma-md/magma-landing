#!/bin/bash

clear
git pull
npm i
npm run build
clear
npm start -- --port 9445