const WebSocket = require('ws');
const plivo = require('plivo');
const express = require('express')

const client = new plivo.Client("MAYZA3N2QZYZU3MTY1NT", "YjIwOWI1NTVmOTMwY2M3NjVkMDA3ZWI4NzZjY2U4");
const app = express();

const wss = new WebSocket.Server({ server: app });

wss.on('connection', function connection(ws) {
    console.log('connected')

    ws.on('message', (msg) => {
        const { sendTo, sendFrom, audio } = JSON.parse(msg);
        client.calls.create(
                `+1${sendFrom}`, // from
                `+1${sendTo}`, // to
                `http://6f9728a8893a.ngrok.io/record?url=${audio}`, // answer url
                {
                    answerMethod: "GET",
                    machineDetection: true, // Used to detect if the call has been answered by a machine. The valid values are true and hangup.
                    machineDetectionTime: "5000", // ime allotted to analyze if the call has been answered by a machine. The default value is 5000 ms.
                    machineDetectionUrl: "http://6f9728a8893a.ngrok.io/detect/", // A URL where machine detection parameters will be sent by Plivo.
                    machineDetectionMethod: "GET" // The method used to call the machineDetectionUrl
                },
            )
            .then(() => ws.send('Calling...'))
            .catch(() => ws.send('Error calling. Please try again'))
    })
})

exports.record = async(request, resp) => {
    wss.clients.forEach(client => {
        client.send('Chatting...')
    })
    var record_params = {
        'recordSession': 'true',
        'redirect': 'false',
        'method': "GET", // HTTP method to submit the action URL
        'callbackUrl': "http://6f9728a8893a.ngrok.io/record_callback/", // If set, this URL is fired in background when the recorded file is ready to be used.
        'callbackMethod': "GET" // Method used to notify the callbackUrl.
    }

    var r = plivo.Response();

    r.addRecord(record_params)

    r.addPlay(request.query.url);

    resp.setHeader("Content-Type", "text/xml");
    resp.end(r.toXML());
}

exports.recordFinished = async(request, response) => {
    var record_url = request.query['RecordUrl'];

    var record_duration = request.query['RecordingDuration'];
    var record_id = request.query['RecordingID']

    wss.clients.forEach(client => {
        if (parseInt(record_duration) < 3) {
            client.send('Not answered')
        } else {
            client.send(record_url)
        }
    })

    response.status(200).end()
}

exports.detect = async(req, res) => {
    var uuid = req.query['CallUUID']
    await client.calls.hangup(uuid)
    res.status(200).end()
}