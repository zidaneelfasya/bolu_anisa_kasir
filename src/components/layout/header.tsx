'use client';

import * as React from 'react';
import { Search, Bell, Wifi, MonitorSmartphone, Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';

export function Header({ 
  collapsed,
  setMobileOpen 
}: { 
  collapsed: boolean;
  setMobileOpen: (open: boolean) => void;
}) {
  const [time, setTime] = React.useState<Date | null>(null);

  React.useEffect(() => {
    setTime(new Date());
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header 
      className={cn(
        "h-16 bg-card border-b flex items-center justify-between px-4 fixed top-0 right-0 z-30 transition-all duration-300 left-0",
        collapsed ? "md:left-[80px]" : "md:left-[260px]"
      )}
    >
      {/* Left section: Search & Hamburger */}
      <div className="flex items-center flex-1 max-w-md gap-3">
        <button 
          onClick={() => setMobileOpen(true)}
          className="md:hidden p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
        >
          <Menu className="h-6 w-6" />
        </button>

        <div className="relative group flex-1 hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <Input 
            placeholder="Cari produk... (Tekan F2 / scan barcode)" 
            className="pl-9 bg-muted/50 border-transparent focus-visible:ring-primary/20 focus-visible:border-primary focus-visible:bg-background transition-all rounded-xl h-10 w-full"
          />
        </div>
      </div>

      {/* Right section: Info & Actions */}
      <div className="flex items-center space-x-2 md:space-x-4">
        {/* Mobile Search Icon */}
        <button className="sm:hidden p-2 text-muted-foreground hover:bg-muted rounded-full">
          <Search className="h-5 w-5" />
        </button>

        {/* Branch / Store switcher indicator */}
        <div className="hidden md:flex items-center px-3 py-1.5 bg-muted/50 rounded-lg text-sm border border-border/50">
          <MonitorSmartphone className="h-4 w-4 text-primary mr-2" />
          <div className="flex flex-col">
            <span className="font-semibold text-xs leading-none">Kasir Utama</span>
            <span className="text-[10px] text-muted-foreground mt-0.5">Admin Kasir</span>
          </div>
        </div>

        {/* Time */}
        <div className="hidden sm:block text-sm font-medium text-muted-foreground bg-muted/30 px-3 py-1.5 rounded-lg border border-border/30">
          {time ? time.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) : '...'}
        </div>

        {/* Network Status */}
        <div className="hidden sm:flex text-success items-center justify-center h-10 w-10 rounded-full hover:bg-success/10 transition-colors cursor-help" title="Online">
          <Wifi className="h-5 w-5" />
        </div>

        {/* Notifications */}
        <button className="relative text-muted-foreground hover:text-foreground h-10 w-10 flex items-center justify-center rounded-full hover:bg-muted transition-colors">
          <Bell className="h-5 w-5" />
          <span className="absolute top-2 right-2 h-2 w-2 bg-destructive rounded-full border-2 border-card"></span>
        </button>
      </div>
    </header>
  );
}
