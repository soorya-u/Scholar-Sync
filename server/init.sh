#!/bin/bash

surreal start --bind 0.0.0.0:8080 file:data --auth --user root --pass root &
SURREALDB_PID=$!

while ! nc -z 0.0.0.0 8080; do
  sleep 0.1
done

./main &
MAIN_PID=$!

wait -n

exit $?
