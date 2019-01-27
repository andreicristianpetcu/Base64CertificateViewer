#!/usr/bin/env bash
rm -rf packages && npm i && node_modules/gulp/bin/gulp.js pack --production --vendor=firefox
