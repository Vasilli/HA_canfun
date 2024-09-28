# HA_canfun

# git add .
# git status
# git commit -m 'add hello-world.js'
# git push -u origin main

#------- service ----
sudo nano /etc/systemd/system/canbus.service 

sudo systemctl status canbus

sudo systemctl start canbus

sudo systemctl enable canbus
