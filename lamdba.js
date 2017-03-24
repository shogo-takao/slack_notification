console.log('Loading function');

const https = require('https');
const url = require('url');
const slack_req_opts = url.parse('{{SLACK URL}}');
slack_req_opts.method = 'POST';
slack_req_opts.headers = {'Content-Type': 'application/json'};

exports.handler = function(event, context) {
    (event.Records || []).forEach(function (rec) {
        if (rec.Sns) {
            var req = https.request(slack_req_opts, function (res) {
                if (res.statusCode === 200) {
                    context.succeed('posted to slack');
                } else {
                    context.fail('status code: ' + res.statusCode);
                }
            });
    
            req.on('error', function(e) {
                console.log('problem with request: ' + e.message);
                context.fail(e.message);
            });
    
            var message = JSON.parse(rec.Sns.Message);
            var status = message.NewStateValue;
            if (status === "ALARM") {
                status = ":exclamation: " + status;
            }
            if (status === "OK") {
                status = ":+1: " + status;
            }
            var str = "*" + status + ": " + message.AlarmName + "*" + "\n" +
                        "@channel" + "\n" +
                        "StateChangeTime::" + message.StateChangeTime + "\n" +
                        "StateValue::" + message.OldStateValue + " -> " + message.NewStateValue + "\n" +
                        "NewStateReason::" + message.NewStateReason;
        
            req.write(JSON.stringify({text: str}));
    
            req.end();
        }

    });
};
