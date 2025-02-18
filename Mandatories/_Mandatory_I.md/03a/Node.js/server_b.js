const express = require('express');
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const csv = require('csv-parser');
const xml2js = require('xml2js');
const axios = require('axios');

const app = express();
const PORT = 5001;
const SERVER_A_URL = "http://localhost:5000";

const DATA_FOLDER = path.join(__dirname, '..', '..', '01a', 'data');

const readFile = (fileName) => {
    const filePath = path.join(DATA_FOLDER, fileName);
    if (!fs.existsSync(filePath)) {
        throw new Error(`File not found: ${fileName}`);
    }
    return fs.readFileSync(filePath, 'utf-8');
};

app.get("/text", (req, res) => {
    try {
        res.json({ data: readFile("sample.txt") });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get("/json", (req, res) => {
    try {
        res.json(JSON.parse(readFile("sample.json")));
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get("/yaml", (req, res) => {
    try {
        res.json(yaml.load(readFile("sample.yaml")));
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get("/csv", (req, res) => {
    const filePath = path.join(DATA_FOLDER, "sample.csv");
    if (!fs.existsSync(filePath)) {
        return res.status(500).json({ error: "File not found: sample.csv" });
    }
    
    let results = [];
    fs.createReadStream(filePath)
        .pipe(csv())
        .on("data", (data) => results.push(data))
        .on("end", () => res.json(results))
        .on("error", (err) => res.status(500).json({ error: err.message }));
});

app.get("/xml", (req, res) => {
    try {
        const xmlData = readFile("sample.xml");
        const parser = new xml2js.Parser();
        parser.parseStringPromise(xmlData)
            .then(result => res.json(result))
            .catch(err => res.status(500).json({ error: err.message }));
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get("/proxy/:filetype", async (req, res) => {
    try {
        const response = await axios.get(`${SERVER_A_URL}/${req.params.filetype}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server B running on http://localhost:${PORT}`);
});
