import { InventoryList } from '@/features/inventory/components/inventory-list';
import { Metadata } from 'next';
import { Suspense } from 'react';
import { getProducts } from '@/lib/actions/products';

export const metadata: Metadata = { title: 'Stok - Bolu Anisa POS' };

export default async function Page() {
  const result = await getProducts();
  const products = result.success && result.data ? result.data : [];

  return (
    <Suspense fallback={<div className="p-6">Memuat data stok...</div>}>
      <InventoryList initialData={products} />
    </Suspense>
  );
}
