import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { SiteLayout } from "@/components/site/Layout";
import { PageHeader } from "@/components/site/PageHeader";
import { useProducts, type ProductType } from "@/lib/cms";
import { useCart } from "@/lib/cart";
import { Search, ShoppingBag, Heart, Star, Sparkles, Filter, CheckCircle2, ArrowRight } from "lucide-react";
import heroImg from "@/assets/program-mentor.jpg";

export const Route = createFileRoute("/shop/")({
  head: () => ({
    meta: [
      { title: "Official Shop — SOAR Global Foundation" },
      { name: "description", content: "Shop official SOAR Global Foundation apparel, jewelry, accessories, and gifts. 100% of proceeds support women's homeownership programs." },
      { property: "og:title", content: "Official Shop — SOAR Global Foundation" },
      { property: "og:url", content: "/shop" },
    ],
    links: [{ rel: "canonical", href: "/shop" }],
  }),
  component: ShopStorefront,
});

const CATEGORIES = ["All Items", "Apparel", "Accessories", "Jewelry", "Home & Gift", "Books & Stationery"];

function ShopStorefront() {
  const { data: products, isLoading } = useProducts();
  const { addToCart, toggleWishlist, isInWishlist } = useCart();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Items");
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "rating">("featured");
  const [addedNotice, setAddedNotice] = useState<string | null>(null);

  const filteredProducts = useMemo(() => {
    if (!products) return [];
    return products.filter((p) => {
      if (p.status !== "Published") return false;
      const matchesCategory = selectedCategory === "All Items" || p.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.shortDescription && p.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === "price-asc") return (a.salePrice || a.price) - (b.salePrice || b.price);
      if (sortBy === "price-desc") return (b.salePrice || b.price) - (a.salePrice || a.price);
      if (sortBy === "rating") return b.rating - a.rating;
      // Default: featured first
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [products, selectedCategory, searchQuery, sortBy]);

  const featuredProducts = useMemo(() => {
    if (!products) return [];
    return products.filter((p) => p.isFeatured && p.status === "Published");
  }, [products]);

  const handleQuickAdd = (p: ProductType, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const defaultVariant = p.variants?.[0] ? `${p.variants[0].name}: ${p.variants[0].options[0]}` : undefined;
    addToCart(p, 1, defaultVariant);
    setAddedNotice(p.name);
    setTimeout(() => setAddedNotice(null), 3000);
  };

  return (
    <SiteLayout>
      <div className="bg-gradient-to-b from-background via-[#FDFBF7] to-[#F3F0F8]/40 min-h-screen pb-24">
        {/* Page Header */}
        <PageHeader
          eyebrow="Official SOAR Store"
          title={<>Wear the Mission. <span className="text-gradient-brand italic font-extrabold">Empower a Sister</span>.</>}
          subtitle="Every purchase directly funds SOAR's homeownership mentorship, financial literacy workshops, and sisterhood grants for women overcoming adversity."
          bgImage={heroImg}
        />

        {/* Added to Cart Notification Banner */}
        {addedNotice && (
          <div className="fixed bottom-6 right-6 z-50 bg-[#0C1220] text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-[#D4AF37]/40 flex items-center gap-3 animate-slideUp">
            <CheckCircle2 className="size-5 text-[#D4AF37]" />
            <div className="text-xs">
              <strong className="block text-white">Added to Cart!</strong>
              <span className="text-white/70 truncate max-w-[200px] block">{addedNotice}</span>
            </div>
          </div>
        )}

        <div className="mx-auto max-w-[95%] px-6 lg:px-10 mt-[40px] space-y-16">
          
          {/* Featured Spotlight Grid */}
          {featuredProducts.length > 0 && selectedCategory === "All Items" && !searchQuery && (
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <Sparkles className="size-5 text-primary" />
                <h2 className="font-display text-2xl font-extrabold tracking-tight text-foreground">Featured Merchandise</h2>
              </div>

              <div className="grid gap-6 md:grid-cols-3">
                {featuredProducts.slice(0, 3).map((product) => {
                  const activePrice = product.salePrice && product.salePrice > 0 ? product.salePrice : product.price;
                  const img = product.images?.[0] || "/products/hoodie.png";
                  const inWish = isInWishlist(product.id);

                  return (
                    <div
                      key={product.id}
                      className="group relative rounded-[28px] glass border border-white/60 p-5 shadow-soft hover:shadow-elegant hover:border-primary/30 transition-all duration-300 flex flex-col justify-between overflow-hidden"
                    >
                      {/* Top Badges */}
                      <div className="absolute top-8 left-8 z-10 flex flex-col gap-1.5 items-start">
                        <span className="rounded-full bg-gradient-to-r from-primary to-[#3A0A63] px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest text-white shadow-md">
                          Featured
                        </span>
                        {product.salePrice && (
                          <span className="rounded-full bg-[#D4AF37] px-3 py-0.5 text-[10px] font-extrabold uppercase tracking-widest text-[#0C1220]">
                            Sale
                          </span>
                        )}
                      </div>

                      {/* Wishlist Toggle */}
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          toggleWishlist(product.id);
                        }}
                        className="absolute top-8 right-8 z-10 grid size-9 place-items-center rounded-full bg-white/80 backdrop-blur-md border border-white text-muted-foreground hover:text-red-500 transition shadow-sm cursor-pointer"
                        title={inWish ? "Remove from wishlist" : "Add to wishlist"}
                      >
                        <Heart className={`size-4 ${inWish ? "fill-red-500 text-red-500" : ""}`} />
                      </button>

                      {/* Image Area */}
                      <Link to={`/shop/$slug`} params={{ slug: product.slug }} className="block overflow-hidden rounded-[20px] bg-slate-100/60 aspect-square relative">
                        <img
                          src={img}
                          alt={product.name}
                          className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </Link>

                      {/* Content */}
                      <div className="mt-5 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-primary">{product.category}</span>
                          <div className="flex items-center gap-1 text-xs text-amber-500 font-bold">
                            <Star className="size-3.5 fill-current" />
                            <span>{product.rating}</span>
                            <span className="text-muted-foreground font-normal">({product.numReviews})</span>
                          </div>
                        </div>

                        <Link to={`/shop/$slug`} params={{ slug: product.slug }}>
                          <h3 className="font-serif text-lg font-bold text-foreground group-hover:text-primary transition leading-snug line-clamp-1">
                            {product.name}
                          </h3>
                        </Link>
                        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                          {product.shortDescription}
                        </p>

                        {/* Price & Action */}
                        <div className="flex items-center justify-between pt-3 border-t border-border/50">
                          <div className="flex items-baseline gap-2">
                            <span className="text-lg font-extrabold text-foreground">${activePrice.toFixed(2)}</span>
                            {product.salePrice && (
                              <span className="text-xs text-muted-foreground line-through">${product.price.toFixed(2)}</span>
                            )}
                          </div>

                          <button
                            onClick={(e) => handleQuickAdd(product, e)}
                            className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 hover:bg-primary text-primary hover:text-white px-4 py-2 text-xs font-bold transition-all cursor-pointer"
                          >
                            <ShoppingBag className="size-3.5" />
                            <span>Add</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Search, Filter Bar & Controls */}
          <div className="glass rounded-[28px] p-6 border border-white/60 shadow-soft space-y-6">
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
              {/* Search input */}
              <div className="relative w-full md:w-96">
                <Search className="absolute left-4 top-3.5 size-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search merchandise..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-full border border-border bg-white/70 text-xs text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition"
                />
              </div>

              {/* Sort Selector */}
              <div className="flex items-center gap-2 w-full md:w-auto">
                <Filter className="size-4 text-primary shrink-0" />
                <span className="text-xs font-bold text-foreground uppercase tracking-wider shrink-0">Sort By:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="rounded-full border border-border bg-white px-4 py-2.5 text-xs font-semibold text-foreground focus:outline-none focus:border-primary cursor-pointer w-full md:w-auto"
                >
                  <option value="featured">Featured First</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap items-center gap-2 border-t border-border/40 pt-4">
              {CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`rounded-full px-4 py-2 text-xs font-bold transition-all cursor-pointer ${
                      isActive
                        ? "gradient-brand text-white shadow-md scale-105"
                        : "bg-white/80 border border-border text-foreground/75 hover:bg-white hover:text-primary"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* All Products Grid */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl font-extrabold text-foreground tracking-tight">
                {selectedCategory === "All Items" ? "All Merchandise" : selectedCategory} {isLoading ? "(...)" : `(${filteredProducts.length})`}
              </h2>
            </div>

            {isLoading ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {[1, 2, 3, 4].map((n) => (
                  <div key={n} className="rounded-[24px] bg-slate-200/50 aspect-square animate-pulse" />
                ))}
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="glass rounded-[32px] p-12 text-center border border-white/60 space-y-4 max-w-lg mx-auto">
                <ShoppingBag className="size-12 mx-auto text-muted-foreground/40" />
                <h3 className="font-bold text-lg text-foreground">No merchandise found</h3>
                <p className="text-xs text-muted-foreground">
                  Try adjusting your search criteria or selecting a different category.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("All Items");
                  }}
                  className="rounded-full bg-primary text-white px-5 py-2 text-xs font-bold uppercase tracking-wider"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {filteredProducts.map((product) => {
                  const activePrice = product.salePrice && product.salePrice > 0 ? product.salePrice : product.price;
                  const img = product.images?.[0] || "/products/hoodie.png";
                  const inWish = isInWishlist(product.id);

                  return (
                    <div
                      key={product.id}
                      className="group rounded-[24px] glass border border-white/60 p-4 shadow-soft hover:shadow-elegant hover:border-primary/30 transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
                    >
                      {/* Wishlist toggle */}
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          toggleWishlist(product.id);
                        }}
                        className="absolute top-6 right-6 z-10 grid size-8 place-items-center rounded-full bg-white/80 backdrop-blur-md text-muted-foreground hover:text-red-500 transition shadow-sm cursor-pointer"
                      >
                        <Heart className={`size-3.5 ${inWish ? "fill-red-500 text-red-500" : ""}`} />
                      </button>

                      {/* Product Image */}
                      <Link to={`/shop/$slug`} params={{ slug: product.slug }} className="block overflow-hidden rounded-[18px] bg-slate-100/60 aspect-square relative">
                        <img
                          src={img}
                          alt={product.name}
                          className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        {product.stock <= 10 && product.stock > 0 && (
                          <span className="absolute bottom-2 left-2 bg-amber-500 text-white font-extrabold text-[9px] uppercase px-2 py-0.5 rounded-full shadow">
                            Only {product.stock} Left
                          </span>
                        )}
                      </Link>

                      {/* Content */}
                      <div className="mt-4 space-y-2 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between text-[10px] text-muted-foreground mb-1">
                            <span className="font-bold text-primary uppercase tracking-wider">{product.category}</span>
                            <div className="flex items-center gap-0.5 text-amber-500 font-bold">
                              <Star className="size-3 fill-current" />
                              <span>{product.rating}</span>
                            </div>
                          </div>

                          <Link to={`/shop/$slug`} params={{ slug: product.slug }}>
                            <h3 className="font-serif text-sm font-bold text-foreground group-hover:text-primary transition line-clamp-1">
                              {product.name}
                            </h3>
                          </Link>
                          <p className="text-[11px] text-muted-foreground line-clamp-2 mt-1 leading-relaxed">
                            {product.shortDescription}
                          </p>
                        </div>

                        {/* Footer Price & Add */}
                        <div className="flex items-center justify-between pt-3 border-t border-border/40 mt-3">
                          <div className="flex items-baseline gap-1.5">
                            <span className="text-base font-extrabold text-foreground">${activePrice.toFixed(2)}</span>
                            {product.salePrice && (
                              <span className="text-[10px] text-muted-foreground line-through">${product.price.toFixed(2)}</span>
                            )}
                          </div>

                          <button
                            onClick={(e) => handleQuickAdd(product, e)}
                            className="inline-flex items-center gap-1 rounded-full bg-primary/10 hover:bg-primary text-primary hover:text-white px-3 py-1.5 text-[11px] font-bold transition cursor-pointer"
                          >
                            <ShoppingBag className="size-3" />
                            <span>Add</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Guarantee / Impact Banner */}
          <div className="rounded-[32px] bg-gradient-to-r from-primary to-[#3A0A63] text-white p-8 md:p-12 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-3 text-center md:text-left max-w-xl">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#D4AF37]">100% Impact Guarantee</span>
              <h3 className="font-display text-2xl md:text-3xl font-extrabold tracking-tight">Every Purchase Builds a Home Pathway</h3>
              <p className="text-xs text-white/80 leading-relaxed">
                When you wear or gift official SOAR merchandise, 100% of net proceeds are directly allocated to our homeownership education grants, financial literacy bootcamps, and sisterhood emergency funds.
              </p>
            </div>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F2D27C] text-[#0C1220] font-extrabold px-6 py-3.5 text-xs uppercase tracking-widest hover:scale-105 transition shadow-glow shrink-0"
            >
              Learn Our Mission <ArrowRight className="size-4" />
            </Link>
          </div>

        </div>
      </div>
    </SiteLayout>
  );
}
