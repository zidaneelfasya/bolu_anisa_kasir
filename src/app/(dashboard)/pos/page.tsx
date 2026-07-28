import { POSPage } from '@/features/pos/components/pos-page';
import { Metadata } from 'next';
import { getProducts } from '@/lib/actions/products';
import { getCategories } from '@/lib/actions/categories';

export const metadata: Metadata = {
  title: 'Kasir - Bolu Anisa POS',
};

export default async function Page() {
  const [productsResult, categoriesResult] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  const products = productsResult.success && productsResult.data ? productsResult.data : [];
  const categories = categoriesResult.success && categoriesResult.data ? categoriesResult.data : [];

  return <POSPage initialProducts={products} initialCategories={categories} />;
}
