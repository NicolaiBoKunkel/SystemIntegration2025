const axios = require('axios');

const registerWebhook = async () => {
  const payload = {
    url: 'https://PARTNER_WEBHOOK_URL.loca.lt/webhook',
    events: ['invoice_paid', 'invoice_created']
  };

  try {
    const res = await axios.post('https://opgave12a.loca.lt/webhooks/register', payload);
    console.log('Webhook registered:', res.data);
  } catch (err) {
    console.error('Error registering webhook:', err.message);
  }
};

registerWebhook();
