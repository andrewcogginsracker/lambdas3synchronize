var aws = require('aws-sdk');
var ssm = new aws.SSM();
console.log('Loading function');

exports.handler = function(event, context, callback) {

    var s3bucket = event.Records[0].s3.bucket.name;
    var s3object = event.Records[0].s3.object.key;
    console.log('value1 = event.Records[0].s3.bucket.name');
    callback(null, s3bucket);

var params = {
  DocumentName: 'AndrewTest-SSMDocument-143CH4GIBQGAI', /* required */
  InstanceIds: [ /* required */
    'i-e52cfafe',
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
