const can        = require('./init.js');
const binary     = require('./node_binary.js');
const analog     = require('./node_analog.js');
const candesc    = require('./CAN_BINARY.json');
const canids     = Object.keys(candesc);
const analogdesc = require('./CAN_ANALOG.json');
const analogids  = Object.keys(analogdesc);


//---------------------------
can.onMessage(function(msg) {

  var id = can.byteToHex(msg.id);
  //console.log('id:',id);
  if(canids.includes(id)) { // binary
    binary.findBytePosition(id, msg.data);
  }
  if(analogids.includes(id)) { // analog
    analog.getByteData(id, msg.data);
  } // if
});

