import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, Package } from 'lucide-react';

type LowStockAlertsProps = {
  products: { name: string; stock: number }[];
};

export function AlertsSection({ products }: LowStockAlertsProps) {
  // Dummy raw materials
  const rawMaterials = [
    { name: 'Gula', stock: '3 Kg', percentage: 18 },
    { name: 'Tepung', stock: '8 Kg', percentage: 65 },
    { name: 'Mentega', stock: '2 Kg', percentage: 12 },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 h-full">
      {/* Low Stock Products */}
      <Card className="rounded-2xl shadow-sm border-border/50 border-l-4 border-l-orange-500">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold flex items-center text-orange-600">
            <AlertTriangle className="w-5 h-5 mr-2" />
            Stok Display Menipis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 mt-2">
            {products.length > 0 ? (
              products.map((product, index) => (
                <div key={index} className="flex justify-between items-center border-b pb-2 last:border-0 last:pb-0">
                  <div className="text-sm font-medium">{product.name}</div>
                  <div className="text-sm font-bold text-orange-600 bg-orange-100 px-2 py-1 rounded-md">{product.stock} pcs</div>
                </div>
              ))
            ) : (
              <div className="text-sm text-muted-foreground">Stok display aman.</div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Low Raw Materials */}
      <Card className="rounded-2xl shadow-sm border-border/50 border-l-4 border-l-red-500">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold flex items-center text-red-600">
            <Package className="w-5 h-5 mr-2" />
            Bahan Baku Hampir Habis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 mt-2">
            {rawMaterials.map((material, index) => (
              <div key={index} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{material.name}</span>
                  <span className="text-muted-foreground">Sisa: {material.stock}</span>
                </div>
                <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${material.percentage < 20 ? 'bg-red-500' : 'bg-orange-500'}`} 
                    style={{ width: `${material.percentage}%` }}
                  />
                </div>
                <div className="text-xs text-right text-muted-foreground">{material.percentage}%</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
