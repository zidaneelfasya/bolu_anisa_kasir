'use client';

import * as React from 'react';
import { createPortal } from 'react-dom';
import { formatCurrency } from '@/lib/utils/format';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

export type ReceiptData = {
  transactionId: string;
  date: Date;
  cashierName: string;
  totalAmount: number;
  cashReceived: number;
  change: number;
  items: {
    name: string;
    quantity: number;
    price: number;
    subtotal: number;
  }[];
};

interface ReceiptPrinterProps {
  data: ReceiptData | null;
}

export const ReceiptPrinter = React.forwardRef<HTMLDivElement, ReceiptPrinterProps>(
  ({ data }, ref) => {
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
      setMounted(true);
    }, []);

    if (!data || !mounted) return null;

    const receiptContent = (
      <div 
        id="receipt-portal-container"
        ref={ref} 
        className="hidden print:block bg-white text-black"
      >
        <style>{`
          @media print {
            @page {
              margin: 0;
              width: 58mm;
            }
            body {
              margin: 0;
              padding: 0;
              background-color: white !important;
            }
            body > *:not(#receipt-portal-container) {
              display: none !important;
            }
          }
          .receipt-container {
            width: 58mm;
            max-width: 100%;
            margin: 0 auto;
            padding: 4mm;
            font-family: 'Courier New', Courier, monospace;
            font-size: 12px;
            line-height: 1.2;
            color: black;
          }
          .receipt-divider {
            border-top: 1px dashed black;
            margin: 4px 0;
          }
          .receipt-text-center { text-align: center; }
          .receipt-text-right { text-align: right; }
          .receipt-text-left { text-align: left; }
          .receipt-flex-between { display: flex; justify-content: space-between; }
          .receipt-bold { font-weight: bold; }
        `}</style>
        
        <div id="print-area" className="receipt-container">
          {/* Header */}
          <div className="receipt-text-center" style={{ marginBottom: '8px' }}>
            <img 
              src="/logo-bolu-anisa.svg" 
              alt="Logo Bolu Anisa" 
              style={{ width: '48px', height: '48px', margin: '0 auto 4px auto', filter: 'grayscale(100%) contrast(200%)' }}
            />
            <div className="receipt-bold" style={{ fontSize: '14px', textTransform: 'uppercase' }}>Bolu Anisa</div>
            <div style={{ fontSize: '10px' }}>Jl. Contoh No. 123, Kota Anda</div>
            <div style={{ fontSize: '10px' }}>Telp: 0812-3456-7890</div>
          </div>

          <div className="receipt-divider" />

          {/* Transaction Info */}
          <div className="receipt-flex-between" style={{ fontSize: '10px', marginBottom: '2px' }}>
            <span>{format(data.date, 'dd/MM/yy HH:mm', { locale: id })}</span>
            <span>Kasir: {data.cashierName}</span>
          </div>
          <div className="receipt-flex-between" style={{ fontSize: '10px', marginBottom: '4px' }}>
            <span>No: {data.transactionId.substring(0, 8).toUpperCase()}</span>
          </div>

          <div className="receipt-divider" />

          {/* Items */}
          <div style={{ marginBottom: '4px', marginTop: '4px' }}>
            {data.items.map((item, index) => (
              <div key={index} style={{ marginBottom: '6px' }}>
                <div className="receipt-bold" style={{ fontSize: '11px', marginBottom: '2px' }}>{item.name}</div>
                <div className="receipt-flex-between" style={{ fontSize: '11px' }}>
                  <span>{item.quantity} x {formatCurrency(item.price).replace('Rp','').trim()}</span>
                  <span>{formatCurrency(item.subtotal).replace('Rp','').trim()}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="receipt-divider" />

          {/* Totals */}
          <div style={{ marginTop: '4px', marginBottom: '4px' }}>
            <div className="receipt-flex-between receipt-bold" style={{ fontSize: '12px', marginBottom: '2px' }}>
              <span>TOTAL</span>
              <span>{formatCurrency(data.totalAmount)}</span>
            </div>
            <div className="receipt-flex-between" style={{ fontSize: '11px', marginBottom: '2px' }}>
              <span>TUNAI</span>
              <span>{formatCurrency(data.cashReceived)}</span>
            </div>
            <div className="receipt-flex-between" style={{ fontSize: '11px' }}>
              <span>KEMBALI</span>
              <span>{formatCurrency(data.change)}</span>
            </div>
          </div>

          <div className="receipt-divider" />

          {/* Footer */}
          <div className="receipt-text-center" style={{ marginTop: '8px', fontSize: '10px' }}>
            <div style={{ marginBottom: '2px' }}>Terima Kasih Atas Kunjungan Anda</div>
            <div style={{ marginBottom: '4px' }}>Layanan Konsumen: 0812-3456-7890</div>
            <div style={{ fontStyle: 'italic', fontSize: '9px' }}>Barang yang sudah dibeli tidak dapat ditukar/dikembalikan</div>
          </div>
        </div>
      </div>
    );

    return createPortal(receiptContent, document.body);
  }
);

ReceiptPrinter.displayName = 'ReceiptPrinter';
