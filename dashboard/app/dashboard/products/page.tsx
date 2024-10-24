import { listProducts } from '@/api/products';
import ProductListItem from './ProductListItem';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { AddIcon, Icon } from '@/components/ui/icon';

export default async function ProductsPage() {
  const products = await listProducts();

  return (
    <div className="flex flex-row flex-wrap gap-4 max-w-[1400px] mx-auto w-full">
      <Link href="/dashboard/products/create">
        <Card className="w-full h-full min-w-[300px] flex items-center justify-center">
          <Icon as={AddIcon} className="w-10 h-10 color-slate-400" />
        </Card>
      </Link>

      {products.map((product) => (
        <ProductListItem key={product.id} product={product} />
      ))}
    </div>
  );
}
