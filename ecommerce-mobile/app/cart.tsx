import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import { Text } from '@/components/ui/text';
import { useCart } from '@/store/cartStore';
import { View, FlatList } from 'react-native';
import { Button, ButtonText } from '@/components/ui/button';
import { Redirect } from 'expo-router';

export default function CartScreen() {
  const items = useCart((state) => state.items);
  const resetCart = useCart((state) => state.resetCart);

  const onCheckout = async () => {
    // send order to server
    resetCart();
  };

  if (items.length === 0) {
    return <Redirect href={'/'} />;
  }

  return (
    <FlatList
      data={items}
      contentContainerClassName="gap-2 max-w-[960px] w-full mx-auto p-2"
      renderItem={({ item }) => (
        <HStack className="bg-white p-3">
          <VStack space="sm">
            <Text bold>{item.product.name}</Text>
            <Text>$ {item.product.price}</Text>
          </VStack>
          <Text className="ml-auto">{item.quantity}</Text>
        </HStack>
      )}
      ListFooterComponent={() => (
        <Button onPress={onCheckout}>
          <ButtonText>Checkout</ButtonText>
        </Button>
      )}
    />
  );
}
