#!/usr/bin/env bash
rm -rf packages && npm i && gulp pack --production --vendor=firefox
