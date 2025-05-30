const express = require("express");
const http = require("http");
const socketIO = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(__dirname));

io.on("connection", socket => {
  console.log("A user connected");

  socket.on("offer", offer => socket.broadcast.emit("offer", offer));
  socket.on("answer", answer => socket.broadcast.emit("answer", answer));
  socket.on("ice-candidate", candidate => socket.broadcast.emit("ice-candidate", candidate));
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Signaling server running at http://localhost:${PORT}`);
});
