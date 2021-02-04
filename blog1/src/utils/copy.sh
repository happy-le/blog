#!/bin/sh
cd /Users/xule/my_code/blog/blog1/logs/access.log
cp access.log $(date +%Y-%m-%d).access.log
echo "" > access.log