import { CategoryList } from '@/features/categories/components/category-list';
import { Metadata } from 'next';
import { Suspense } from 'react';
import { getCategories } from '@/lib/actions/categories';

export const metadata: Metadata = { title: 'Kategori - Bolu Anisa POS' };

async function CategoryDataWrapper() {
  const result = await getCategories();
  const categories = result.success && result.data ? result.data : [];
  return <CategoryList initialData={categories} />;
}

export default function Page() {
  return (
    <Suspense fallback={<div className="p-6">Memuat kategori...</div>}>
      <CategoryDataWrapper />
    </Suspense>
  );
}
