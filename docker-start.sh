#!/bin/bash

#echo "\n\n\nNpm install:"
#yarn install

#echo "\n\n\nAdd CORS and VOW"
#adonis install @adonisjs/cors
#adonis install @adonisjs/vow

echo "\n\n\nRun migration:"
adonis migration:run --force

echo "\n\n\nStart node server:"
adonis serve --dev

