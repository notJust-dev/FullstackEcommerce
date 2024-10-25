import { useAuth } from '@/store/authStore';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export async function fetchStripeKeys() {
  const res = await fetch(`${API_URL}/stripe/keys`);
  const data = await res.json();
  if (!res.ok) {
    throw new Error('Error');
  }
  return data;
}

export async function createPaymentIntent({ orderId }: { orderId: string }) {
  const token = useAuth.getState().token;

  const res = await fetch(`${API_URL}/stripe/payment-intent`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify({ orderId }),
  });
  if (!res.ok) {
    throw new Error('Error creating payment intent');
  }
  const data = await res.json();

  return data;
}
