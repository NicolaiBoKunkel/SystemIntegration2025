const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const xml2js = require('xml2js');
const csv = require('csv-parser');

const dataDir = path.join(__dirname, '../data');

const parseText = (filePath) => {
    return fs.readFileSync(filePath, 'utf-8').split('\n').map(line => line.trim()).filter(line => line);
};

const parseJSON = (filePath) => {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
};

const parseYAML = (filePath) => {
    return yaml.load(fs.readFileSync(filePath, 'utf-8'));
};

const parseCSV = (filePath) => {
    return new Promise((resolve) => {
        let results = [];
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', () => resolve(results));
    });
};

const parseXML = async (filePath) => {
    const xmlData = fs.readFileSync(filePath, 'utf-8');
    const parser = new xml2js.Parser();
    return parser.parseStringPromise(xmlData).then(result => result.fruits.fruit);
};

const files = {
    text: path.join(dataDir, "sample.txt"),
    json: path.join(dataDir, "sample.json"),
    yaml: path.join(dataDir, "sample.yaml"),
    csv: path.join(dataDir, "sample.csv"),
    xml: path.join(dataDir, "sample.xml")
};

(async () => {
    console.log("Text:", parseText(files.text));
    console.log("JSON:", parseJSON(files.json));
    console.log("YAML:", parseYAML(files.yaml));
    console.log("CSV:", await parseCSV(files.csv));
    console.log("XML:", await parseXML(files.xml));
})();
