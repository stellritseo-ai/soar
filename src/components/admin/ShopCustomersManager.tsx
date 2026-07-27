import { useState } from "react";
import { useCustomers } from "@/lib/cms";
import { Search, Users, Mail, Phone, ShoppingBag, DollarSign } from "lucide-react";

export function ShopCustomersManager() {
  const { data: customers, isLoading } = useCustomers();
  const [search, setSearch] = useState("");

  const filteredCustomers = (customers || []).filter(
    (c) =>
      c &&
      ((c.name?.toLowerCase() || "").includes(search.toLowerCase()) ||
        (c.email?.toLowerCase() || "").includes(search.toLowerCase()))
  );

  const totalSpentAll = (customers || []).reduce((acc, c) => acc + Number(c?.totalSpent || 0), 0);
  const avgSpent = customers && customers.length > 0 ? totalSpentAll / customers.length : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <h2 className="font-display text-2xl font-extrabold text-white tracking-tight">Customer Directory</h2>
          <p className="text-xs text-white/50 mt-1">Directory of supporters and customers who purchased shop merchandise.</p>
        </div>
      </div>

      {/* KPI Stats summary */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
          <div className="flex items-center gap-2 text-xs text-white/60">
            <Users className="size-4 text-[#D4AF37]" /> Total Customers
          </div>
          <p className="text-2xl font-extrabold text-white">{customers?.length || 0}</p>
        </div>
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
          <div className="flex items-center gap-2 text-xs text-white/60">
            <DollarSign className="size-4 text-emerald-400" /> Total Customer Volume
          </div>
          <p className="text-2xl font-extrabold text-emerald-400">${totalSpentAll.toFixed(2)}</p>
        </div>
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
          <div className="flex items-center gap-2 text-xs text-white/60">
            <ShoppingBag className="size-4 text-purple-400" /> Avg. Spend per Customer
          </div>
          <p className="text-2xl font-extrabold text-purple-300">${avgSpent.toFixed(2)}</p>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3.5 top-3 size-4 text-white/40" />
        <input
          type="text"
          placeholder="Search customer name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-black/30 border border-white/10 rounded-xl text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-[#D4AF37]"
        />
      </div>

      {/* Customers Table */}
      {isLoading ? (
        <p className="text-xs text-white/50">Loading customer directory...</p>
      ) : filteredCustomers.length === 0 ? (
        <div className="text-center p-8 rounded-2xl border border-white/10 bg-white/5 space-y-2">
          <Users className="size-8 mx-auto text-white/30" />
          <p className="text-sm font-bold text-white">No customers found</p>
        </div>
      ) : (
        <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden shadow-soft">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-white/80">
              <thead className="bg-[#150A27] text-white uppercase text-[10px] tracking-wider border-b border-white/10">
                <tr>
                  <th className="p-4">Customer Name</th>
                  <th className="p-4">Email Address</th>
                  <th className="p-4">Phone</th>
                  <th className="p-4">Total Orders</th>
                  <th className="p-4">Total Spent</th>
                  <th className="p-4">Last Purchase Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredCustomers.map((c) => (
                  <tr key={c.id} className="hover:bg-white/5 transition">
                    <td className="p-4 font-bold text-white">
                      <div className="flex items-center gap-2.5">
                        <div className="size-8 rounded-full bg-gradient-to-tr from-[#5E2B97] to-[#D4AF37] grid place-items-center text-white text-xs font-bold shrink-0">
                          {c.name.charAt(0)}
                        </div>
                        <span>{c.name}</span>
                      </div>
                    </td>
                    <td className="p-4 text-white/70">{c.email}</td>
                    <td className="p-4 text-white/50">{c.phone || "—"}</td>
                    <td className="p-4 font-semibold text-white">{c.totalOrders}</td>
                    <td className="p-4 font-extrabold text-emerald-400">${c.totalSpent.toFixed(2)}</td>
                    <td className="p-4 text-white/50 text-[11px]">
                      {new Date(c.lastOrderDate).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
