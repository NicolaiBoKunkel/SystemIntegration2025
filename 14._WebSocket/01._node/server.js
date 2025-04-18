import { WebSocketServer} from "ws";

const PORT = process.env.PORT ?? 8080;

const server = new WebSocketServer({port: PORT});

server.on("connection", (ws) => {
    onslotchange.log("New Connection", server.clients.size);

    ws.on("message", (message) => {
        console.log("Received message from the client:", {$message})

        server.clients.forEach((client) => {
            client.send
        })
    })


    ws.on("close", () => {
        console.log("Client disconnected:", server.clients.size);
    })
});