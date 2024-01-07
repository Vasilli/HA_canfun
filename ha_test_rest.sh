#!/bin/bash

ha_token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJkMDZmNTRhNzI4NDk0NDliYTNkNWFhZGEwMjA1MzcyYSIsImlhdCI6MTcwNDU4OTMxMiwiZXhwIjoyMDE5OTQ5MzEyfQ.WqMshC_Pp0wYG0Bao2eronDEDDc5EiYQPZnCDF0UVFU"

curl -X POST \
  http://192.168.12.100:8123/api/states/sensor.myinput1 \
    -H "Authorization: Bearer ${ha_token}" \
    -H "Content-Type: application/json" \
    -d '{"state":88.7, "attributes": {"unit_of_measurement": "%", "friendly_name": "Remote Input 1"}}'

exit 0

