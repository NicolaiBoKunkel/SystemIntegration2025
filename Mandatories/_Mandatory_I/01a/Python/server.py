#00 Data parsing server - Part II - also used for 03a
from fastapi import FastAPI
import json
import yaml
import csv
import xmltodict
import os
import requests
from fastapi.responses import JSONResponse

app = FastAPI()

SERVER_B_URL = "http://localhost:5001"

@app.get("/proxy/{filetype}")
def proxy_to_server_b(filetype: str):
    """Fetches data from Server B and returns it."""
    response = requests.get(f"{SERVER_B_URL}/{filetype}")
    return JSONResponse(content=response.json())

DATA_DIR = os.path.join(os.path.dirname(__file__), "../data")

def parse_text():
    file_path = os.path.join(DATA_DIR, "sample.txt")
    with open(file_path, "r", encoding="utf-8") as file:
        return [line.strip() for line in file.readlines()]

def parse_json():
    file_path = os.path.join(DATA_DIR, "sample.json")
    with open(file_path, "r", encoding="utf-8") as file:
        return json.load(file)

def parse_yaml():
    file_path = os.path.join(DATA_DIR, "sample.yaml")
    with open(file_path, "r", encoding="utf-8") as file:
        return yaml.safe_load(file)

def parse_csv():
    file_path = os.path.join(DATA_DIR, "sample.csv")
    with open(file_path, newline='', encoding="utf-8") as file:
        reader = csv.DictReader(file)
        return [row for row in reader]

def parse_xml():
    file_path = os.path.join(DATA_DIR, "sample.xml")
    with open(file_path, "r", encoding="utf-8") as file:
        data = xmltodict.parse(file.read())
        return data

@app.get("/text")
def get_text():
    return {"data": parse_text()}

@app.get("/json")
def get_json():
    return parse_json()

@app.get("/yaml")
def get_yaml():
    return parse_yaml()

@app.get("/csv")
def get_csv():
    return {"data": parse_csv()}

@app.get("/xml")
def get_xml():
    return {"data": parse_xml()}

# Root endpoint
@app.get("/")
def read_root():
    return {"message": "Welcome to the Data Parsing API"}
