'use client';

import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, ShoppingCart, Activity, Package } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { formatCurrency } from '@/lib/utils/format';
import { TopSellingList } from './top-selling-list';
import { AlertsSection } from './alerts-section';
import { ProductionActivity } from './production-activity';

type DashboardContentProps = {
  metrics: {
    totalTransactions: number;
    totalOmzet: number;
    totalLaba: number;
    totalProduk: number;
  };
  chartData: { date: string; omzet: number }[];
  topProducts: { name: string; totalSold: number }[];
  lowStockProducts: { name: string; stock: number }[];
};

export function DashboardPage({ metrics, chartData, topProducts, lowStockProducts }: DashboardContentProps) {
  return (
    <div className="space-y-6 pb-12">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard Eksekutif</h1>
        <p className="text-sm text-muted-foreground">Ringkasan performa bisnis dan operasional toko.</p>
      </div>

      {/* Metrics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="rounded-2xl shadow-sm border-border/50 bg-gradient-to-br from-card to-card/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-muted-foreground">Omzet Bulan Ini</CardTitle>
            <div className="p-2 bg-primary/10 rounded-lg">
              <DollarSign className="w-4 h-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(metrics.totalOmzet)}</div>
          </CardContent>
        </Card>
        
        <Card className="rounded-2xl shadow-sm border-border/50 bg-gradient-to-br from-card to-card/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-muted-foreground">Laba Bulan Ini</CardTitle>
            <div className="p-2 bg-green-500/10 rounded-lg">
              <Activity className="w-4 h-4 text-green-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{formatCurrency(metrics.totalLaba)}</div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-sm border-border/50 bg-gradient-to-br from-card to-card/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Transaksi</CardTitle>
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <ShoppingCart className="w-4 h-4 text-blue-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totalTransactions}</div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-sm border-border/50 bg-gradient-to-br from-card to-card/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-muted-foreground">Katalog Produk</CardTitle>
            <div className="p-2 bg-orange-500/10 rounded-lg">
              <Package className="w-4 h-4 text-orange-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totalProduk} pcs</div>
          </CardContent>
        </Card>
      </div>

      {/* Row 2: Chart & Top Selling */}
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {/* Sales Chart */}
        <Card className="col-span-1 md:col-span-2 lg:col-span-3 rounded-2xl shadow-sm border-border/50">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Grafik Penjualan 7 Hari Terakhir</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                  <XAxis 
                    dataKey="date" 
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => value.slice(5)} // Show MM-DD
                  />
                  <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `Rp${value / 1000}k`}
                  />
                  <Tooltip 
                    cursor={{fill: 'rgba(0,0,0,0.04)'}}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    formatter={(value: any) => [formatCurrency(Number(value)), 'Omzet']}
                    labelFormatter={(label) => `Tanggal: ${label}`}
                  />
                  <Bar dataKey="omzet" fill="var(--primary)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Top Selling */}
        <div className="col-span-1 lg:col-span-1">
          <TopSellingList products={topProducts} />
        </div>
      </div>

      {/* Row 3: Alerts */}
      <AlertsSection products={lowStockProducts} />

      {/* Row 4: Production & Activity */}
      <ProductionActivity />
    </div>
  );
}
