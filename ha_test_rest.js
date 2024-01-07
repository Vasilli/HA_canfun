const superagent = require('superagent');

var headersOpt = {
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJkMDZmNTRhNzI4NDk0NDliYTNkNWFhZGEwMjA1MzcyYSIsImlhdCI6MTcwNDU4OTMxMiwiZXhwIjoyMDE5OTQ5MzEyfQ.WqMshC_Pp0wYG0Bao2eronDEDDc5EiYQPZnCDF0UVFU", 
  "content-type": "application/json"
};


superagent
  .post('http://192.168.12.100:8123/api/states/sensor.myinput2')
  .send({"state":81.5, "attributes": {"unit_of_measurement": "%", "friendly_name": "Remote Input 2"}})
  .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJkMDZmNTRhNzI4NDk0NDliYTNkNWFhZGEwMjA1MzcyYSIsImlhdCI6MTcwNDU4OTMxMiwiZXhwIjoyMDE5OTQ5MzEyfQ.WqMshC_Pp0wYG0Bao2eronDEDDc5EiYQPZnCDF0UVFU')
  .set('accept', 'json')
  .end((err, res) => {
    console.log(res.text);
  });


