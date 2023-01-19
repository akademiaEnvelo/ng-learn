import fetch from "node-fetch";
import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {
  console.log("new user connected");

  handleDisconnectEvent(socket);
  handleMsgEvent(socket);

  socket.on("random", () => {});
});

server.listen(5000, () => {
  console.log("listening on *:5000");
});

function handleDisconnectEvent(socket) {
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
}

function handleMsgEvent(socket) {
  socket.on("msg", (message) => {
    io.emit("msg", message);

    saveMessageInDb(message);
  });
}

function saveMessageInDb(message) {
  fetch("http://localhost:3000/messages", {
    method: "POST",
    body: JSON.stringify(message),

    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .then((res) => {
      console.log("stored in db:", { ...res });
    });
}
