import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useProducts, upsertProductFn, deleteProductFn, type ProductType } from "@/lib/cms";
import { Plus, Trash2, Edit3, Save, X, Search, Package, AlertTriangle, CheckCircle2, Star } from "lucide-react";
import { ImageInput } from "./ImageInput";

type DraftProduct = Partial<ProductType> & { name: string; price: number; category: string };

export function ShopProductsManager() {
  const { data: products, isLoading } = useProducts();
  const qc = useQueryClient();

  const [editing, setEditing] = useState<DraftProduct | null>(null);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const invalidate = () => {
    qc.invalidateQueries({ queryKey: ["cms", "products"] });
    qc.invalidateQueries({ queryKey: ["cms", "shop-analytics"] });
  };

  const saveMutation = useMutation({
    mutationFn: async (row: DraftProduct) => {
      const res = await upsertProductFn({ data: row });
      if (!res.success) throw new Error("Failed to save product");
    },
    onSuccess: () => {
      invalidate();
      setEditing(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await deleteProductFn({ data: id });
      if (!res.success) throw new Error("Failed to delete product");
    },
    onSuccess: invalidate,
  });

  const filteredProducts = (products || []).filter((p) => {
    const matchesCategory = categoryFilter === "All" || p.category === categoryFilter;
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
      (p.sku && p.sku.toLowerCase().includes(search.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <h2 className="font-display text-2xl font-extrabold text-white tracking-tight">Merchandise Catalog</h2>
          <p className="text-xs text-white/50 mt-1">Manage shop products, pricing, variants, and stock inventory.</p>
        </div>
        <button
          onClick={() =>
            setEditing({
              name: "",
              price: 29.99,
              category: "Cloth",
              stock: 50,
              status: "Published",
              isFeatured: false,
              images: ["/products/hoodie.png"],
              variants: [{ name: "Size", options: ["S", "M", "L", "XL"] }],
            })
          }
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F2D27C] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-[#0C1220] hover:scale-[1.03] active:scale-[0.98] shadow-glow transition duration-200 cursor-pointer"
        >
          <Plus className="size-4" /> Add Product
        </button>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/10">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-3 size-4 text-white/40" />
          <input
            type="text"
            placeholder="Search by product name or SKU..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-black/30 border border-white/10 rounded-xl text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-[#D4AF37]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs text-white/60 font-semibold shrink-0">Category:</span>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none cursor-pointer"
          >
            <option value="All">All Categories</option>
            <option value="Books">Books</option>
            <option value="Cloth">Cloth</option>
          </select>
        </div>
      </div>

      {/* Product List Grid */}
      {isLoading ? (
        <p className="text-xs text-white/50">Loading product catalog...</p>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center p-8 rounded-2xl border border-white/10 bg-white/5 space-y-2">
          <Package className="size-8 mx-auto text-white/30" />
          <p className="text-sm font-bold text-white">No products found</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((p) => (
            <div
              key={p.id}
              className="rounded-2xl border border-white/10 bg-white/5 p-4 flex flex-col justify-between hover:border-[#D4AF37]/40 transition space-y-4"
            >
              <div className="flex gap-4">
                <img
                  src={p.images?.[0] || "/products/hoodie.png"}
                  alt={p.name}
                  className="size-20 rounded-xl object-cover border border-white/10 shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-[#D4AF37] uppercase">{p.category}</span>
                    <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-full ${
                      p.status === "Published" ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30" : "bg-yellow-500/20 text-yellow-300"
                    }`}>
                      {p.status}
                    </span>
                  </div>
                  <h3 className="font-bold text-white text-sm truncate mt-1">{p.name}</h3>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-sm font-extrabold text-white">${p.salePrice || p.price}</span>
                    {p.salePrice && <span className="text-xs text-white/40 line-through">${p.price}</span>}
                  </div>
                  <div className="text-[10px] text-white/50 mt-1">SKU: {p.sku || "N/A"}</div>
                </div>
              </div>

              {/* Stock Bar & Actions */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5">
                  <Package className="size-3.5 text-white/40" />
                  <span className={p.stock <= 10 ? "text-amber-400 font-bold" : "text-white/70"}>
                    Stock: {p.stock}
                  </span>
                  {p.stock <= 10 && <AlertTriangle className="size-3 text-amber-400" />}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setEditing(p)}
                    className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white hover:bg-white/15 transition cursor-pointer"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`Delete product "${p.name}"?`)) deleteMutation.mutate(p.id);
                    }}
                    className="rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-red-400 hover:bg-red-500/20 transition cursor-pointer"
                  >
                    <Trash2 className="size-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit / Add Modal */}
      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-2xl bg-[#0F081D] border border-white/15 rounded-3xl p-6 shadow-2xl text-white space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-white/10 pb-4">
              <h3 className="font-display text-lg font-bold text-white">
                {editing.id ? "Edit Product" : "Add New Merchandise"}
              </h3>
              <button onClick={() => setEditing(null)} className="text-white/60 hover:text-white">
                <X className="size-5" />
              </button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] mb-1">
                  Product Name *
                </label>
                <input
                  type="text"
                  value={editing.name}
                  onChange={(e) => setEditing({ ...editing, name: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  placeholder="e.g. SOAR Empowered Hoodie"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] mb-1">
                  Category *
                </label>
                <select
                  value={editing.category}
                  onChange={(e) => setEditing({ ...editing, category: e.target.value })}
                  className="w-full bg-[#1A0E31] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37] cursor-pointer"
                >
                  <option value="Books">Books</option>
                  <option value="Cloth">Cloth</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] mb-1">
                  SKU Code
                </label>
                <input
                  type="text"
                  value={editing.sku || ""}
                  onChange={(e) => setEditing({ ...editing, sku: e.target.value })}
                  placeholder="SOAR-HOOD-001"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] mb-1">
                  Regular Price ($) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={editing.price}
                  onChange={(e) => setEditing({ ...editing, price: parseFloat(e.target.value) || 0 })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] mb-1">
                  Sale Price ($) (Optional)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={editing.salePrice || ""}
                  onChange={(e) => setEditing({ ...editing, salePrice: parseFloat(e.target.value) || undefined })}
                  placeholder="Leave empty if not on sale"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] mb-1">
                  Stock Inventory Count *
                </label>
                <input
                  type="number"
                  value={editing.stock}
                  onChange={(e) => setEditing({ ...editing, stock: parseInt(e.target.value) || 0 })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] mb-1">
                  Status
                </label>
                <select
                  value={editing.status || "Published"}
                  onChange={(e) => setEditing({ ...editing, status: e.target.value as any })}
                  className="w-full bg-[#1A0E31] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37] cursor-pointer"
                >
                  <option value="Published">Published</option>
                  <option value="Draft">Draft</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] mb-1">
                  Product Image URL
                </label>
                <ImageInput
                  value={editing.images?.[0] || ""}
                  onChange={(url) => setEditing({ ...editing, images: url ? [url] : [] })}
                  folder="products"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] mb-1">
                  Short Description
                </label>
                <input
                  type="text"
                  value={editing.shortDescription || ""}
                  onChange={(e) => setEditing({ ...editing, shortDescription: e.target.value })}
                  placeholder="One sentence product summary"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] mb-1">
                  Full Description
                </label>
                <textarea
                  rows={3}
                  value={editing.description || ""}
                  onChange={(e) => setEditing({ ...editing, description: e.target.value })}
                  placeholder="Detailed product story & material specification..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div className="sm:col-span-2 flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="isFeatured"
                  checked={!!editing.isFeatured}
                  onChange={(e) => setEditing({ ...editing, isFeatured: e.target.checked })}
                  className="rounded border-white/20 bg-white/10 text-primary focus:ring-0 cursor-pointer"
                />
                <label htmlFor="isFeatured" className="text-xs text-white font-semibold cursor-pointer">
                  Highlight as Featured Product on Storefront
                </label>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={() => setEditing(null)}
                className="px-5 py-2 rounded-full border border-white/15 text-xs text-white/70 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => saveMutation.mutate(editing)}
                disabled={saveMutation.isPending}
                className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F2D27C] text-[#0C1220] font-bold text-xs uppercase tracking-wider hover:scale-105 transition cursor-pointer shadow-glow"
              >
                <Save className="size-4" /> Save Product
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
