import { useShopAnalytics, useProducts } from "@/lib/cms";
import { DollarSign, ShoppingBag, TrendingUp, AlertTriangle, Package, CheckCircle2, ArrowUpRight } from "lucide-react";

export function ShopAnalyticsManager() {
  const { data: analytics, isLoading, isError, refetch } = useShopAnalytics();
  const { data: products } = useProducts();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-12 space-y-3">
        <div className="size-8 rounded-full border-2 border-[#D4AF37] border-t-transparent animate-spin" />
        <p className="text-xs opacity-60">Loading shop analytics dashboard...</p>
      </div>
    );
  }

  if (isError || !analytics) {
    return (
      <div className="p-8 rounded-2xl bg-white/5 border border-white/10 text-center space-y-4 max-w-md mx-auto my-8">
        <AlertTriangle className="size-10 text-amber-400 mx-auto" />
        <div>
          <h4 className="text-sm font-bold">Unable to fetch Shop Analytics</h4>
          <p className="text-xs opacity-60 mt-1">Check your connection or click below to reload analytics data.</p>
        </div>
        <button
          onClick={() => refetch()}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F2D27C] text-[#0C1220] font-bold text-xs uppercase tracking-wider transition hover:scale-105 active:scale-95 cursor-pointer shadow-md"
        >
          Reload Analytics
        </button>
      </div>
    );
  }

  const lowStockProducts = (products || []).filter((p) => p && Number(p.stock ?? 0) <= 10);

  const totalSales = Number(analytics?.totalSales || 0);
  const totalOrders = Number(analytics?.totalOrders || 0);
  const averageOrderValue = Number(analytics?.averageOrderValue || 0);
  const lowStockCount = Number(analytics?.lowStockCount || 0);
  const bestSellers = analytics?.bestSellers || [];
  const recentOrders = analytics?.recentOrders || [];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-white/10 pb-4">
        <h2 className="font-display text-2xl font-extrabold tracking-tight">E-Commerce Analytics</h2>
        <p className="text-xs opacity-60 mt-1">Real-time revenue performance, merchandise sales breakdown, and stock inventory intelligence.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total Revenue */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-[#1E0D36] to-[#120624] border border-white/10 space-y-2 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider opacity-60">Total Sales</span>
            <div className="size-9 rounded-xl bg-emerald-500/20 text-emerald-400 grid place-items-center">
              <DollarSign className="size-5" />
            </div>
          </div>
          <p className="text-3xl font-extrabold">${totalSales.toFixed(2)}</p>
          <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
            <ArrowUpRight className="size-3" /> +100% from shop launches
          </span>
        </div>

        {/* Total Orders */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-[#1E0D36] to-[#120624] border border-white/10 space-y-2 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider opacity-60">Total Orders</span>
            <div className="size-9 rounded-xl bg-purple-500/20 text-purple-300 grid place-items-center">
              <ShoppingBag className="size-5" />
            </div>
          </div>
          <p className="text-3xl font-extrabold">{totalOrders}</p>
          <span className="text-[10px] text-purple-300 font-semibold">Orders processed & logged</span>
        </div>

        {/* Average Order Value */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-[#1E0D36] to-[#120624] border border-white/10 space-y-2 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider opacity-60">Avg. Order Value</span>
            <div className="size-9 rounded-xl bg-[#D4AF37]/20 text-[#D4AF37] grid place-items-center">
              <TrendingUp className="size-5" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-[#D4AF37]">${averageOrderValue.toFixed(2)}</p>
          <span className="text-[10px] opacity-50">Average cart total per customer</span>
        </div>

        {/* Low Stock Alert */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-[#1E0D36] to-[#120624] border border-white/10 space-y-2 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider opacity-60">Low Stock Items</span>
            <div className="size-9 rounded-xl bg-amber-500/20 text-amber-400 grid place-items-center">
              <AlertTriangle className="size-5" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-amber-400">{lowStockCount}</p>
          <span className="text-[10px] text-amber-300 font-semibold">Products with stock &le; 10 units</span>
        </div>
      </div>

      {/* Grid: Best Sellers & Low Stock Alerts */}
      <div className="grid gap-8 lg:grid-cols-12">
        {/* Best Sellers */}
        <div className="lg:col-span-7 rounded-2xl border border-white/10 bg-white/5 p-6 space-y-4">
          <h3 className="font-serif text-lg font-bold tracking-tight flex items-center gap-2">
            <TrendingUp className="size-5 text-[#D4AF37]" /> Best-Selling Merchandise
          </h3>
          
          <div className="divide-y divide-white/5">
            {bestSellers.length === 0 ? (
              <p className="text-xs opacity-50 py-4">No sales data recorded yet.</p>
            ) : (
              bestSellers.map((item, idx) => (
                <div key={idx} className="py-3 flex items-center justify-between gap-4 text-xs">
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="font-extrabold text-[#D4AF37] w-4 text-center">#{idx + 1}</span>
                    <img src={item?.image || "/products/hoodie.png"} alt="" className="size-10 rounded-lg object-cover border border-white/10 shrink-0" />
                    <div className="min-w-0">
                      <p className="font-bold truncate">{item?.name || "Product"}</p>
                      <p className="text-[10px] opacity-40">{item?.sold || 0} units sold</p>
                    </div>
                  </div>
                  <span className="font-extrabold text-emerald-400 shrink-0">${Number(item?.revenue || 0).toFixed(2)}</span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Low Stock Warning */}
        <div className="lg:col-span-5 rounded-2xl border border-white/10 bg-white/5 p-6 space-y-4">
          <h3 className="font-serif text-lg font-bold tracking-tight flex items-center gap-2">
            <AlertTriangle className="size-5 text-amber-400" /> Low Stock Warning
          </h3>

          <div className="space-y-3">
            {lowStockProducts.length === 0 ? (
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-semibold flex items-center gap-2">
                <CheckCircle2 className="size-4" /> All inventory stock levels are healthy!
              </div>
            ) : (
              lowStockProducts.map((p) => (
                <div key={p.id} className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5">
                    <Package className="size-4 text-amber-400 shrink-0" />
                    <span className="font-bold truncate">{p?.name || "Product"}</span>
                  </div>
                  <span className="font-extrabold text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded-full">
                    {p?.stock ?? 0} remaining
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Recent Orders Feed */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 space-y-4">
        <h3 className="font-serif text-lg font-bold tracking-tight">Recent Orders Log</h3>
        
        <div className="divide-y divide-white/5">
          {recentOrders.length === 0 ? (
            <p className="text-xs opacity-50 py-4">No recent orders recorded.</p>
          ) : (
            recentOrders.map((o) => (
              <div key={o.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div>
                  <span className="font-mono font-bold text-[#D4AF37] mr-2">{o?.orderNumber || "SOAR-1000"}</span>
                  <span className="font-bold">{o?.customer?.name || "Customer"}</span>
                  <span className="opacity-40 text-[10px] ml-2">({o?.items?.length || 0} items)</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="opacity-50 text-[11px]">{o?.created_at ? new Date(o.created_at).toLocaleDateString() : ""}</span>
                  <span className="font-extrabold text-emerald-400">${Number(o?.total || 0).toFixed(2)}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
