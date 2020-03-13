#!/bin/bash

echo "\n\n\nNpm install:"
yarn install

echo "\n\n\nAdd CORS:"
adonis install @adonisjs/cors

echo "\n\n\nRun migration:"
adonis migration:run --force

echo "\n\n\nStart node server:"
adonis serve

