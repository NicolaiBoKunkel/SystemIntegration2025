const axios = require('axios');

const registerWebhook = async () => {
  const payload = {
    url: 'https://opgave12a2.loca.lt/webhook',
    events: ['invoice_paid', 'invoice_created']
  };

  try {
    const res = await axios.post('http://localhost:3000/webhooks/register', payload);
    console.log('Webhook registered:', res.data);
  } catch (err) {
    console.error('Error registering webhook:', err.message);
  }
};

registerWebhook();
