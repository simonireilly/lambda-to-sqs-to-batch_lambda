'use strict';
var AWS = require('aws-sdk');

var sqs = new AWS.SQS({ region: process.env.REGION });

module.exports.process = async event => {
  event.Records.forEach(record => {
    const { body } = record;
    console.log(body);
  });
  return {};
};

exports.push = function (event, context) {
  var params = {
    MessageBody: JSON.stringify(event),
    QueueUrl: process.env.QUEUE_URL
  };
  sqs.sendMessage(params, function (err, data) {
    if (err) {
      console.log('error:', "Fail Send Message" + err);
      context.done('error', "ERROR Put SQS");
    } else {
      console.log('data:', data.MessageId);
      context.done(null, '');
    }
  });
}