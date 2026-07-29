import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChefHat, History } from 'lucide-react';

export function ProductionActivity() {
  const productions = [
    { name: 'Bolu Keju', progress: '120 pcs', status: 'Selesai' },
    { name: 'Bolu Coklat', progress: '90 pcs', status: 'Selesai' },
    { name: 'Brownies', progress: '75 pcs', status: 'Sedang Proses' },
  ];

  const activities = [
    { time: '09:40', role: 'Gudang', action: 'Stok Gula +50 Kg', type: 'info' },
    { time: '09:20', role: 'Admin', action: 'Menambah Produk Bolu Pandan', type: 'system' },
    { time: '09:12', role: 'Kasir 1', action: 'Transaksi Rp 120.000', type: 'transaction' },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 h-full">
      {/* Production */}
      <Card className="rounded-2xl shadow-sm border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold flex items-center">
            <ChefHat className="w-5 h-5 mr-2 text-primary" />
            Produksi Hari Ini
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {productions.map((prod, index) => (
              <div key={index} className="flex justify-between items-center border-b pb-3 last:border-0 last:pb-0">
                <div>
                  <div className="text-sm font-medium">{prod.name}</div>
                  <div className="text-xs text-muted-foreground">{prod.status}</div>
                </div>
                <div className="text-sm font-bold bg-secondary px-3 py-1 rounded-full">{prod.progress}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Activity Log */}
      <Card className="rounded-2xl shadow-sm border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold flex items-center">
            <History className="w-5 h-5 mr-2 text-primary" />
            Aktivitas Terbaru
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
            {activities.map((act, index) => (
              <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                {/* Icon */}
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-card bg-secondary text-primary shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm z-10">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                </div>
                
                {/* Card */}
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-3 rounded-xl border bg-card shadow-sm">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-primary">{act.role}</span>
                    <span className="text-[10px] text-muted-foreground">{act.time}</span>
                  </div>
                  <div className="text-sm text-foreground">{act.action}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
