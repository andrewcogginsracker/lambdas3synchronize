var aws = require('aws-sdk');
var ssm = new aws.SSM();
var ec2 = new AWS.EC2({
  region: 'ap-southeast-2'
  });
console.log('Loading function');

exports.handler = function(event, context, callback) {
var s3bucket = event.Records[0].s3.bucket.name;
var s3object = event.Records[0].s3.object.key;
console.log('value1 = event.Records[0].s3.bucket.name');
callback(null, s3bucket);


var instancesList = '';
var params = {
Filters: [
    {
      Name: 'tag:synchronizebucket',
      Values: ['true']
    }
  ],



DocumentName: 'TestLambdaTemp-SSMDocument-1XIDQSOJ1C8Q', /* required */
InstanceIds: [ /* required */
'i-052f49c5d376c38c3'
/* more items */
 ],
Comment: 'Synchronizing S3 Bucket',
Parameters: {
S3Bucket: [
s3bucket,
/* more items */
 ],
 Directory:[
'/home/s3sync',
]
/* anotherKey: ... */
 },
 TimeoutSeconds: 60
};
ssm.sendCommand(params, function(err, data) {
if (err) console.log(err, err.stack); // an error occurred
else     console.log(data);           // successful response
});
};
