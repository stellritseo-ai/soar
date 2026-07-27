import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useOrders, updateOrderStatusFn, type OrderType } from "@/lib/cms";
import { Search, ShoppingBag, Eye, X, CheckCircle2, Clock, Truck, ShieldAlert, FileText, User } from "lucide-react";

export function ShopOrdersManager() {
  const { data: orders, isLoading } = useOrders();
  const qc = useQueryClient();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedOrder, setSelectedOrder] = useState<OrderType | null>(null);

  const invalidate = () => {
    qc.invalidateQueries({ queryKey: ["cms", "orders"] });
    qc.invalidateQueries({ queryKey: ["cms", "shop-analytics"] });
    qc.invalidateQueries({ queryKey: ["cms", "customers"] });
  };

  const updateStatusMutation = useMutation({
    mutationFn: async (data: { id: string; orderStatus?: OrderType["orderStatus"]; paymentStatus?: OrderType["paymentStatus"] }) => {
      const res = await updateOrderStatusFn({ data });
      if (!res.success) throw new Error("Failed to update status");
    },
    onSuccess: () => {
      invalidate();
      if (selectedOrder) {
        // Refresh local selected modal object
        const updated = (orders || []).find((o) => o.id === selectedOrder.id);
        if (updated) setSelectedOrder(updated);
      }
    },
  });

  const filteredOrders = (orders || []).filter((o) => {
    if (!o) return false;
    const matchesStatus = statusFilter === "All" || o.orderStatus === statusFilter;
    const matchesSearch = (o.orderNumber?.toLowerCase() || "").includes(search.toLowerCase()) ||
      (o.customer?.name?.toLowerCase() || "").includes(search.toLowerCase()) ||
      (o.customer?.email?.toLowerCase() || "").includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusBadge = (status: OrderType["orderStatus"]) => {
    switch (status) {
      case "Delivered":
        return <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase">Delivered</span>;
      case "Shipped":
        return <span className="bg-blue-500/20 text-blue-300 border border-blue-500/30 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase">Shipped</span>;
      case "Processing":
        return <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase">Processing</span>;
      case "Pending":
        return <span className="bg-purple-500/20 text-purple-300 border border-purple-500/30 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase">Pending</span>;
      case "Cancelled":
        return <span className="bg-red-500/20 text-red-300 border border-red-500/30 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase">Cancelled</span>;
      default:
        return <span className="bg-white/10 text-white/70 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase">{status}</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <h2 className="font-display text-2xl font-extrabold text-white tracking-tight">Customer Orders</h2>
          <p className="text-xs text-white/50 mt-1">Track merchandise orders, update fulfillment statuses, and view shipping manifests.</p>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/10">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-3 size-4 text-white/40" />
          <input
            type="text"
            placeholder="Search Order # or Customer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-black/30 border border-white/10 rounded-xl text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-[#D4AF37]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs text-white/60 font-semibold shrink-0">Order Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none cursor-pointer"
          >
            <option value="All">All Statuses</option>
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Pending">Pending</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      {isLoading ? (
        <p className="text-xs text-white/50">Loading orders...</p>
      ) : filteredOrders.length === 0 ? (
        <div className="text-center p-8 rounded-2xl border border-white/10 bg-white/5 space-y-2">
          <ShoppingBag className="size-8 mx-auto text-white/30" />
          <p className="text-sm font-bold text-white">No customer orders found</p>
        </div>
      ) : (
        <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden shadow-soft">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-white/80">
              <thead className="bg-[#150A27] text-white uppercase text-[10px] tracking-wider border-b border-white/10">
                <tr>
                  <th className="p-4">Order #</th>
                  <th className="p-4">Customer</th>
                  <th className="p-4">Items</th>
                  <th className="p-4">Total</th>
                  <th className="p-4">Payment</th>
                  <th className="p-4">Order Status</th>
                  <th className="p-4">Date</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredOrders.map((o) => (
                  <tr key={o.id} className="hover:bg-white/5 transition">
                    <td className="p-4 font-mono font-bold text-[#D4AF37]">{o.orderNumber}</td>
                    <td className="p-4">
                      <div className="font-bold text-white">{o.customer.name}</div>
                      <div className="text-[10px] text-white/40">{o.customer.email}</div>
                    </td>
                    <td className="p-4">
                      <span className="font-semibold text-white">{o.items.length} items</span>
                    </td>
                    <td className="p-4 font-extrabold text-white">${o.total.toFixed(2)}</td>
                    <td className="p-4">
                      <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                        {o.paymentStatus} ({o.paymentMethod})
                      </span>
                    </td>
                    <td className="p-4">{getStatusBadge(o.orderStatus)}</td>
                    <td className="p-4 text-white/50 text-[11px]">
                      {new Date(o.created_at).toLocaleDateString()}
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => setSelectedOrder(o)}
                        className="inline-flex items-center gap-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider transition cursor-pointer"
                      >
                        <Eye className="size-3.5 text-[#D4AF37]" /> View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-2xl bg-[#0F081D] border border-white/15 rounded-3xl p-6 shadow-2xl text-white space-y-6 max-h-[90vh] overflow-y-auto">
            
            {/* Modal Header */}
            <div className="flex justify-between items-center border-b border-white/10 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37]">Order Details</span>
                <h3 className="font-serif text-xl font-bold text-white flex items-center gap-2">
                  {selectedOrder.orderNumber}
                </h3>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="text-white/60 hover:text-white">
                <X className="size-5" />
              </button>
            </div>

            {/* Quick Status Bar */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <span className="text-[10px] text-white/50 uppercase font-bold block">Current Order Status</span>
                <div className="mt-1">{getStatusBadge(selectedOrder.orderStatus)}</div>
              </div>

              {/* Status Update Selector */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-white/60 font-semibold">Change Status:</span>
                <select
                  value={selectedOrder.orderStatus}
                  onChange={(e) => {
                    const newSt = e.target.value as OrderType["orderStatus"];
                    updateStatusMutation.mutate({ id: selectedOrder.id, orderStatus: newSt });
                  }}
                  className="bg-[#1A0E31] border border-[#D4AF37]/50 rounded-xl px-3 py-1.5 text-xs text-[#D4AF37] font-bold focus:outline-none cursor-pointer"
                >
                  <option value="Pending">Pending</option>
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            {/* Customer & Address Details */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1.5 text-xs">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37] block mb-2 flex items-center gap-1.5">
                  <User className="size-3.5" /> Customer Info
                </span>
                <p className="font-bold text-white">{selectedOrder.customer.name}</p>
                <p className="text-white/70">{selectedOrder.customer.email}</p>
                <p className="text-white/70">{selectedOrder.customer.phone || "No phone provided"}</p>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1.5 text-xs">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37] block mb-2 flex items-center gap-1.5">
                  <Truck className="size-3.5" /> Shipping Address
                </span>
                <p className="text-white">{selectedOrder.customer.address.street}</p>
                <p className="text-white/70">
                  {selectedOrder.customer.address.city}, {selectedOrder.customer.address.state} {selectedOrder.customer.address.zip}
                </p>
                <p className="text-white/50">{selectedOrder.customer.address.country}</p>
              </div>
            </div>

            {/* Items Purchased */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white/60">Items Purchased</h4>
              <div className="divide-y divide-white/5 bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
                {selectedOrder.items.map((item, idx) => (
                  <div key={idx} className="p-3.5 flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.image || "/products/hoodie.png"}
                        alt=""
                        className="size-12 rounded-xl object-cover border border-white/10"
                      />
                      <div>
                        <p className="font-bold text-white">{item.name}</p>
                        {item.variant && <p className="text-[10px] text-[#D4AF37]">{item.variant}</p>}
                        <p className="text-[10px] text-white/50">Qty: {item.quantity} x ${item.price.toFixed(2)}</p>
                      </div>
                    </div>
                    <span className="font-bold text-white">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Summary */}
            <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-2 text-xs">
              <div className="flex justify-between text-white/70">
                <span>Subtotal</span>
                <span>${selectedOrder.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-white/70">
                <span>Shipping</span>
                <span>${selectedOrder.shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-white/70">
                <span>Tax</span>
                <span>${selectedOrder.tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm font-extrabold text-white pt-2 border-t border-white/10">
                <span>Total Amount Paid</span>
                <span className="text-[#D4AF37] text-base">${selectedOrder.total.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedOrder(null)}
                className="px-6 py-2 rounded-full bg-white/10 text-white text-xs font-bold hover:bg-white/20"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
