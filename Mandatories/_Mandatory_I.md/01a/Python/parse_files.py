import json
import yaml
import csv
import xml.etree.ElementTree as ET

# Read and parse a text file
def parse_text(file_path):
    with open(file_path, 'r') as f:
        content = f.read()
    return content

# Read and parse an XML file
def parse_xml(file_path):
    tree = ET.parse(file_path)
    root = tree.getroot()
    data = [{child.tag: child.text for child in item} for item in root.findall("item")]
    return data

# Read and parse a YAML file
def parse_yaml(file_path):
    with open(file_path, 'r') as f:
        data = yaml.safe_load(f)
    return data

# Read and parse a JSON file
def parse_json(file_path):
    with open(file_path, 'r') as f:
        data = json.load(f)
    return data

# Read and parse a CSV file
def parse_csv(file_path):
    with open(file_path, newline='') as f:
        reader = csv.DictReader(f)
        data = [row for row in reader]
    return data

# File paths (adjust accordingly)
files = {
    "Text": "sample.txt",
    "XML": "sample.xml",
    "YAML": "sample.yaml",
    "JSON": "sample.json",
    "CSV": "sample.csv"
}

# Parsing and printing results
print("Text File:", parse_text(files["Text"]))
print("XML File:", parse_xml(files["XML"]))
print("YAML File:", parse_yaml(files["YAML"]))
print("JSON File:", parse_json(files["JSON"]))
print("CSV File:", parse_csv(files["CSV"]))
