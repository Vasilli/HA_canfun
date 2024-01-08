const can     = require('./init.js');
const util    = require('util');
const superagent = require('superagent');
const candesc = require('./CAN_DATA.json');
const canids = Object.keys(candesc);


//---------------------------
can.onMessage(function(msg) {

  var id = can.byteToHex(msg.id);
  if(canids.includes(id)) { // only if have in canDesc file

    findPost(id, msg.data);

  } // if
});

//---------------------------
var lastobj = {};
// byte: 00,01,02,03,04,05,06,07
// bit:  07,06,05,04,03,02,01,00
function findPost(id, data) {

  if(lastobj[id]) {

    var lastdata = lastobj[id];

    for(var pos = 0; pos < data.length; pos++) {

       if(data[pos] !== lastdata[pos]) {

         var bit = findBitPos(data[pos], lastdata[pos]);

        for(var idx = 0; idx < 8; idx++) {
          if(bit.hasOwnProperty(idx)) {
            addJSON(id, idx, pos, bit);
          }
        }
      } // if
    } // for
  } // if
  lastobj[id] = data;

}

//---------------------------
function addJSON(id, idx, pos, bit) {

  var json = {'attributes':{}};

  if(candesc[id][idx].sn) {
    json.entity_id = candesc[id][idx].sn;
    json.state = bit[idx] ? 'on' : 'off';
    json.attributes.id = id;
    json.attributes.idx = idx;
    json.attributes.pos = pos;
    json.attributes.friendly_name = candesc[id][idx].fn;
    rest_POST(json);
  }
}

//---------------------------
function findBitPos(newData, lastData) {

  var json = {}, odt, ndt;

  for(var pos = 0; pos < 8; pos++) {

    odt = (lastData & (1 << pos));
    ndt = (newData  & (1 << pos));

    if(odt !== ndt)
      json[pos] = !!ndt;
  }
  return json;
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
    });

}


// console.log("c:",candesc[id][idx]," :",bit[idx]);
//       console.log('   b:',x,' m:',can.decToHex(data[x],8),' l:',can.decToHex(lastdata[x],8),' :',data[x] !== lastdata[x]);
//  console.log(util.inspect(msg, {depth: null}));
//  console.log('msg.id:',msg.id,' hex.id:',can.decToHex(msg.id),' inc:',canids.includes(can.byteToHex(msg.id)));
