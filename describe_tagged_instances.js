var AWS = require('aws-sdk');
var ec2 = new AWS.EC2({
  region: 'ap-southeast-2'
});

exports.handler = function(event, context, callback) {

var params = {
  Filters: [
    {
      Name: 'tag:synchronizebucket',
      Values: ['true']
    }
  ]
};

var instancesList = '';

ec2.describeInstances(params, function (err, data) {
  if (err) return console.error(err.message);

for (var i in data.Reservations){
	var ins = data.Reservations[i].Instances[0]
	instancesList+=ins.InstanceId

}

console.log(instancesList);
 //console.log(data);
});
};