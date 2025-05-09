const axios = require('axios');

const unregisterWebhook = async () => {
  const payload = {
    url: 'https://WEBHOOK_URL.loca.lt/webhook' // match registered URL
  };

  try {
    const res = await axios.post('https://opgave12a.loca.lt/webhooks/unregister', payload); // match service domain
    console.log('Webhook unregistered:', res.data);
  } catch (err) {
    console.error('Error unregistering webhook:', err.message);
  }
};

unregisterWebhook();
