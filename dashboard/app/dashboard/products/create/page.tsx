'use client';
import { Box } from '@/components/ui/box';
import { FormControl } from '@/components/ui/form-control';
import { Heading } from '@/components/ui/heading';
import { VStack } from '@/components/ui/vstack';
import { Text } from '@/components/ui/text';
import { Input, InputField } from '@/components/ui/input';
import { HStack } from '@/components/ui/hstack';
import { Button, ButtonText } from '@/components/ui/button';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { createProduct } from './actions';

export default function CreateProductPage() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  const searchParams = useSearchParams();
  const errorMessage = searchParams.get('errorMessage');

  return (
    <Box className="flex-1 min-h-screen justify-center items-center">
      <FormControl
        isInvalid={!!errorMessage}
        className="p-4 border rounded-lg max-w-[500px] w-full border-outline-300 bg-white m-2"
      >
        <VStack space="xl">
          <Heading className="text-typography-900 leading-3 pt-3">
            Create product
          </Heading>
          <VStack space="xs">
            <Text className="text-typography-500 leading-1">Name</Text>
            <Input>
              <InputField value={name} onChangeText={setName} type="text" />
            </Input>
          </VStack>

          <VStack space="xs">
            <Text className="text-typography-500 leading-1">Description</Text>
            <Input>
              <InputField
                value={description}
                onChangeText={setDescription}
                type="text"
              />
            </Input>
          </VStack>

          <VStack space="xs">
            <Text className="text-typography-500 leading-1">Price</Text>
            <Input>
              <InputField value={price} onChangeText={setPrice} type="text" />
            </Input>
          </VStack>

          {errorMessage && <Text className="text-red-500">{errorMessage}</Text>}
          <Button
            onPress={() => createProduct(name, description, Number(price))}
          >
            <ButtonText>Save product</ButtonText>
          </Button>
        </VStack>
      </FormControl>
    </Box>
  );
}
