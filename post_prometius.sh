#!/bin/bash

#z=$(ps aux)
#while read -r z; do
#   var=$var$(awk '{print "cpu_usage{process=\""$11"\", pid=\""$2"\"}", $3z}');
#done <<< "$z"

#curl -X POST -H  "Content-Type: text/plain" --data "$var
#" http://localhost:9091/metrics/job/top/instance/machine


#ps aux | tr -s ' ' ',' | cut -d, -f2,11 |
#while read pid process; do
#    req="cpu_usage{process=$process,pid=$pid}"
#    echo $req
#    curl -X POST -H "Content-type: text/plain" --data "$req" http://192.168.12.100:9091/metrics/job/top/instance/machine
#done

#z=$(ps aux)
#while read -r z; do
#  echo $(awk '{print "cpu_usage{process=\""$11"\",pid=\""$2"\"}", $3z}');
#   var=$var$(awk '{print "cpu_usage{process=\""$11"\",pid=\""$2"\"}", $3z}\n');
#done <<< "$z"

#echo $var
#curl -X POST -H "Content-Type: text/plain" --data "$var" http://192.168.12.100:9091/metrics/job/top/instance/machine


#cpu_usage{process="bash",pid="1296111"} 0.0

#curl --data-urlencode 'query=up{job="canbus"}' --data-urlencode 'cpu_usage{process=10,pid=25} 10' http://192.168.12.100:9090/api/v1/query

curl -X POST -H "Content-type: text/plain" --data 'cpu_usage{process="bash",pid="1296111"} 0.0' http://192.168.12.100:9091/metrics/job/top/instance/machine

exit 0

