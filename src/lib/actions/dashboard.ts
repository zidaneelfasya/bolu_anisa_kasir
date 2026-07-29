import { db } from '../db';
import { transactions, transactionItems, products } from '../db/schema';
import { eq, sql, desc, and, gte } from 'drizzle-orm';

export async function getDashboardMetrics(range: 'today' | 'month' | 'year' = 'month') {
  try {
    // Determine date filter
    let dateFilter;
    const now = new Date();
    if (range === 'today') {
      const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      dateFilter = gte(transactions.createdAt, startOfDay);
    } else if (range === 'month') {
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      dateFilter = gte(transactions.createdAt, startOfMonth);
    } else {
      const startOfYear = new Date(now.getFullYear(), 0, 1);
      dateFilter = gte(transactions.createdAt, startOfYear);
    }

    // 1. Total Transaksi & Omzet
    const txResult = await db.select({
      totalTransactions: sql<number>`count(${transactions.id})::int`,
      totalOmzet: sql<number>`sum(${transactions.grandTotal})::numeric`,
    }).from(transactions)
    .where(dateFilter);

    const totalTransactions = txResult[0]?.totalTransactions || 0;
    const totalOmzet = txResult[0]?.totalOmzet || 0;

    // 2. Laba (Profit)
    // Profit = Total Revenue (transaction items subtotal) - Total Cost (items quantity * product costPrice)
    const profitResult = await db.select({
      totalRevenue: sql<number>`sum(${transactionItems.subtotal})::numeric`,
      totalCost: sql<number>`sum(${transactionItems.quantity} * ${products.costPrice})::numeric`,
    })
    .from(transactionItems)
    .innerJoin(products, eq(transactionItems.productId, products.id))
    .innerJoin(transactions, eq(transactionItems.transactionId, transactions.id))
    .where(dateFilter);

    const revenue = profitResult[0]?.totalRevenue || 0;
    const cost = profitResult[0]?.totalCost || 0;
    const totalLaba = Number(revenue) - Number(cost);

    // 3. Total Produk
    const prodResult = await db.select({ count: sql<number>`count(${products.id})::int` }).from(products);
    const totalProduk = prodResult[0]?.count || 0;

    return {
      success: true,
      data: {
        totalTransactions,
        totalOmzet: Number(totalOmzet),
        totalLaba,
        totalProduk
      }
    };
  } catch (error) {
    console.error('Error fetching dashboard metrics:', error);
    return { success: false, error: 'Gagal mengambil metrik dashboard' };
  }
}

export async function getTopSellingProducts() {
  try {
    const result = await db.select({
      name: products.name,
      totalSold: sql<number>`sum(${transactionItems.quantity})::int`
    })
    .from(transactionItems)
    .innerJoin(products, eq(transactionItems.productId, products.id))
    .groupBy(products.id, products.name)
    .orderBy(desc(sql`sum(${transactionItems.quantity})`))
    .limit(5);

    return { success: true, data: result };
  } catch (error) {
    console.error('Error fetching top selling products:', error);
    return { success: false, error: 'Gagal mengambil data produk terlaris' };
  }
}

export async function getLowStockProducts() {
  try {
    const result = await db.select({
      name: products.name,
      stock: products.stock,
      minStock: products.minStock
    })
    .from(products)
    .where(sql`${products.stock} <= ${products.minStock}`)
    .orderBy(products.stock)
    .limit(5);

    return { success: true, data: result };
  } catch (error) {
    console.error('Error fetching low stock products:', error);
    return { success: false, error: 'Gagal mengambil data stok menipis' };
  }
}

export async function getSalesChartData() {
  try {
    // Get last 7 days sales data
    const last7Days = new Date();
    last7Days.setDate(last7Days.getDate() - 6);
    last7Days.setHours(0, 0, 0, 0);

    const result = await db.select({
      date: sql<string>`to_char(${transactions.createdAt}, 'YYYY-MM-DD')`,
      omzet: sql<number>`sum(${transactions.grandTotal})::numeric`
    })
    .from(transactions)
    .where(gte(transactions.createdAt, last7Days))
    .groupBy(sql`to_char(${transactions.createdAt}, 'YYYY-MM-DD')`)
    .orderBy(sql`to_char(${transactions.createdAt}, 'YYYY-MM-DD')`);

    return { success: true, data: result };
  } catch (error) {
    console.error('Error fetching sales chart data:', error);
    return { success: false, error: 'Gagal mengambil data grafik' };
  }
}
