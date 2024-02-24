#!/bin/bash

#ha_token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJkMDZmNTRhNzI4NDk0NDliYTNkNWFhZGEwMjA1MzcyYSIsImlhdCI6MTcwNDU4OTMxMiwiZXhwIjoyMDE5OTQ5MzEyfQ.WqMshC_Pp0wYG0Bao2eronDEDDc5EiYQPZnCDF0UVFU"

#curl -X POST \
#  http://192.168.12.100:8123/api/states/sensor.myinput1 \
#    -H "Authorization: Bearer ${ha_token}" \
#    -H "Content-Type: application/json" \
#    -d '{"state":88.7, "attributes": {"unit_of_measurement": "%", "friendly_name": "Remote Input 1"}}'



#curl -X POST \
#  http://192.168.12.100:9091/metrics/job/top \
#    -H "Content-type: text/plain" \
#    -d 'cpu_usage{process="bash",pid="1296111"} 0.0'

echo "cpu_usage 3.14" | curl --data-binary @- http://192.168.12.100:9091/metrics/job/canbus

exit 0

#Push a single sample into the group identified by {job="some_job"}:
#  echo "some_metric 3.14" | curl --data-binary @- http://pushgateway.example.org:9091/metrics/job/some_job



#Push something more complex into the group identified by {job="some_job",instance="some_instance"}:

#  cat <<EOF | curl --data-binary @- http://pushgateway.example.org:9091/metrics/job/some_job/instance/some_instance
#  # TYPE some_metric counter
#  some_metric{label="val1"} 42
#  # TYPE another_metric gauge
#  # HELP another_metric Just an example.
#  another_metric 2398.283
#  EOF


