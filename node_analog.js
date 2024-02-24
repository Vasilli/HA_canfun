const client     = require('prom-client');
const analogdesc = require('./CAN_ANALOG.json');
const analogids  = Object.keys(analogdesc);

console.log('analog:',analogids);

//==============ANALOG=========
const Registry = client.Registry;
const register = new Registry();
const gateway  = new client.Pushgateway('http://192.168.12.100:9091', [], register);

const odb2 = new client.Gauge({
  name: 'odb2',
  help: 'Gauge of ODB2',
  labelNames: ['code'],
});

register.registerMetric(odb2);

//---------------------------


module.exports.getByteData = function(id, newbyte) {

  //console.log(id,' : ', newbyte);

  if(analogdesc[id].hasOwnProperty('byte')) {

    var value = 0;
    for(const array_data of analogdesc[id].byte) {
      value += newbyte[array_data];
    }

    sendPrometheus(id, value);

  } // if
}


//  "4D7": {"nm":"signal_4D7","hp":"Sensor 4D7","byte":[3,2,1,0]},
//  "122": {"nm":"signal_122","hp":"Sensor 122","byte":[0,1]}
//---------------------------
function sendPrometheus(id, value) {

  odb2.set({ code: id }, value);

  gateway.pushAdd({ jobName: 'canbus', register })
    .then(({ resp, body }) => {
//      console.log(`Body: ${body}`);
//      console.log(`Response status: ${resp.statusCode}`);
    })
    .catch(err => {
      console.log(`Error: ${err}`);
    });
}

