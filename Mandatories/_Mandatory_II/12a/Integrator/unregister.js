const axios = require('axios');

const unregisterWebhook = async () => {
  const payload = {
    url: 'https://opgave12a2.loca.lt/webhook'
  };

  try {
    const res = await axios.post('http://localhost:3000/webhooks/unregister', payload);
    console.log('Webhook unregistered:', res.data);
  } catch (err) {
    console.error('Error unregistering webhook:', err.message);
  }
};

unregisterWebhook();
