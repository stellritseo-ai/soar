import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { CheckCircle2, ShoppingBag, ArrowRight, Printer, ShieldCheck } from "lucide-react";

type OrderSuccessSearch = {
  orderNumber?: string;
  total?: string;
  email?: string;
};

export const Route = createFileRoute("/shop/order-success")({
  validateSearch: (search: Record<string, unknown>): OrderSuccessSearch => {
    return {
      orderNumber: (search.orderNumber as string) || undefined,
      total: (search.total as string) || undefined,
      email: (search.email as string) || undefined,
    };
  },
  head: () => ({
    meta: [
      { title: "Order Confirmed — SOAR Store" },
    ],
  }),
  component: OrderSuccessPage,
});

function OrderSuccessPage() {
  const search = Route.useSearch();
  const orderNumber = search.orderNumber || "SOAR-1003";
  const total = search.total ? parseFloat(search.total) : 107.00;
  const email = search.email || "customer@example.com";

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <SiteLayout>
      <div className="bg-gradient-to-b from-background via-[#FDFBF7] to-[#F3F0F8]/40 min-h-screen pt-28 pb-24 flex items-center">
        <div className="mx-auto max-w-2xl px-6 w-full space-y-8">
          
          <div className="glass rounded-[36px] p-8 md:p-12 border border-white/60 shadow-2xl text-center space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 size-32 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="size-20 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 grid place-items-center mx-auto shadow-inner">
              <CheckCircle2 className="size-10 animate-bounce" />
            </div>

            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600">Order Successfully Placed</span>
              <h1 className="font-serif text-3xl font-extrabold text-foreground tracking-tight mt-1">Thank You for Your Order!</h1>
              <p className="text-xs text-muted-foreground mt-2 max-w-md mx-auto leading-relaxed">
                Your order <strong className="text-foreground">{orderNumber}</strong> has been confirmed. A confirmation receipt has been sent to <strong className="text-foreground">{email}</strong>.
              </p>
            </div>

            {/* Receipt Summary Card */}
            <div className="p-6 rounded-2xl bg-white/70 border border-border/50 text-left text-xs space-y-3 shadow-sm">
              <div className="flex justify-between border-b border-border/40 pb-3 font-bold text-foreground">
                <span>Order Reference:</span>
                <span className="text-primary font-mono">{orderNumber}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Estimated Delivery:</span>
                <span className="font-semibold text-foreground">3-5 Business Days</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Payment Status:</span>
                <span className="font-semibold text-emerald-600">Paid & Verified</span>
              </div>
              <div className="flex justify-between border-t border-border/40 pt-3 text-sm font-extrabold text-foreground">
                <span>Total Amount Charged:</span>
                <span className="text-primary">${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Impact Note */}
            <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 text-xs text-foreground/80 flex items-center gap-3 text-left">
              <ShieldCheck className="size-6 text-primary shrink-0" />
              <span>
                <strong>Your Impact:</strong> 100% of proceeds from this order directly fund SOAR's homeownership mentorship tracks and emergency sisterhood grants.
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap justify-center gap-4 pt-2">
              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-6 py-3 text-xs font-bold uppercase tracking-wider text-foreground hover:bg-slate-50 transition shadow-sm cursor-pointer"
              >
                <Printer className="size-4" /> Print Receipt
              </button>
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 rounded-full gradient-brand px-8 py-3 text-xs font-bold uppercase tracking-widest text-white shadow-soft hover:scale-105 transition cursor-pointer"
              >
                Continue Shopping <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </SiteLayout>
  );
}
