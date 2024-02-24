//const superagent = require('superagent');

//var headersOpt = {
//  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJkMDZmNTRhNzI4NDk0NDliYTNkNWFhZGEwMjA1MzcyYSIsImlhdCI6MTcwNDU4OTMxMiwiZXhwIjoyMDE5OTQ5MzEyfQ.WqMshC_Pp0wYG0Bao2eronDEDDc5EiYQPZnCDF0UVFU", 
//  "content-type": "application/json"
//};

//superagent
//  .post('http://192.168.12.100:8123/api/states/sensor.myinput2')
//  .send({"state":81.5, "attributes": {"unit_of_measurement": "%", "friendly_name": "Remote Input 2"}})
//  .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJkMDZmNTRhNzI4NDk0NDliYTNkNWFhZGEwMjA1MzcyYSIsImlhdCI6MTcwNDU4OTMxMiwiZXhwIjoyMDE5OTQ5MzEyfQ.WqMshC_Pp0wYG0Bao2eronDEDDc5EiYQPZnCDF0UVFU')
//  .set('accept', 'json')
//  .end((err, res) => {
//    console.log(res.text);
//  });


const client = require('prom-client');

function run() {
  const Registry = client.Registry;
  const register = new Registry();
  const gateway = new client.Pushgateway('http://192.168.12.100:9091', [], register);

  const g = new client.Gauge({
    name: 'test_gauge2',
    help: 'Example of a gauge2',
    labelNames: ['code2'],
  });
  register.registerMetric(g);
  g.set({ code2: 200 }, 24);

  const g1 = new client.Gauge({
    name: 'test_gauge3',
    help: 'Example of a gauge3',
    labelNames: ['code3'],
  });
  register.registerMetric(g1);
  g1.set({ code3: 200 }, 25);


//  console.log(await register.metrics());

//	const test = new client.Counter({
//		name: `${prefix}_test`,
//		help: `${prefix}_test`,
//		registers: [register],
//	});
//	register.registerMetric(test);
//	test.inc(10);

  gateway.pushAdd({ jobName: 'canbus', register })
    .then(({ resp, body }) => {
      console.log(`Body: ${body}`);
      console.log(`Response status: ${resp.statusCode}`);
    })
    .catch(err => {
      console.log(`Error: ${err}`);
    });

//  return gateway
//    .push({ jobName: prefix })
//    .then(({ resp, body }) => {
//	console.log(`Body: ${body}`);
//	console.log(`Response status: ${resp.statusCode}`);
//    })
//    .catch(err => {
//	console.log(`Error: ${err}`);
//    });
}

run();


//const { Gauge, register ,client } = require('prom-client');
//let gateway = new client.Pushgateway('http://192.168.12.100:9091');

//async function main() {
//  const g = new Gauge({
//    name: 'test_gauge',
//    help: 'Example of a gauge',
//    labelNames: ['code'],
//  });

//  g.set({ code: 200 }, 5);
//  console.log(await register.metrics());

//  g.set(15);
//  console.log(await register.metrics());

//  gateway.pushAdd({ jobName: 'canbus', register });

//}

//main();

//const client = require('prom-client');
//let gateway = new client.Pushgateway('http://192.168.12.100:9091');

//gateway.pushAdd({ jobName: 'canbus' })
//	.then(({resp, body}) => {
//	  console.log('resp:',resp);
//          console.log('body:',body);
//	})
//	.catch(err => {
//          console.log('err:',err);
//	}); //Add metric and overwrite old ones


//const gauge = new client.Gauge({ name: 'cpu_usage', help: 'Test CPU Load' });
//gauge.set(10.0); // Set to 10
//gauge.inc(); // Increment 1
//gauge.inc(10); // Increment 10
//gauge.dec(); // Decrement by 1
//gauge.dec(10); // Decrement by 10


//echo "cpu_usage 3.14" | curl --data-binary @- http://192.168.12.100:9091/metrics/job/canbus

//var buf = Buffer.from(bufStr, 'utf8');

//#Push a single sample into the group identified by {job="some_job"}:
//#  echo "some_metric 3.14" | curl --data-binary @- http://pushgateway.example.org:9091/metrics/job/some_job

//#Push something more complex into the group identified by {job="some_job",instance="some_instance"}:

//#  cat <<EOF | curl --data-binary @- http://pushgateway.example.org:9091/metrics/job/some_job/instance/some_instance
//#  # TYPE some_metric counter
//#  some_metric{label="val1"} 42
//#  # TYPE another_metric gauge
//#  # HELP another_metric Just an example.
//#  another_metric 2398.283
//#  EOF

// /metrics/job/<JOB_NAME>{/<LABEL_NAME>/<LABEL_VALUE>}

//Delete all metrics in the group identified by {job="some_job",instance="some_instance"}:
//  curl -X DELETE http://pushgateway.example.org:9091/metrics/job/some_job/instance/some_instance

//Delete all metrics in the group identified by {job="some_job"} (note that this does not include metrics in the {job="some_job",instance="some_instance"} group from the previous example, even if those metrics have the same job label):
//  curl -X DELETE http://pushgateway.example.org:9091/metrics/job/some_job

//Delete all metrics in all groups (requires to enable the admin API via the command line flag --web.enable-admin-api):
//  curl -X PUT http://pushgateway.example.org:9091/api/v1/admin/wipe

