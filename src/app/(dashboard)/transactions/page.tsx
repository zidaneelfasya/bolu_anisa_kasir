import { TransactionHistory } from '@/features/transactions/components/transaction-history';
import { Metadata } from 'next';
import { Suspense } from 'react';
import { getTransactions } from '@/lib/actions/transactions';

export const metadata: Metadata = { title: 'Riwayat Transaksi - Bolu Anisa POS' };

export default async function Page() {
  const result = await getTransactions();
  const transactions = result.success && result.data ? result.data : [];

  return (
    <Suspense fallback={<div className="p-6">Memuat riwayat transaksi...</div>}>
      <TransactionHistory initialData={transactions} />
    </Suspense>
  );
}
