// src/CheckoutButton.tsx
import React from 'react';

const CheckoutButton: React.FC = () => {
  const handleCheckout = async () => {
    try {
      const res = await fetch('http://localhost:4242/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: 1999 }), // Makes to 19.99
      });

      const data = await res.json();
      window.location.href = data.url; // Redirects to Stripe checkout
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      style={{ padding: '12px 20px', fontSize: '16px', cursor: 'pointer' }}
    >
      Buy for $19.99
    </button>
  );
};

export default CheckoutButton;
