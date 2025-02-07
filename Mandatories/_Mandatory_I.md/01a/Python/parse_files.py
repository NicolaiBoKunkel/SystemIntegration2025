import json
import yaml
import csv
import xmltodict
import os

DATA_DIR = os.path.join(os.path.dirname(__file__), "../data")

def parse_text(file_path):
    with open(file_path, "r", encoding="utf-8") as file:
        return [line.strip() for line in file.readlines()]

def parse_json(file_path):
    with open(file_path, "r", encoding="utf-8") as file:
        return json.load(file)

def parse_yaml(file_path):
    with open(file_path, "r", encoding="utf-8") as file:
        return yaml.safe_load(file)

def parse_csv(file_path):
    with open(file_path, newline='', encoding="utf-8") as file:
        reader = csv.DictReader(file)
        return [row for row in reader]

def parse_xml(file_path):
    with open(file_path, "r", encoding="utf-8") as file:
        data = xmltodict.parse(file.read())  
        if "fruits" in data and "fruit" in data["fruits"]:
            return data["fruits"]["fruit"]  
        return data  

files = {
    "text": os.path.join(DATA_DIR, "sample.txt"),
    "json": os.path.join(DATA_DIR, "sample.json"),
    "yaml": os.path.join(DATA_DIR, "sample.yaml"),
    "csv": os.path.join(DATA_DIR, "sample.csv"),
    "xml": os.path.join(DATA_DIR, "sample.xml")
}

print("Text:", parse_text(files["text"]))
print("JSON:", parse_json(files["json"]))
print("YAML:", parse_yaml(files["yaml"]))
print("CSV:", parse_csv(files["csv"]))
print("XML:", parse_xml(files["xml"]))
