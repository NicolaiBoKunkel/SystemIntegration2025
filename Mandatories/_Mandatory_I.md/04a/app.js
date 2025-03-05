const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/events', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    let counter = 0;
    const interval = setInterval(() => {
        counter++;
        res.write(`data: {"message": "Update #${counter}", "timestamp": "${new Date().toISOString()}"}\n\n`);
    }, 3000);

    req.on('close', () => {
        clearInterval(interval);
        res.end();
    });
});

app.listen(PORT, () => {
    console.log(`SSE server running at http://localhost:${PORT}`);
    console.log(`Open http://localhost:${PORT}/index.html in your browser`);
});

