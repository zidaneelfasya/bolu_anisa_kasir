import { ProductList } from '@/features/products/components/product-list';
import { Metadata } from 'next';
import { Suspense } from 'react';
import { getProducts } from '@/lib/actions/products';
import { getCategories } from '@/lib/actions/categories';

export const metadata: Metadata = {
  title: 'Produk - Bolu Anisa POS',
};

async function ProductsDataWrapper() {
  const [productsResult, categoriesResult] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  const products = productsResult.success && productsResult.data ? productsResult.data : [];
  const categories = categoriesResult.success && categoriesResult.data ? categoriesResult.data : [];

  return <ProductList initialData={products} categories={categories} />;
}

export default function Page() {
  return (
    <Suspense fallback={<div className="p-6">Memuat data produk...</div>}>
      <ProductsDataWrapper />
    </Suspense>
  );
}
