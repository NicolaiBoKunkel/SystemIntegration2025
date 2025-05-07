import React from 'react';
import CheckoutButton from './CheckoutButton';

function App() {
  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1>Stripe Payment Demo</h1>
      <CheckoutButton />
    </div>
  );
}

export default App;
