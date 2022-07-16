const express = require("express");
const ws = require("ws");

const app = express();
const port = 8081;
let lastMessage = "";
// Set up a headless websocket server that prints any
// events that come in.
const wsServer = new ws.Server({ noServer: true });
wsServer.on("connection", (socket) => {
  socket.on("message", (message) => {
    lastMessage = message;
    wsServer.clients.forEach(function each(client) {
      sendMessage(client);
    });

    console.log(message.toString());
  });

  wsServer.clients.forEach(function each(client) {
    sendMessage(client);
  });
});

function sendMessage(client)
{
  if (client.readyState === ws.OPEN) {
    setTimeout(function () {
      client.send(
        Buffer.from(lastMessage),
        { binary: false }
      );
    }, 0);
  }
}

// `server` is a vanilla Node.js HTTP server, so use
// the same ws upgrade process described here:
// https://www.npmjs.com/package/ws#multiple-servers-sharing-a-single-https-server
const server = app.listen(port, () => {
  console.log(`websocket server listening at ws://localhost:${port}`);
});

server.on("upgrade", (request, socket, head) => {
  wsServer.handleUpgrade(request, socket, head, (socket) => {
    wsServer.emit("connection", socket, request);
  });
});
