const express = require('express')
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const http = require('http');
var bodyParser = require('body-parser');


const WebSocket = require('ws');
const plivo = require('plivo');

const client = new plivo.Client("MAYZA3N2QZYZU3MTY1NT", "YjIwOWI1NTVmOTMwY2M3NjVkMDA3ZWI4NzZjY2U4");
const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server })
const { v4: uuidv4 } = require('uuid');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(function(req, response, next) {
    response.contentType('application/xml');
    next();
});

wss.on('connection', function connection(ws) {
    ws.id = uuidv4();

    ws.on('message', (msg) => {
        const { sendTo, sendFrom, audio } = JSON.parse(msg);
        client.calls.create(
                `+1${sendFrom}`, // from
                `+1${sendTo}`, // to
                `http://01b28c6e0874.ngrok.io/record?url=${audio}&id=${ws.id}`, // answer url
                {
                    answerMethod: "GET",
                    machineDetection: true, // Used to detect if the call has been answered by a machine. The valid values are true and hangup.
                    machineDetectionTime: "5000", // ime allotted to analyze if the call has been answered by a machine. The default value is 5000 ms.
                    machineDetectionUrl: `http://01b28c6e0874.ngrok.io/detect?id=${ws.id}`, // A URL where machine detection parameters will be sent by Plivo.
                    machineDetectionMethod: "GET" // The method used to call the machineDetectionUrl
                },
            )
            .then(() => ws.send('Calling...'))
            .catch(() => ws.send('Error calling. Please try again'))
    })
})

app.all('/record', (request, resp) => {
    const { url, id } = request.query;

    wss.clients.forEach(client => {
        if (client.id === id) {
            client.send('Chatting...')
        }
    })
    var record_params = {
        'recordSession': 'true',
        'redirect': 'false',
        'method': "GET", // HTTP method to submit the action URL
        'callbackUrl': `http://01b28c6e0874.ngrok.io/record_callback?id=${id}`, // If set, this URL is fired in background when the recorded file is ready to be used.
        'callbackMethod': "GET" // Method used to notify the callbackUrl.
    }

    var r = plivo.Response();

    r.addRecord(record_params)

    r.addPlay(url);

    resp.setHeader("Content-Type", "text/xml");
    resp.end(r.toXML());
})

app.all('/record_callback', (request, response) => {
    const { id, RecordUrl, RecordingDuration } = request.query;

    wss.clients.forEach(client => {
        if (client.id === id) {
            if (parseInt(RecordingDuration) < 3) {
                client.send('Not answered')
            } else {
                client.send(RecordUrl)
            }
        }
        client.terminate();
    })

    response.status(200).end()
});

app.all('/detect', async(req, res) => {
    var uuid = req.query['CallUUID']
    await client.calls.hangup(uuid)
    res.status(200).end()
})

app.all('/sms_callback', async(req, res) => {
    console.log(req.body['Text']);
    res.status(200).end();
})

server.listen(3001, () => console.log(`Listening on port :3000`))