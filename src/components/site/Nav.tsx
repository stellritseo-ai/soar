import { Link, useLocation } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, ChevronDown, ShoppingBag } from "lucide-react";
import logoImg from "@/assets/logo.png";
import { useCart } from "@/lib/cart";
import { CartDrawer } from "./CartDrawer";

type SubMenuItem = {
  to: string;
  label: string;
};

type MenuItem = {
  label: string;
  to?: string;
  children?: SubMenuItem[];
};

const menuItems: MenuItem[] = [
  {
    label: "About Us",
    children: [
      { to: "/our-story", label: "Our Story" },
      { to: "/meet-our-team", label: "Meet Our Team" },
    ],
  },
  {
    label: "What We Do",
    children: [
      { to: "/how-we-work", label: "How We Work" },
    ],
  },
  {
    label: "Our Impact",
    children: [
      { to: "/our-impact", label: "Our Impact" },
    ],
  },
  {
    label: "Get Involved",
    children: [
      { to: "/ways-to-give", label: "Ways to Give" },
      { to: "/volunteer", label: "Volunteer" },
    ],
  },
  {
    label: "News & Events",
    children: [
      { to: "/news-and-events", label: "News & Events" },
      { to: "/events", label: "Events" },
    ],
  },
  {
    to: "/shop",
    label: "Shop",
  },
  {
    to: "/contact",
    label: "Contact Us",
  },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<number | null>(null);
  const location = useLocation();
  const { cartCount, setIsCartOpen } = useCart();

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20);
    on();
    window.addEventListener("scroll", on);
    return () => {
      window.removeEventListener("scroll", on);
    };
  }, []);

  const isItemActive = (item: MenuItem) => {
    if (item.to) {
      return location.pathname === item.to;
    }
    return item.children?.some((child) => location.pathname === child.to.split("#")[0]);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled
        ? "bg-background/95 border-b border-border/80 shadow-sm py-1"
        : "bg-background/85 border-b border-border/40 py-2"
        } backdrop-blur-md`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-10">
        {/* LOGO */}
        <Link to="/" className="group flex items-center">
          <img
            src={logoImg}
            alt="SOAR Logo"
            className="h-20 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.03]"
          />
        </Link>

        {/* DESKTOP NAV WITH DROPDOWNS */}
        <div className="hidden items-center gap-1 xl:flex ml-auto mr-12">
          {menuItems.map((item, idx) => {
            const active = isItemActive(item);

            if (item.children) {
              return (
                <div key={item.label} className="relative group py-2">
                  <button
                    className={`flex items-center gap-1 px-3.5 py-2 text-sm font-semibold transition-colors duration-200 ${active ? "text-primary" : "text-foreground/75 hover:text-primary"
                      }`}
                  >
                    {item.label}
                    <ChevronDown className="size-3 transition-transform duration-200 group-hover:rotate-180" />
                  </button>
                  {/* Dropdown panel */}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 pt-2 z-50">
                    <div className="bg-background/70 backdrop-blur-xl rounded-2xl border border-border/60 shadow-elegant p-1.5 min-w-[200px] flex flex-col">
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          to={child.to}
                          className="px-4 py-2 text-xs font-semibold text-foreground/75 hover:text-primary hover:bg-secondary rounded-xl transition-colors duration-200"
                          activeProps={{ className: "text-primary bg-secondary" }}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={item.label}
                to={item.to!}
                className={`px-3.5 py-2 text-sm font-semibold transition-colors duration-200 ${active ? "text-primary" : "text-foreground/75 hover:text-primary"
                  }`}
                activeOptions={{ exact: item.to === "/" }}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* RIGHT SIDE BUTTONS */}
        <div className="hidden items-center gap-4 lg:flex">
          {/* Shopping Cart Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative grid size-10 place-items-center rounded-full border border-border bg-background/60 hover:bg-secondary hover:border-primary/40 text-foreground transition cursor-pointer group"
            title="View Shopping Cart"
          >
            <ShoppingBag className="size-5 transition-transform group-hover:scale-110" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 size-5 rounded-full bg-gradient-to-tr from-[#5E2B97] to-[#D4AF37] text-white font-extrabold text-[10px] grid place-items-center shadow-md animate-scaleUp">
                {cartCount}
              </span>
            )}
          </button>

          <Link
            to="/donate"
            className="inline-flex items-center justify-center rounded-full gradient-brand px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-elegant hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
          >
            Donate Now
          </Link>
        </div>

        {/* MOBILE MENU TOGGLE WITH DONATE & CART BUTTON */}
        <div className="flex items-center gap-2.5 lg:hidden">
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative grid size-10 place-items-center rounded-full border border-input bg-background/50 hover:bg-secondary text-foreground transition cursor-pointer"
            title="View Cart"
          >
            <ShoppingBag className="size-4" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 size-4.5 rounded-full bg-gradient-to-tr from-[#5E2B97] to-[#D4AF37] text-white font-extrabold text-[9px] grid place-items-center shadow-md">
                {cartCount}
              </span>
            )}
          </button>

          <Link
            to="/donate"
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F2D27C] text-[#0C1220] font-bold h-10 px-4 text-xs shadow-soft transition-all duration-200 hover:scale-[1.02] active:scale-[0.97]"
          >
            Donate
          </Link>

          <button
            className="grid size-10 place-items-center rounded-full border border-input bg-background/50 hover:bg-secondary transition cursor-pointer"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </nav>

      {/* MOBILE NAV OVERLAY */}
      {open && (
        <div className="border-t border-border/60 bg-background/95 backdrop-blur-xl px-6 pb-8 pt-4 lg:hidden max-h-[85vh] overflow-y-auto shadow-elegant">
          <div className="flex flex-col gap-1.5">
            {menuItems.map((item, idx) => {
              const active = isItemActive(item);
              const isExpanded = mobileExpanded === idx;

              if (item.children) {
                return (
                  <div key={item.label} className="flex flex-col">
                    <button
                      onClick={() => setMobileExpanded(isExpanded ? null : idx)}
                      className={`flex items-center justify-between w-full rounded-[10px] px-4 py-3 text-base font-bold transition-colors ${active ? "text-primary bg-secondary/50" : "text-foreground/80 hover:bg-secondary/30"
                        }`}
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        className={`size-4 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
                      />
                    </button>
                    {isExpanded && (
                      <div className="pl-4 flex flex-col gap-1 border-l border-border/60 ml-6 mt-1 mb-2">
                        {item.children.map((child) => (
                          <Link
                            key={child.label}
                            to={child.to}
                            onClick={() => setOpen(false)}
                            className="rounded-[8px] px-3 py-2 text-sm font-semibold text-foreground/75 hover:text-primary transition-colors"
                            activeProps={{ className: "text-primary font-bold" }}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={item.label}
                  to={item.to!}
                  onClick={() => setOpen(false)}
                  className="rounded-[10px] px-4 py-3 text-base font-bold text-foreground/80 hover:bg-secondary hover:text-primary transition-colors"
                  activeProps={{ className: "text-primary bg-secondary/50" }}
                >
                  {item.label}
                </Link>
              );
            })}
            <div className="border-t border-border/40 my-3 pt-3 flex flex-col gap-3">
              <Link
                to="/donate"
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F2D27C] text-[#0C1220] font-bold px-5 py-3.5 text-sm shadow-elegant hover:scale-[1.02] active:scale-[0.97] transition duration-200"
              >
                Donate Now
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}



