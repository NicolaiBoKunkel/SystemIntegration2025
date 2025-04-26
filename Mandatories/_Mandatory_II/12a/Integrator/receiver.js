const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 4000;

app.use(bodyParser.json());

app.post('/webhook', (req, res) => {
  console.log('Webhook received!');
  console.log(JSON.stringify(req.body, null, 2));
  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`Integrator webhook server running at http://localhost:${PORT}/webhook`);
});
