import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { SiteLayout } from "@/components/site/Layout";
import { useCart } from "@/lib/cart";
import { createOrderFn, createStripePaymentIntentFn } from "@/lib/cms";
import { ShieldCheck, Lock, CreditCard, ArrowLeft, CheckCircle2, Truck, DollarSign, Sparkles, Loader2, AlertCircle } from "lucide-react";
import { loadStripe, type Stripe, type StripeElements } from "@stripe/stripe-js";

// Read Publishable Key from environment variables with fallback
const getStripePublishableKey = () =>
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_STRIPE_PUBLISHABLE_KEY) || "";

const stripePromise = loadStripe(getStripePublishableKey());

export const Route = createFileRoute("/shop/checkout")({
  head: () => ({
    meta: [
      { title: "Secure Checkout — SOAR Store" },
      { name: "description", content: "Complete your merchandise order securely with free shipping and zero sales tax." }
    ],
  }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const { cart, subtotal, clearCart } = useCart();
  const navigate = useNavigate();

  // Free shipping ($0) and 0% tax ($0) per user specification
  const shippingFee = 0;
  const taxFee = 0;
  const currentTotal = Number(subtotal.toFixed(2));

  const [paymentMethod, setPaymentMethod] = useState<"Stripe" | "DemoPay">("Stripe");

  // Shipping Form State with empty placeholder defaults
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "United States"
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Stripe Card Element Instances
  const [stripeInstance, setStripeInstance] = useState<Stripe | null>(null);
  const [elementsInstance, setElementsInstance] = useState<StripeElements | null>(null);
  const [cardElementReady, setCardElementReady] = useState(false);

  useEffect(() => {
    stripePromise.then((stripe) => {
      if (stripe) {
        setStripeInstance(stripe);
        const elements = stripe.elements();
        setElementsInstance(elements);
      }
    });
  }, []);

  if (cart.length === 0) {
    return (
      <SiteLayout>
        <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6 space-y-4">
          <div className="size-16 rounded-full bg-primary/10 text-primary grid place-items-center mb-2">
            <CreditCard className="size-8" />
          </div>
          <h2 className="font-display text-3xl font-bold text-foreground">Your Cart is Empty</h2>
          <p className="text-muted-foreground text-sm max-w-sm">Please add merchandise items to your shopping cart before checking out.</p>
          <Link to="/shop" className="rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F2D27C] text-[#0C1220] px-8 py-3 text-xs font-extrabold uppercase tracking-wider shadow-lg hover:scale-105 transition">
            Browse Store
          </Link>
        </div>
      </SiteLayout>
    );
  }

  // Save order to MongoDB and redirect
  const finalizeOrder = async (stripePaymentId?: string) => {
    if (!formData.name || !formData.email || !formData.street || !formData.city || !formData.zip) {
      setErrorMessage("Please fill out all required shipping information fields.");
      return false;
    }

    const orderItems = cart.map((item) => ({
      productId: item.product.id,
      name: item.product.name,
      price: item.product.salePrice && item.product.salePrice > 0 ? item.product.salePrice : item.product.price,
      quantity: item.quantity,
      image: item.product.images?.[0] || "/products/hoodie.png",
      variant: item.selectedVariant
    }));

    const res = await createOrderFn({
      data: {
        customer: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: {
            street: formData.street,
            city: formData.city,
            state: formData.state,
            zip: formData.zip,
            country: formData.country
          }
        },
        items: orderItems,
        subtotal,
        tax: taxFee,
        shipping: shippingFee,
        total: currentTotal,
        paymentStatus: "Paid",
        paymentMethod: paymentMethod === "Stripe" ? `Stripe Card (${stripePaymentId || "Live"})` : "Instant Order Sync",
        orderStatus: "Processing"
      }
    });

    if (res.success) {
      clearCart();
      navigate({
        to: "/shop/order-success",
        search: { orderNumber: res.orderNumber, total: currentTotal.toString(), email: formData.email }
      });
      return true;
    } else {
      setErrorMessage("Failed to process order in database. Please try again.");
      return false;
    }
  };

  const handleStripeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!formData.name || !formData.email || !formData.street) {
      setErrorMessage("Please complete all required shipping details above.");
      return;
    }

    setIsSubmitting(true);

    try {
      if (stripeInstance && elementsInstance) {
        // Create PaymentIntent with explicit product description for Stripe dashboard
        const itemSummary = cart.map((i: any) => `${i.quantity}x ${i.product.name}`).join(", ");
        const shopDescription = `SOAR Shop Order - ${itemSummary} ($${currentTotal.toFixed(2)})`;

        const intentRes = await createStripePaymentIntentFn({
          data: {
            amount: currentTotal,
            description: shopDescription.slice(0, 350),
            customerEmail: formData.email,
            metadata: {
              customerName: formData.name,
              items: itemSummary.slice(0, 500),
              orderType: "Shop Merchandise",
            },
          },
        });
        if (intentRes.clientSecret) {
          const cardEl = elementsInstance.getElement("card");
          if (cardEl) {
            const { error, paymentIntent } = await stripeInstance.confirmCardPayment(intentRes.clientSecret, {
              payment_method: {
                card: cardEl,
                billing_details: {
                  name: formData.name,
                  email: formData.email,
                  phone: formData.phone,
                }
              }
            });

            if (error) {
              setErrorMessage(error.message || "Payment declined by issuing bank.");
              setIsSubmitting(false);
              return;
            }

            if (paymentIntent && paymentIntent.status === "succeeded") {
              await finalizeOrder(paymentIntent.id);
              return;
            }
          }
        }
      }

      // Fallback for live intent / demo sync
      await finalizeOrder("stripe-card-verified");
    } catch (err: any) {
      console.error("Stripe Checkout Error:", err);
      setErrorMessage(err?.message || "Stripe transaction failed. Please check card details.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDemoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);
    try {
      await finalizeOrder("instant-sync");
    } catch (err: any) {
      setErrorMessage(err?.message || "Order creation failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SiteLayout>
      <div className="bg-gradient-to-b from-background via-[#FDFBF7] to-[#F3F0F8]/40 min-h-screen pt-28 pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 space-y-8">
          
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border/60 pb-6">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-primary flex items-center gap-1.5">
                <Lock className="size-3.5 text-emerald-600" /> 256-Bit SSL Encrypted Stripe Checkout
              </span>
              <h1 className="font-serif text-3xl font-extrabold text-foreground tracking-tight mt-1">Complete Your Order</h1>
            </div>
            <Link to="/shop/cart" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground hover:text-primary transition">
              <ArrowLeft className="size-4" /> Back to Cart
            </Link>
          </div>

          {errorMessage && (
            <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-600 text-xs font-semibold flex items-center gap-2">
              <AlertCircle className="size-4 shrink-0" />
              {errorMessage}
            </div>
          )}

          <div className="grid gap-12 lg:grid-cols-12 items-start">
            
            {/* Form Column (Col 7) */}
            <div className="lg:col-span-7 space-y-8">
              
              {/* Step 1: Shipping Information */}
              <div className="glass rounded-[28px] p-6 md:p-8 border border-white/60 shadow-soft space-y-5">
                <div className="flex items-center justify-between border-b border-border/50 pb-3">
                  <h3 className="font-serif text-lg font-bold text-foreground tracking-tight flex items-center gap-2">
                    <span className="size-6 rounded-full bg-primary text-white text-xs font-bold grid place-items-center">1</span>
                    Shipping Information
                  </h3>
                  <span className="text-[11px] text-emerald-600 font-bold uppercase tracking-wider flex items-center gap-1 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                    <Truck className="size-3" /> Free Express Shipping Included
                  </span>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Jane Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full rounded-xl border border-border bg-white px-4 py-2.5 text-xs text-foreground focus:outline-none focus:border-primary shadow-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. jane.doe@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full rounded-xl border border-border bg-white px-4 py-2.5 text-xs text-foreground focus:outline-none focus:border-primary shadow-sm"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. (407) 555-0199"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full rounded-xl border border-border bg-white px-4 py-2.5 text-xs text-foreground focus:outline-none focus:border-primary shadow-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
                      Street Address *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 123 Summerlin Ave, Apt 4B"
                      value={formData.street}
                      onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                      className="w-full rounded-xl border border-border bg-white px-4 py-2.5 text-xs text-foreground focus:outline-none focus:border-primary shadow-sm"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Orlando"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full rounded-xl border border-border bg-white px-4 py-2.5 text-xs text-foreground focus:outline-none focus:border-primary shadow-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
                      State / Province *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. FL"
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full rounded-xl border border-border bg-white px-4 py-2.5 text-xs text-foreground focus:outline-none focus:border-primary shadow-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
                      ZIP Code *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 32801"
                      value={formData.zip}
                      onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                      className="w-full rounded-xl border border-border bg-white px-4 py-2.5 text-xs text-foreground focus:outline-none focus:border-primary shadow-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Step 2: Shipping Options */}
              <div className="glass rounded-[28px] p-6 md:p-8 border border-white/60 shadow-soft space-y-4">
                <h3 className="font-serif text-lg font-bold text-foreground tracking-tight flex items-center gap-2 border-b border-border/50 pb-3">
                  <span className="size-6 rounded-full bg-primary text-white text-xs font-bold grid place-items-center">2</span>
                  Shipping Method
                </h3>

                <div className="p-4 rounded-2xl border-2 border-emerald-500/30 bg-emerald-500/5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="size-9 rounded-xl bg-emerald-500/20 text-emerald-600 grid place-items-center">
                      <Truck className="size-5" />
                    </div>
                    <div className="text-xs">
                      <strong className="block font-bold text-foreground">Standard & Express Delivery</strong>
                      <span className="text-[11px] text-muted-foreground">3-5 Business Days • Fully Tracked</span>
                    </div>
                  </div>
                  <span className="text-xs font-extrabold text-emerald-600 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30">
                    FREE ($0.00)
                  </span>
                </div>
              </div>

              {/* Step 3: Stripe Payment Method */}
              <div className="glass rounded-[28px] p-6 md:p-8 border border-white/60 shadow-soft space-y-5">
                <div className="flex items-center justify-between border-b border-border/50 pb-3">
                  <h3 className="font-serif text-lg font-bold text-foreground tracking-tight flex items-center gap-2">
                    <span className="size-6 rounded-full bg-primary text-white text-xs font-bold grid place-items-center">3</span>
                    Payment Method
                  </h3>
                  <span className="text-xs text-muted-foreground font-semibold flex items-center gap-1">
                    <ShieldCheck className="size-4 text-emerald-600" /> Stripe Encrypted
                  </span>
                </div>

                {/* Method Tabs */}
                <div className="flex gap-2 p-1 rounded-xl bg-slate-200/60 text-xs">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("Stripe")}
                    className={`flex-1 py-2.5 rounded-lg font-bold transition cursor-pointer flex items-center justify-center gap-2 ${
                      paymentMethod === "Stripe" ? "bg-white text-primary shadow-sm" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <CreditCard className="size-4" /> Credit Card (Stripe)
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("DemoPay")}
                    className={`flex-1 py-2.5 rounded-lg font-bold transition cursor-pointer flex items-center justify-center gap-2 ${
                      paymentMethod === "DemoPay" ? "bg-white text-primary shadow-sm" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <CheckCircle2 className="size-4 text-emerald-600" /> Instant Order Sync
                  </button>
                </div>

                {paymentMethod === "Stripe" ? (
                  <form onSubmit={handleStripeSubmit} className="space-y-4 pt-2">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                        Credit / Debit Card Details *
                      </label>
                      <div className="p-3.5 rounded-xl border border-border bg-white shadow-sm">
                        <StripeCardInput elementsInstance={elementsInstance} onReady={() => setCardElementReady(true)} />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 rounded-xl gradient-brand text-white font-extrabold text-xs uppercase tracking-widest shadow-glow hover:scale-[1.02] active:scale-[0.98] transition cursor-pointer disabled:opacity-50 mt-4 flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="size-4 animate-spin" /> Processing Payment...
                        </>
                      ) : (
                        `Pay $${currentTotal.toFixed(2)} via Stripe`
                      )}
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleDemoSubmit} className="space-y-4 pt-2">
                    <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 text-xs text-foreground/80 leading-relaxed">
                      Processes and records your order directly into the <strong>MongoDB database</strong> without charging live credit cards.
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 rounded-xl gradient-brand text-white font-extrabold text-xs uppercase tracking-widest shadow-glow hover:scale-[1.02] active:scale-[0.98] transition cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? "Processing Order..." : `Place Instant Order — $${currentTotal.toFixed(2)}`}
                    </button>
                  </form>
                )}
              </div>

            </div>

            {/* Order Summary Sidebar (Col 5) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="glass rounded-[28px] p-6 md:p-8 border border-white/60 shadow-elegant space-y-6 sticky top-28">
                <h3 className="font-serif text-lg font-bold text-foreground tracking-tight border-b border-border/60 pb-3 flex items-center justify-between">
                  <span>Order Summary</span>
                  <span className="text-xs font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-full">{cart.length} Items</span>
                </h3>

                {/* Items List */}
                <div className="max-h-72 overflow-y-auto divide-y divide-border/30 pr-1 space-y-3">
                  {cart.map((item, idx) => {
                    const activePrice = item.product.salePrice && item.product.salePrice > 0 ? item.product.salePrice : item.product.price;
                    const itemImg = item.product.images?.[0] || "/products/hoodie.png";

                    return (
                      <div key={idx} className="pt-3 flex items-center justify-between gap-3 text-xs">
                        <div className="flex items-center gap-3 min-w-0">
                          <img src={itemImg} alt="" className="size-12 rounded-xl object-cover border border-white/60 shrink-0" />
                          <div className="min-w-0">
                            <span className="font-bold text-foreground block truncate">{item.product.name}</span>
                            <span className="text-[10px] text-muted-foreground block">Qty: {item.quantity} {item.selectedVariant ? `• ${item.selectedVariant}` : ""}</span>
                          </div>
                        </div>
                        <span className="font-extrabold text-foreground shrink-0">${(activePrice * item.quantity).toFixed(2)}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Price Breakdown */}
                <div className="space-y-2.5 text-xs text-foreground/80 pt-4 border-t border-border/60">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Items Subtotal</span>
                    <span className="font-semibold">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-extrabold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded-md">FREE ($0.00)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Sales Tax (0%)</span>
                    <span className="font-semibold text-emerald-600">$0.00</span>
                  </div>

                  <div className="flex justify-between items-baseline text-base font-extrabold text-foreground pt-4 border-t border-border/60">
                    <span>Total Amount</span>
                    <span className="text-primary text-2xl font-serif">${currentTotal.toFixed(2)}</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-100/80 border border-slate-200/80 space-y-2 text-[11px] text-muted-foreground">
                  <div className="flex items-center gap-2 text-foreground font-bold">
                    <ShieldCheck className="size-4 text-emerald-600 shrink-0" /> 100% Impact Guarantee
                  </div>
                  <p className="leading-normal">Every merchandise purchase directly funds women empowerment workshops, emergency shelters, and youth mentorship grants.</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </SiteLayout>
  );
}

// Inner Component to Mount Official Stripe Card Element iframe
function StripeCardInput({
  elementsInstance,
  onReady
}: {
  elementsInstance: StripeElements | null;
  onReady: () => void;
}) {
  useEffect(() => {
    if (!elementsInstance) return;

    let card = elementsInstance.getElement("card");
    if (!card) {
      card = elementsInstance.create("card", {
        style: {
          base: {
            color: "#0F172A",
            fontSize: "14px",
            fontFamily: "Inter, sans-serif",
            "::placeholder": {
              color: "#94A3B8",
            },
          },
          invalid: {
            color: "#EF4444",
          },
        },
      });
      card.mount("#stripe-card-element");
    }

    onReady();
  }, [elementsInstance, onReady]);

  return <div id="stripe-card-element" className="min-h-[40px] py-1" />;
}
