from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime

app = FastAPI()

app.get("/timestamp")
def timestamp():
    return {"data": datetime.now()}