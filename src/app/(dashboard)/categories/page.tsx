import { CategoryList } from '@/features/categories/components/category-list';
import { Metadata } from 'next';
import { Suspense } from 'react';
import { getCategories } from '@/lib/actions/categories';

export const metadata: Metadata = { title: 'Kategori - Bolu Anisa POS' };

export default async function Page() {
  const result = await getCategories();
  const categories = result.success && result.data ? result.data : [];

  return (
    <Suspense fallback={<div className="p-6">Memuat kategori...</div>}>
      <CategoryList initialData={categories} />
    </Suspense>
  );
}
