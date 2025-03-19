#from websockets.sync.client import connect

#def send_message();
  #  with connect("ws://localhost:8000") as websocket:
  #      websocket.send("Hello World!")

 #       message = websocket.recv()
 #       print(f"Received: {Message}")

#send_message()

import asyncio
import websockets

async def send_message():
    uri = "ws://localhost:8000"
    async with websockets.connect(uri) as websocket:
        await websocket.send("This is my message")
        print(await websocket.recv())

asyncio.run
        