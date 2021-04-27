const express = require('express')
const cors = require('cors');
require('dotenv').config();
const http = require('http');

const WebSocket = require('ws');
const plivo = require('plivo');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server })
const { v4: uuidv4 } = require('uuid');

const baseURL = 'https://b09299482efd.ngrok.io';
const client = new plivo.Client(
    process.env.PILVO_AUTH_ID,
    process.env.PILVO_AUTH_TOKEN
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

wss.on('connection', (ws) => {
    ws.id = uuidv4();

    ws.on('message', (msg) => {
        const { sendTo, sendFrom, audio } = JSON.parse(msg);
        client.calls.create(
                `+1${sendFrom}`,
                `+1${sendTo}`,
                `${baseURL}/record?url=${audio}&id=${ws.id}`, {
                    answerMethod: "GET",
                    machineDetection: true,
                    machineDetectionTime: "5000",
                    machineDetectionUrl: `${baseURL}/detect?id=${ws.id}`,
                    machineDetectionMethod: "GET"
                }
            )
            .then((res) => {
                ws.send(JSON.stringify({
                    type: 'id',
                    message: res.requestUuid
                }))
                ws.send(JSON.stringify({
                    type: 'calling',
                    message: 'Calling...'
                }))
            })
            .catch(() => {
                ws.terminate();
                client.send(JSON.stringify({
                    type: 'error',
                    message: 'Something went wrong.'
                }))
            })
    })
})

app.get('/cancel/:id', async(req, res) => {
    const { id } = req.params;

    try {
        await client.calls.hangup(id)
        res.status(200).end()
    } catch {
        res.status(400).end()
    }

})

app.all('/record', (req, res) => {
    const { url, id } = req.query;

    wss.clients.forEach(client => {
        if (client.id === id) {
            client.send(JSON.stringify({
                type: 'chatting',
                message: 'Chatting...'
            }))
        }
    })

    const record_params = {
        'recordSession': 'true',
        'redirect': 'false',
        'method': "GET",
        'callbackUrl': `${baseURL}/record_callback?id=${id}`,
        'callbackMethod': "GET"
    }

    const r = plivo.Response();

    r.addRecord(record_params)

    r.addPlay(url);

    res.setHeader("Content-Type", "text/xml");
    res.end(r.toXML());
})

app.all('/record_callback', (req, res) => {
    const {
        id,
        RecordUrl: recordURL,
        RecordingDuration: duration
    } = req.query;

    wss.clients.forEach(client => {
        if (client.id === id) {
            if (parseInt(duration) < 3) {
                client.send(JSON.stringify({
                    type: 'not-answered',
                    message: 'Not answered'
                }))
            } else {
                client.send(JSON.stringify({
                    type: 'success',
                    message: recordURL
                }))
            }
            client.terminate();
        }
    })
    res.status(200).end()
});

app.all('/detect', async(req, res) => {
    const { CallUUID: uuid } = req.query;
    try {
        await client.calls.hangup(uuid)
        res.status(200).end()
    } catch (err) {
        res.status(400).end()
    }
})

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => console.log(`Listening on port :${PORT}`))