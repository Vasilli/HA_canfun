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
  labelNames: ['id', 'bit'],
});

register.registerMetric(odb2);

//---------------------------
module.exports.getByteData = function(id, newbyte) {

  if(analogdesc[id].hasOwnProperty('byte')) {
//    var value = 0;
//    for(const array_data of analogdesc[id].byte) {
//      value += newbyte[array_data];
//    }

    sendPrometheus(id, newbyte);


  } // if
}

//  "4D7": {"nm":"signal_4D7","hp":"Sensor 4D7","byte":[3,2,1,0]},
//  "122": {"nm":"signal_122","hp":"Sensor 122","byte":[0,1]}
//---------------------------
function sendPrometheus(id, newbyte) {

//  console.log('id:',id,' = ',newbyte,' is:',Buffer.isBuffer(newbyte),' l:',newbyte.length);
//  console.log('id:',id,' = ',newbyte,' l:',newbyte.length);
  if(newbyte.length === 8) {
    odb2.set({ id: id, bit: 0 }, newbyte[0]);
    odb2.set({ id: id, bit: 1 }, newbyte[1]);
    odb2.set({ id: id, bit: 2 }, newbyte[2]);
    odb2.set({ id: id, bit: 3 }, newbyte[3]);
    odb2.set({ id: id, bit: 4 }, newbyte[4]);
    odb2.set({ id: id, bit: 5 }, newbyte[5]);
    odb2.set({ id: id, bit: 6 }, newbyte[6]);
    odb2.set({ id: id, bit: 7 }, newbyte[7]);
  }
  if(newbyte.length === 2) {
    odb2.set({ id: id, bit: 0 }, newbyte[0]);
    odb2.set({ id: id, bit: 1 }, newbyte[1]);
  }
  if(newbyte.length === 1) {
    odb2.set({ id: id, bit: 0 }, newbyte[0]);
  }

  gateway.pushAdd({ jobName: 'canbus', register })
    .then(({ resp, body }) => {
//      console.log(`Body: ${body}`);
//      console.log(`Response status: ${resp.statusCode}`);
//      console.log('Resp:',resp);
    })
    .catch(err => {
      console.log(`Error: ${err}`);
    });
}

