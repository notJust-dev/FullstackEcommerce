import { FlatList, useWindowDimensions } from 'react-native';
import products from '../assets/products.json';
import ProductListItem from '../components/ProductListItem';
import { useBreakpointValue } from '@/components/ui/utils/use-break-point-value';

export default function HomeScreen() {
  const numColumns = useBreakpointValue({
    default: 2,
    sm: 3,
    xl: 4,
  });

  return (
    <FlatList
      key={numColumns}
      data={products}
      numColumns={numColumns}
      contentContainerClassName="gap-2 max-w-[960px] mx-auto w-full"
      columnWrapperClassName="gap-2"
      renderItem={({ item }) => <ProductListItem product={item} />}
    />
  );
}
