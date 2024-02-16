#!/bin/bash

ps aux | tr -s ' ' ',' | cut -d, -f2,11 |
while read pid process; do
    req="cpu_usage{process=$process,pid=$pid}"
    echo $req
    curl -X POST -H "Content-type: text/plain" --data "$req" http://192.168.12.100:9090/metrics/canbus
done

exit 0

curl --data-urlencode 'query=up{job="canbus"}' --data-urlencode 'cpu_usage{process=10,pid=25,200}'5ttp://192.168.12.100:9090/api/v1/query

