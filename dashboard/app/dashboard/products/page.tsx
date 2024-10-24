import { listProducts } from '@/api/products';
import ProductListItem from './ProductListItem';

export default async function ProductsPage() {
  const products = await listProducts();

  return (
    <div className="flex flex-row flex-wrap gap-4 max-w-[1400px] mx-auto w-full">
      {products.map((product) => (
        <ProductListItem key={product.id} product={product} />
      ))}
    </div>
  );
}
