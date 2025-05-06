const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const axios = require('axios');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

const DB_FILE = './webhooks.json';

// Helper: Load webhooks from file
function loadWebhooks() {
  if (!fs.existsSync(DB_FILE)) return {};
  return JSON.parse(fs.readFileSync(DB_FILE));
}

// Helper: Save webhooks to file
function saveWebhooks(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

// Endpoint: Register a webhook
app.post('/webhooks/register', (req, res) => {
  const { url, events } = req.body;

  if (!url || !Array.isArray(events)) {
    return res.status(400).json({ message: 'Missing url or events array' });
  }

  const webhooks = loadWebhooks();
  webhooks[url] = events;
  saveWebhooks(webhooks);

  res.json({ message: 'Webhook registered', url, events });
});

app.listen(PORT, () => {
  console.log(`Exposee server running at http://localhost:${PORT}`);
});


// Endpoint: Unregister a webhook
app.post('/webhooks/unregister', (req, res) => {
    const { url } = req.body;
  
    if (!url) {
      return res.status(400).json({ message: 'Missing url' });
    }
  
    const webhooks = loadWebhooks();
  
    if (!webhooks[url]) {
      return res.status(404).json({ message: 'URL not registered' });
    }
  
    delete webhooks[url];
    saveWebhooks(webhooks);
  
    res.json({ message: 'Webhook unregistered', url });
});

// Endpoint: Ping all webhooks with a test event
app.get('/ping', async (req, res) => {
    const webhooks = loadWebhooks();
  
    const payload = {
      event: "invoice_paid",
      timestamp: new Date().toISOString(),
      data: {
        invoiceId: "INV-001",
        amount: 199.99,
        currency: "USD"
      }
    };
  
    const results = [];
  
    for (const url of Object.keys(webhooks)) {
      try {
        const response = await axios.post(url, payload);
        results.push({ url, status: response.status });
      } catch (err) {
        results.push({ url, error: err.message });
      }
    }
  
    res.json({
      message: 'Ping complete',
      sentEvent: payload,
      results
    });
});
  