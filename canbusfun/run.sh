#!/usr/bin/with-contenv bashio

CONFIG_PATH=/data/options.json
DEVICE="$(bashio::config 'device')"
BITRATE="$(bashio::config 'bitrate')"

echo "Config: DEVICE=$DEVICE BITRATE=$BITRATE"

# Print current status
ip link show "$DEVICE"

# If the device is already up, bring it down first.
if [ "$(cat "/sys/class/net/$DEVICE/operstate")" == "up" ]; then
  ip link set "$DEVICE" down
fi

ip link set "$DEVICE" up type can bitrate "$BITRATE"
ip link set "$DEVICE" up

# Print current status
ip link show "$DEVICE"

echo "Start python http server on 8000 port"
python3 -m http.server 8000
#echo "Start /opt/HA_canfun nodes server"
#cd /opt/HA_canfun
#node server.js

