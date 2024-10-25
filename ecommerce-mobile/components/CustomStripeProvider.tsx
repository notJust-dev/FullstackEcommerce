import { fetchStripeKeys } from '@/api/stripe';
import { StripeProvider } from '@stripe/stripe-react-native';
import { useQuery } from '@tanstack/react-query';

export default function CustomStripeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: stripeKeys } = useQuery({
    queryKey: ['stripe', 'keys'],
    queryFn: fetchStripeKeys,
  });

  return (
    <StripeProvider publishableKey={stripeKeys?.publishableKey}>
      {children}
    </StripeProvider>
  );
}
