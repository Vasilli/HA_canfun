const can        = require('./init.js');
const binary     = require('./node_binary.js');
const analog     = require('./node_analog.js');
//const util       = require('util');
//const superagent = require('superagent');
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


/*
//==============BINARY=========
//---------------------------
var oldbyte = {};
// byte: 00,01,02,03,04,05,06,07
// bit:  07,06,05,04,03,02,01,00
function findBytePosition(id, newbyte) {

  if(oldbyte[id]) {
    var lastdata = oldbyte[id];

    for(var bytepos = 0; bytepos < newbyte.length; bytepos++) {

       if(newbyte[bytepos] !== lastdata[bytepos]) {

         findBitPosition(id, bytepos, newbyte[bytepos], lastdata[bytepos]);
      } // if
    } // for
  } // if
  oldbyte[id] = newbyte;
}

//---------------------------
function findBitPosition(id, bytepos, new_byte, old_byte) {

  var odt, ndt;
  for(var bitpos = 0; bitpos < 8; bitpos++) {

    odt = (old_byte & (1 << bitpos));
    ndt = (new_byte & (1 << bitpos));

    if(odt !== ndt && candesc[id].hasOwnProperty(bytepos)) {
      var bitstat = ndt ? 'on' : 'off';
      addJSON(id, bytepos, bitpos, bitstat);
    }
  }
}

//---------------------------
function addJSON(id, bytepos, bitpos, bitstat) {

  if(candesc[id] && candesc[id][bytepos] && candesc[id][bytepos][bitpos]) {
    var json = {'attributes':{}};

    json.entity_id = candesc[id][bytepos][bitpos].sn;
    json.state = bitstat;
    json.attributes.id = id;
    json.attributes.idx = bytepos;
    json.attributes.pos = bitpos;
    json.attributes.friendly_name = candesc[id][bytepos][bitpos].fn;

    rest_POST(json);
  }
}


//==============ANALOG=========

//---------------------------
var oldskip = {};
function getByteData(id, newbyte) {

  //console.log(id,' : ', newbyte);
  var skip = oldskip[id] || 0;
  if(skip) {
    oldskip[id] -= 1;
  }
  else {
    oldskip[id] = analogdesc[id].skip;

    if(analogdesc[id].hasOwnProperty('byte')) {
      var value = 0;
      for(const bytedata of analogdesc[id].byte) {
        value += newbyte[bytedata];
      }
      addAnalogJSON(id, value);
    } // if
  } // if
}

//---------------------------
function addAnalogJSON(id, value) {

  var json = {'attributes':{}};
  json.entity_id = analogdesc[id].sn;
  json.state = value;
  json.attributes.id = id;
  json.attributes.friendly_name = analogdesc[id].fn;
  //console.log(json);
  rest_POST(json);
}


//---------------------------
function rest_POST(json) {

  superagent
    .post('http://192.168.12.100:8123/api/states/' + json.entity_id)
    .send(json)
    .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJkMDZmNTRhNzI4NDk0NDliYTNkNWFhZGEwMjA1MzcyYSIsImlhdCI6MTcwNDU4OTMxMiwiZXhwIjoyMDE5OTQ5MzEyfQ.WqMshC_Pp0wYG0Bao2eronDEDDc5EiYQPZnCDF0UVFU')
    .set('accept', 'json')
    .end((err, res) => {
      //console.log(res.text);
      //console.log('--------------');
    });
}

*/
