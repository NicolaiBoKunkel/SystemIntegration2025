const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const xml2js = require('xml2js');
const csv = require('csv-parser');

// Define the correct path to the data folder
const dataDir = path.join(__dirname, '../data');

// Function to read and parse a text file
const parseText = (filePath) => {
    return fs.readFileSync(filePath, 'utf-8').split('\n').map(line => line.trim()).filter(line => line);
};

// Function to read and parse a JSON file
const parseJSON = (filePath) => {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
};

// Function to read and parse a YAML file
const parseYAML = (filePath) => {
    return yaml.load(fs.readFileSync(filePath, 'utf-8'));
};

// Function to read and parse a CSV file
const parseCSV = (filePath) => {
    return new Promise((resolve) => {
        let results = [];
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', () => resolve(results));
    });
};

// Function to read and parse an XML file
const parseXML = async (filePath) => {
    const xmlData = fs.readFileSync(filePath, 'utf-8');
    const parser = new xml2js.Parser();
    return parser.parseStringPromise(xmlData).then(result => result.fruits.fruit);
};

// File paths using the correct data directory
const files = {
    text: path.join(dataDir, "sample.txt"),
    json: path.join(dataDir, "sample.json"),
    yaml: path.join(dataDir, "sample.yaml"),
    csv: path.join(dataDir, "sample.csv"),
    xml: path.join(dataDir, "sample.xml")
};

// Parsing and printing results
(async () => {
    console.log("Text:", parseText(files.text));
    console.log("JSON:", parseJSON(files.json));
    console.log("YAML:", parseYAML(files.yaml));
    console.log("CSV:", await parseCSV(files.csv));
    console.log("XML:", await parseXML(files.xml));
})();
