import '@/global.css';
import { Link, Stack } from 'expo-router';
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Icon } from '@/components/ui/icon';
import { ShoppingCart, User } from 'lucide-react-native';
import { Pressable } from 'react-native';
import { useCart } from '@/store/cartStore';
import { Text } from '@/components/ui/text';
import { useAuth } from '@/store/authStore';
import CustomStripeProvider from '@/components/CustomStripeProvider';

// Create a client
const queryClient = new QueryClient();

export default function RootLayout() {
  const cartItemsNum = useCart((state) => state.items.length);
  const isLoggedIn = useAuth((s) => !!s.token);

  return (
    <QueryClientProvider client={queryClient}>
      <CustomStripeProvider>
        <GluestackUIProvider>
          <Stack
            screenOptions={{
              headerRight: () =>
                cartItemsNum > 0 && (
                  <Link href={'/cart'} asChild>
                    <Pressable className="flex-row gap-2">
                      <Icon as={ShoppingCart} />
                      <Text>{cartItemsNum}</Text>
                    </Pressable>
                  </Link>
                ),
            }}
          >
            <Stack.Screen
              name="index"
              options={{
                title: 'Shop',
                headerLeft: () =>
                  !isLoggedIn && (
                    <Link href={'/login'} asChild>
                      <Pressable className="flex-row gap-2">
                        <Icon as={User} />
                      </Pressable>
                    </Link>
                  ),
              }}
            />
            <Stack.Screen name="product/[id]" options={{ title: 'Product' }} />
          </Stack>
        </GluestackUIProvider>
      </CustomStripeProvider>
    </QueryClientProvider>
  );
}
