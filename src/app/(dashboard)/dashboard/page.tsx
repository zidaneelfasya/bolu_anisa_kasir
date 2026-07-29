import { DashboardPage } from '@/features/dashboard/components/dashboard-page';
import { Metadata } from 'next';
import { Suspense } from 'react';
import { 
  getDashboardMetrics, 
  getSalesChartData, 
  getTopSellingProducts, 
  getLowStockProducts 
} from '@/lib/actions/dashboard';
import { TableSkeleton } from '@/components/ui/table-skeleton';

export const metadata: Metadata = {
  title: 'Dashboard Eksekutif - Bolu Anisa POS',
};



import { connection } from 'next/server';

async function DashboardDataWrapper() {
  await connection();
  const [metricsRes, chartRes, topProductsRes, lowStockRes] = await Promise.all([
    getDashboardMetrics('month'),
    getSalesChartData(),
    getTopSellingProducts(),
    getLowStockProducts()
  ]);

  const metrics = metricsRes.success && metricsRes.data ? metricsRes.data : {
    totalTransactions: 0, totalOmzet: 0, totalLaba: 0, totalProduk: 0
  };
  
  const chartData = chartRes.success && chartRes.data ? chartRes.data : [];
  const topProducts = topProductsRes.success && topProductsRes.data ? topProductsRes.data : [];
  const lowStockProducts = lowStockRes.success && lowStockRes.data ? lowStockRes.data : [];

  return (
    <DashboardPage 
      metrics={metrics}
      chartData={chartData}
      topProducts={topProducts}
      lowStockProducts={lowStockProducts}
    />
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div className="p-6"><TableSkeleton /></div>}>
      <DashboardDataWrapper />
    </Suspense>
  );
}
