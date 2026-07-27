import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/site/Layout";
import { useCart } from "@/lib/cart";
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, ArrowLeft, ShieldCheck, Tag, Sparkles } from "lucide-react";

export const Route = createFileRoute("/shop/cart")({
  head: () => ({
    meta: [
      { title: "Shopping Cart — SOAR Store" },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart, subtotal, shipping, tax, total } = useCart();
  const navigate = useNavigate();

  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [promoError, setPromoError] = useState("");
  const [promoSuccess, setPromoSuccess] = useState("");

  const applyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError("");
    setPromoSuccess("");
    if (promoCode.trim().toUpperCase() === "SOAR10") {
      setDiscount(0.10);
      setPromoSuccess("10% discount applied!");
    } else if (promoCode.trim().toUpperCase() === "SOAR20") {
      setDiscount(0.20);
      setPromoSuccess("20% discount applied!");
    } else {
      setPromoError("Invalid promo code. Try SOAR10 or SOAR20");
    }
  };

  const finalSubtotal = subtotal * (1 - discount);
  const finalTotal = Number((finalSubtotal + shipping + tax).toFixed(2));

  return (
    <SiteLayout>
      <div className="bg-gradient-to-b from-background via-[#FDFBF7] to-[#F3F0F8]/40 min-h-screen pt-28 pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 space-y-8">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-6">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-primary">Shopping Bag</span>
              <h1 className="font-serif text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">Your Cart</h1>
            </div>
            <Link to="/shop" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground hover:text-primary transition">
              <ArrowLeft className="size-4" /> Continue Shopping
            </Link>
          </div>

          {cart.length === 0 ? (
            <div className="glass rounded-[32px] p-16 text-center border border-white/60 space-y-4 max-w-md mx-auto my-12">
              <div className="size-20 rounded-full bg-primary/5 border border-primary/10 grid place-items-center text-primary/40 mx-auto">
                <ShoppingBag className="size-10" />
              </div>
              <h2 className="font-display text-2xl font-bold text-foreground">Your cart is empty</h2>
              <p className="text-xs text-muted-foreground">
                You haven't added any official SOAR merchandise to your cart yet.
              </p>
              <button
                onClick={() => navigate({ to: "/shop" })}
                className="mt-4 rounded-full gradient-brand px-6 py-3 text-xs font-bold uppercase tracking-widest text-white shadow-soft hover:scale-105 transition cursor-pointer"
              >
                Browse Merchandise
              </button>
            </div>
          ) : (
            <div className="grid gap-12 lg:grid-cols-12 items-start">
              
              {/* Cart Table (Col 8) */}
              <div className="lg:col-span-8 space-y-4">
                {/* Free shipping banner */}
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 text-xs font-semibold flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="size-5 text-emerald-600 shrink-0" />
                    {subtotal >= 75 ? (
                      <span>Congratulations! You qualify for <strong>FREE Shipping</strong>.</span>
                    ) : (
                      <span>Add <strong>${(75 - subtotal).toFixed(2)}</strong> more for <strong>FREE Shipping</strong>.</span>
                    )}
                  </div>
                </div>

                <div className="glass rounded-[28px] border border-white/60 shadow-soft overflow-hidden">
                  <div className="divide-y divide-border/40">
                    {cart.map((item, idx) => {
                      const activePrice = item.product.salePrice && item.product.salePrice > 0 ? item.product.salePrice : item.product.price;
                      const itemImg = item.product.images?.[0] || "/products/hoodie.png";

                      return (
                        <div key={`${item.product.id}-${item.selectedVariant || idx}`} className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-white/40 transition">
                          <div className="flex items-center gap-4 min-w-0">
                            <img
                              src={itemImg}
                              alt={item.product.name}
                              className="size-20 rounded-2xl object-cover border border-white/60 shrink-0"
                            />
                            <div className="min-w-0">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-primary">{item.product.category}</span>
                              <Link to={`/shop/$slug`} params={{ slug: item.product.slug }} className="block font-serif text-sm font-bold text-foreground hover:text-primary transition truncate">
                                {item.product.name}
                              </Link>
                              {item.selectedVariant && (
                                <span className="text-xs text-[#5E2B97] font-medium block mt-0.5">{item.selectedVariant}</span>
                              )}
                              <span className="text-xs font-bold text-foreground sm:hidden mt-1 block">${activePrice.toFixed(2)} each</span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between w-full sm:w-auto gap-6 shrink-0 border-t sm:border-t-0 pt-3 sm:pt-0">
                            <div className="hidden sm:block text-right">
                              <span className="text-xs text-muted-foreground block">Price</span>
                              <span className="text-sm font-bold text-foreground">${activePrice.toFixed(2)}</span>
                            </div>

                            {/* Quantity Controls */}
                            <div className="flex items-center border border-border rounded-xl bg-white p-1 shadow-sm">
                              <button
                                onClick={() => updateQuantity(item.product.id, item.selectedVariant, item.quantity - 1)}
                                className="px-2.5 py-1 text-xs font-bold text-foreground hover:text-primary cursor-pointer"
                              >
                                <Minus className="size-3" />
                              </button>
                              <span className="px-2.5 py-1 text-xs font-extrabold text-foreground min-w-[20px] text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.product.id, item.selectedVariant, item.quantity + 1)}
                                className="px-2.5 py-1 text-xs font-bold text-foreground hover:text-primary cursor-pointer"
                              >
                                <Plus className="size-3" />
                              </button>
                            </div>

                            {/* Subtotal */}
                            <div className="text-right min-w-[80px]">
                              <span className="text-[10px] text-muted-foreground block sm:hidden">Total</span>
                              <span className="text-sm font-extrabold text-foreground">${(activePrice * item.quantity).toFixed(2)}</span>
                            </div>

                            {/* Remove */}
                            <button
                              onClick={() => removeFromCart(item.product.id, item.selectedVariant)}
                              className="size-8 rounded-full hover:bg-red-100 text-slate-400 hover:text-red-600 grid place-items-center transition cursor-pointer"
                              title="Remove item"
                            >
                              <Trash2 className="size-4" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="p-4 bg-slate-50/50 border-t border-border/40 flex justify-between items-center text-xs">
                    <button
                      onClick={clearCart}
                      className="text-muted-foreground hover:text-red-500 font-semibold transition cursor-pointer"
                    >
                      Clear Cart
                    </button>
                    <span className="text-muted-foreground">{cart.length} unique items</span>
                  </div>
                </div>
              </div>

              {/* Order Summary Sidebar (Col 4) */}
              <div className="lg:col-span-4 space-y-6">
                <div className="glass rounded-[28px] p-6 border border-white/60 shadow-elegant space-y-6">
                  <h3 className="font-serif text-lg font-bold text-foreground tracking-tight border-b border-border/60 pb-4">
                    Order Summary
                  </h3>

                  {/* Promo Code Form */}
                  <form onSubmit={applyPromo} className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">
                      Have a Promo Code?
                    </label>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Tag className="absolute left-3 top-3 size-3.5 text-muted-foreground" />
                        <input
                          type="text"
                          placeholder="e.g. SOAR10"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          className="w-full pl-8 pr-3 py-2 rounded-xl border border-border bg-white text-xs text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary"
                        />
                      </div>
                      <button
                        type="submit"
                        className="rounded-xl border border-primary bg-primary/10 hover:bg-primary text-primary hover:text-white px-4 py-2 text-xs font-bold transition cursor-pointer"
                      >
                        Apply
                      </button>
                    </div>
                    {promoError && <p className="text-[10px] text-red-500">{promoError}</p>}
                    {promoSuccess && <p className="text-[10px] text-emerald-600 font-semibold">{promoSuccess}</p>}
                  </form>

                  {/* Breakdown */}
                  <div className="space-y-2.5 text-xs text-foreground/80 pt-4 border-t border-border/40">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-semibold">${subtotal.toFixed(2)}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-emerald-600 font-semibold">
                        <span>Promo Discount ({(discount * 100)}%)</span>
                        <span>-${(subtotal * discount).toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Estimated Shipping</span>
                      <span>{shipping === 0 ? <strong className="text-emerald-600">FREE</strong> : `$${shipping.toFixed(2)}`}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Estimated Sales Tax (7%)</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-base font-extrabold text-foreground pt-3 border-t border-border/60">
                      <span>Total</span>
                      <span className="text-primary text-lg">${finalTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <button
                    onClick={() => navigate({ to: "/shop/checkout" })}
                    className="w-full flex items-center justify-center gap-2 py-4 rounded-xl gradient-brand text-white font-extrabold text-xs uppercase tracking-widest shadow-soft hover:scale-[1.02] active:scale-[0.98] transition cursor-pointer"
                  >
                    Proceed to Checkout
                    <ArrowRight className="size-4" />
                  </button>
                </div>
              </div>

            </div>
          )}

        </div>
      </div>
    </SiteLayout>
  );
}
