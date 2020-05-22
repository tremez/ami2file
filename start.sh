#!/bin/bash
source config.sh
pm2 start index.js --o OUTPUT_FILE --name ami2file