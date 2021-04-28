const express = require("express");
require("dotenv").config();

const plivo = require("plivo");

const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);

const baseURL = "http://a3679117b01a.ngrok.io";
const client = new plivo.Client(
  process.env.PILVO_AUTH_ID,
  process.env.PILVO_AUTH_TOKEN
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

io.on("connection", function (socket) {
  console.log("a user connected");

  socket.on("make-call", ({ sendTo, sendFrom, audio }) => {
    client.calls
      .create(
        `+1${sendFrom}`,
        `+1${sendTo}`,
        `${baseURL}/record?url=${audio}&id=${socket.id}`,
        {
          answerMethod: "GET",
          machineDetection: true,
          machineDetectionTime: "5000",
          machineDetectionUrl: `${baseURL}/detect?id=${socket.id}`,
          machineDetectionMethod: "GET",
        }
      )
      .then((res) => {
        socket.emit("callID", {
          type: "id",
          message: res.requestUuid,
        });
        socket.emit("call-event", {
          type: "calling",
          message: "Calling...",
        });
      })
      .catch(() => {
        socket.emit("error", {
          message: "Call failed",
        });
        socket.disconnect();
      });
  });
});

app.all("/record", (req, res) => {
  const { url, id } = req.query;

  const socket = io.sockets.sockets.get(id);

  if (socket) {
    socket.emit("call-event", {
      type: "chatting",
      message: "Chatting...",
    });
  }

  const record_params = {
    recordSession: "true",
    redirect: "false",
    method: "GET",
    callbackUrl: `${baseURL}/record_callback?id=${id}`,
    callbackMethod: "GET",
  };

  const r = plivo.Response();

  r.addRecord(record_params);

  r.addPlay(url);

  res.setHeader("Content-Type", "text/xml");
  res.end(r.toXML());
});

app.all("/record_callback", (req, res) => {
  const { id, RecordUrl: recordURL, RecordingDuration: duration } = req.query;
  const socket = io.sockets.sockets.get(id);

  if (socket) {
    if (parseInt(duration) < 3) {
      socket.emit("call-event", {
        type: "not-answered",
        message: "Not answered",
      });
    } else {
      socket.emit("call-event", {
        type: "success",
        message: recordURL,
      });
    }
    socket.disconnect();
  }

  res.status(200).end();
});

app.all("/detect", async (req, res) => {
  const { CallUUID: uuid } = req.query;
  try {
    await client.calls.hangup(uuid);
    res.status(200).end();
  } catch (err) {
    res.status(400).end();
  }
});

app.get("/cancel/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await client.calls.hangup(id);
    res.status(200).end();
  } catch {
    res.status(400).end();
  }
});

http.listen(3001, function () {
  console.log("listening on *:3001");
});
