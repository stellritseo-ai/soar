import React, { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useCart } from "@/lib/cart";
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Tag, Sparkles } from "lucide-react";

export function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    subtotal,
    shipping,
    tax,
    cartCount,
  } = useCart();
  const navigate = useNavigate();

  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [promoError, setPromoError] = useState("");
  const [promoSuccess, setPromoSuccess] = useState("");

  if (!isCartOpen) return null;

  const applyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError("");
    setPromoSuccess("");
    const clean = promoCode.trim().toUpperCase();
    if (clean === "SOAR10") {
      setDiscount(0.10);
      setPromoSuccess("10% discount applied!");
    } else if (clean === "SOAR20") {
      setDiscount(0.20);
      setPromoSuccess("20% discount applied!");
    } else {
      setPromoError("Invalid code. Try SOAR10");
    }
  };

  const finalSubtotal = subtotal * (1 - discount);
  const finalTotal = Number((finalSubtotal + shipping + tax).toFixed(2));
  const shippingThreshold = 75;
  const progressPercent = Math.min(100, Math.round((subtotal / shippingThreshold) * 100));

  return (
    <div className="fixed inset-0 z-[9999] flex justify-end">
      {/* Dark Overlay Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-md transition-opacity duration-300 animate-fadeIn"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer Container Panel */}
      <div className="relative z-10 w-full max-w-[460px] h-[100dvh] bg-[#0D061A] text-white shadow-2xl flex flex-col border-l border-white/15 animate-slideLeft overflow-hidden">
        
        {/* Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between bg-gradient-to-r from-[#17092F] to-[#1F0C3B] shrink-0">
          <div className="flex items-center gap-3.5">
            <div className="size-10 rounded-2xl bg-gradient-to-tr from-[#5E2B97] to-[#D4AF37] grid place-items-center text-white shadow-md">
              <ShoppingBag className="size-5" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold tracking-tight text-white leading-none">Your Shopping Cart</h3>
              <span className="text-xs text-[#D4AF37] font-semibold mt-1 block">
                {cartCount} {cartCount === 1 ? "item" : "items"} selected
              </span>
            </div>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="size-9 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white grid place-items-center transition border border-white/15 cursor-pointer"
            title="Close cart"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Free Shipping Progress Bar */}
        <div className="px-5 py-3.5 bg-[#150A26] border-b border-white/10 shrink-0 space-y-2">
          <div className="flex justify-between items-center text-xs">
            {subtotal >= shippingThreshold ? (
              <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                <ShieldCheck className="size-4" /> You qualified for FREE Shipping!
              </span>
            ) : (
              <span className="text-white/80">
                Add <strong className="text-[#D4AF37]">${(shippingThreshold - subtotal).toFixed(2)}</strong> for <strong className="text-white">FREE Shipping</strong>
              </span>
            )}
            <span className="text-[10px] font-bold text-[#D4AF37]">{progressPercent}%</span>
          </div>
          <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#5E2B97] via-[#D4AF37] to-[#F2D27C] transition-all duration-500 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Scrollable Cart Items */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="size-20 rounded-full bg-white/5 border border-white/10 grid place-items-center text-white/30">
                <ShoppingBag className="size-10" />
              </div>
              <h4 className="font-serif text-lg font-bold text-white">Your cart is empty</h4>
              <p className="text-xs text-white/60 max-w-xs leading-relaxed">
                Explore our official merchandise to wear the mission and support women rising.
              </p>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  navigate({ to: "/shop" });
                }}
                className="mt-2 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F2D27C] px-6 py-3 text-xs font-bold uppercase tracking-widest text-[#0C1220] shadow-glow hover:scale-105 active:scale-95 transition cursor-pointer"
              >
                Browse Shop
              </button>
            </div>
          ) : (
            cart.map((item, idx) => {
              const activePrice = item.product.salePrice && item.product.salePrice > 0 ? item.product.salePrice : item.product.price;
              const itemImage = item.product.images?.[0] || "/products/hoodie.png";

              return (
                <div
                  key={`${item.product.id}-${item.selectedVariant || idx}`}
                  className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-[#D4AF37]/40 transition group relative"
                >
                  <img
                    src={itemImage}
                    alt={item.product.name}
                    className="size-20 rounded-xl object-cover border border-white/10 shrink-0 bg-white/10"
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2 pr-6">
                        <h4 className="font-serif text-xs font-bold text-white truncate leading-snug">
                          {item.product.name}
                        </h4>
                      </div>
                      {item.selectedVariant && (
                        <span className="text-[10px] text-[#D4AF37] font-medium block mt-0.5">
                          {item.selectedVariant}
                        </span>
                      )}
                      <div className="text-xs font-bold text-white/80 mt-1">
                        ${activePrice.toFixed(2)}
                      </div>
                    </div>

                    {/* Quantity Selector & Price */}
                    <div className="flex items-center justify-between mt-3 pt-2 border-t border-white/5">
                      <div className="flex items-center gap-2 border border-white/20 rounded-lg bg-black/40 px-2 py-1">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.selectedVariant, item.quantity - 1)}
                          className="text-white/60 hover:text-white transition p-0.5 cursor-pointer"
                        >
                          <Minus className="size-3" />
                        </button>
                        <span className="text-xs font-bold text-white min-w-[18px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.selectedVariant, item.quantity + 1)}
                          className="text-white/60 hover:text-white transition p-0.5 cursor-pointer"
                        >
                          <Plus className="size-3" />
                        </button>
                      </div>
                      <span className="text-xs font-extrabold text-[#D4AF37]">
                        ${(activePrice * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Remove Button (Absolute Top Right) */}
                  <button
                    onClick={() => removeFromCart(item.product.id, item.selectedVariant)}
                    className="absolute top-3.5 right-3.5 text-white/30 hover:text-red-400 transition p-1 cursor-pointer"
                    title="Remove item"
                  >
                    <Trash2 className="size-3.5" />
                  </button>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Totals & Checkout Actions */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-white/10 bg-[#110622] shrink-0 space-y-4 shadow-2xl">
            {/* Promo Code Input */}
            <form onSubmit={applyPromo} className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="absolute left-3 top-2.5 size-3.5 text-white/40" />
                <input
                  type="text"
                  placeholder="Promo Code (e.g. SOAR10)"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-8 pr-3 py-2 text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
              <button
                type="submit"
                className="rounded-xl border border-[#D4AF37]/50 bg-[#D4AF37]/15 hover:bg-[#D4AF37]/30 px-3.5 py-2 text-xs font-bold text-[#D4AF37] transition cursor-pointer"
              >
                Apply
              </button>
            </form>
            {promoError && <p className="text-[10px] text-red-400">{promoError}</p>}
            {promoSuccess && <p className="text-[10px] text-emerald-400">{promoSuccess}</p>}

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs text-white/70 pt-2 border-t border-white/5">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-white">${subtotal.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-400 font-semibold">
                  <span>Promo Discount ({(discount * 100)}%)</span>
                  <span>-${(subtotal * discount).toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Estimated Shipping</span>
                <span>{shipping === 0 ? <strong className="text-emerald-400">FREE</strong> : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Sales Tax (7%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm font-extrabold text-white pt-2.5 border-t border-white/10">
                <span>Total</span>
                <span className="text-[#D4AF37] text-lg font-serif">${finalTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <div className="space-y-2 pt-1">
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  navigate({ to: "/shop/checkout" });
                }}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F2D27C] text-[#0C1220] font-extrabold text-xs uppercase tracking-widest transition shadow-glow hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
              >
                Proceed to Checkout
                <ArrowRight className="size-4" />
              </button>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  navigate({ to: "/shop/cart" });
                }}
                className="w-full text-center py-1.5 text-xs font-semibold text-white/60 hover:text-white transition cursor-pointer"
              >
                View Full Shopping Cart Page
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
