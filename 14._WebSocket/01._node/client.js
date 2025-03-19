import { WebSocket } from "ws";

const WebsocketClient = new WebSocket("ws.//localhost:8080");

WebsocketClient.on('open', () => {
    WebsocketClient.send("Sending a client message from Node.js");

    WebsocketClient.on("message", (message) => {
        console.log("Recieved a message from the server:" {message})
    });

});