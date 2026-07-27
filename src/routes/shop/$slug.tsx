import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/site/Layout";
import { useProductBySlug, useProducts, addProductReviewFn, type ProductType } from "@/lib/cms";
import { useCart } from "@/lib/cart";
import { Star, Heart, ShoppingBag, ArrowRight, CheckCircle2, Shield, Truck, RefreshCw, ChevronLeft, ThumbsUp, Send } from "lucide-react";

export const Route = createFileRoute("/shop/$slug")({
  component: ProductDetailPage,
});

function ProductDetailPage() {
  const { slug } = Route.useParams();
  const navigate = useNavigate();
  const { data: product, isLoading, refetch } = useProductBySlug(slug);
  const { data: allProducts } = useProducts();
  const { addToCart, toggleWishlist, isInWishlist } = useCart();

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"desc" | "specs" | "reviews">("desc");
  const [addedNotice, setAddedNotice] = useState(false);

  // Review Form State
  const [reviewName, setReviewName] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [reviewSuccess, setReviewSuccess] = useState(false);

  if (isLoading) {
    return (
      <SiteLayout>
        <div className="min-h-[70vh] flex items-center justify-center">
          <div className="size-12 rounded-full border-4 border-primary border-t-transparent animate-spin" />
        </div>
      </SiteLayout>
    );
  }

  if (!product) {
    return (
      <SiteLayout>
        <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6 space-y-4">
          <h2 className="font-display text-3xl font-bold text-foreground">Product Not Found</h2>
          <p className="text-muted-foreground text-sm">The merchandise item you are looking for does not exist or has been removed.</p>
          <Link to="/shop" className="rounded-full bg-primary text-white px-6 py-2.5 text-xs font-bold uppercase tracking-wider">
            Return to Shop
          </Link>
        </div>
      </SiteLayout>
    );
  }

  const activePrice = product.salePrice && product.salePrice > 0 ? product.salePrice : product.price;
  const inWish = isInWishlist(product.id);
  const images = product.images && product.images.length > 0 ? product.images : ["/products/hoodie.png"];

  const handleVariantSelect = (variantName: string, optionValue: string) => {
    setSelectedVariants((prev) => ({ ...prev, [variantName]: optionValue }));
  };

  const getVariantString = () => {
    if (Object.keys(selectedVariants).length === 0) return undefined;
    return Object.entries(selectedVariants)
      .map(([k, v]) => `${k}: ${v}`)
      .join(", ");
  };

  const handleAddToCart = () => {
    addToCart(product, quantity, getVariantString());
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 3000);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, getVariantString());
    navigate({ to: "/shop/checkout" });
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewName || !reviewComment) return;
    setIsSubmittingReview(true);
    try {
      await addProductReviewFn({
        data: {
          slug: product.slug,
          user: reviewName,
          rating: reviewRating,
          comment: reviewComment,
        },
      });
      setReviewSuccess(true);
      setReviewName("");
      setReviewComment("");
      refetch();
      setTimeout(() => setReviewSuccess(false), 4000);
    } catch (err) {
      console.error("Failed to submit review", err);
    } finally {
      setIsSubmittingReview(false);
    }
  };

  const relatedProducts = (allProducts || []).filter((p) => p.id !== product.id && p.category === product.category).slice(0, 4);

  return (
    <SiteLayout>
      <div className="bg-gradient-to-b from-background via-[#FDFBF7] to-[#F3F0F8]/40 min-h-screen pt-28 pb-24">
        
        {/* Added Notification Toast */}
        {addedNotice && (
          <div className="fixed bottom-6 right-6 z-50 bg-[#0C1220] text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-[#D4AF37]/40 flex items-center gap-3 animate-slideUp">
            <CheckCircle2 className="size-5 text-[#D4AF37]" />
            <div className="text-xs">
              <strong className="block text-white">Added to Cart!</strong>
              <span className="text-white/70">{quantity}x {product.name}</span>
            </div>
          </div>
        )}

        <div className="mx-auto max-w-7xl px-6 lg:px-10 space-y-12">
          
          {/* Back to Shop Link */}
          <Link to="/shop" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground hover:text-primary transition">
            <ChevronLeft className="size-4" /> Back to Storefront
          </Link>

          {/* Product Details Split Card */}
          <div className="grid gap-12 lg:grid-cols-12 items-start">
            
            {/* Left Image Gallery (Col 6) */}
            <div className="lg:col-span-6 space-y-4">
              <div className="relative aspect-square w-full rounded-[32px] overflow-hidden glass border border-white/60 shadow-elegant bg-white/50 group">
                <img
                  src={images[selectedImageIndex] || images[0]}
                  alt={product.name}
                  className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Badges */}
                <div className="absolute top-6 left-6 flex flex-col gap-2 z-10">
                  {product.salePrice && (
                    <span className="rounded-full bg-[#D4AF37] px-3.5 py-1 text-xs font-extrabold uppercase tracking-widest text-[#0C1220] shadow-md">
                      On Sale
                    </span>
                  )}
                  {product.isFeatured && (
                    <span className="rounded-full bg-primary px-3.5 py-1 text-xs font-extrabold uppercase tracking-widest text-white shadow-md">
                      Featured
                    </span>
                  )}
                </div>

                {/* Wishlist Button */}
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className="absolute top-6 right-6 z-10 grid size-10 place-items-center rounded-full bg-white/80 backdrop-blur-md border border-white text-muted-foreground hover:text-red-500 transition shadow-md cursor-pointer"
                >
                  <Heart className={`size-5 ${inWish ? "fill-red-500 text-red-500" : ""}`} />
                </button>
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`size-20 rounded-2xl overflow-hidden border-2 transition cursor-pointer shrink-0 ${
                        selectedImageIndex === idx ? "border-primary shadow-md scale-105" : "border-white/60 opacity-70 hover:opacity-100"
                      }`}
                    >
                      <img src={img} alt="" className="size-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right Details (Col 6) */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-extrabold uppercase tracking-widest">
                    {product.category}
                  </span>
                  <span className="text-xs font-medium text-muted-foreground">SKU: {product.sku || "N/A"}</span>
                </div>

                <h1 className="font-serif text-3xl md:text-4xl font-extrabold text-foreground tracking-tight leading-tight">
                  {product.name}
                </h1>

                {/* Rating */}
                <div className="flex items-center gap-2 mt-3 text-sm">
                  <div className="flex text-amber-500">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className={`size-4 ${s <= Math.round(product.rating) ? "fill-current" : "text-slate-300"}`} />
                    ))}
                  </div>
                  <span className="font-bold text-foreground">{product.rating}</span>
                  <button onClick={() => setActiveTab("reviews")} className="text-muted-foreground hover:underline text-xs">
                    ({product.numReviews} customer reviews)
                  </button>
                </div>
              </div>

              {/* Pricing */}
              <div className="flex items-baseline gap-3 p-4 rounded-2xl bg-primary/5 border border-primary/10 w-fit">
                <span className="text-3xl font-extrabold text-foreground">${activePrice.toFixed(2)}</span>
                {product.salePrice && (
                  <span className="text-base text-muted-foreground line-through">${product.price.toFixed(2)}</span>
                )}
                {product.salePrice && (
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full">
                    Save ${(product.price - product.salePrice).toFixed(2)}
                  </span>
                )}
              </div>

              {/* Short Description */}
              <p className="text-sm text-muted-foreground leading-relaxed">
                {product.shortDescription}
              </p>

              {/* Variants Selector (Only for Cloth / Apparel, disabled for Books) */}
              {product.variants && product.variants.length > 0 && product.category !== "Books" && !product.category.toLowerCase().includes("book") && (
                <div className="space-y-4 border-t border-b border-border/50 py-4">
                  {product.variants.map((v) => (
                    <div key={v.name} className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-foreground">
                        Select {v.name}: <span className="text-primary font-normal">{selectedVariants[v.name] || "Choose one"}</span>
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {v.options.map((opt) => {
                          const isSelected = selectedVariants[v.name] === opt;
                          return (
                            <button
                              key={opt}
                              onClick={() => handleVariantSelect(v.name, opt)}
                              className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                                isSelected
                                  ? "bg-primary text-white shadow-md border border-primary"
                                  : "bg-white border border-border text-foreground hover:border-primary/40"
                              }`}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Stock Status & Quantity Controls */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold">
                    <span className={`size-2.5 rounded-full ${product.stock > 0 ? "bg-emerald-500" : "bg-red-500"}`} />
                    <span>{product.stock > 0 ? `In Stock (${product.stock} available)` : "Out of Stock"}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 items-center">
                  {/* Quantity selector */}
                  <div className="flex items-center border border-border rounded-xl bg-white p-1 shadow-sm">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-2 text-xs font-bold text-foreground hover:text-primary"
                    >
                      -
                    </button>
                    <span className="px-3 py-2 text-xs font-extrabold text-foreground min-w-[24px] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-2 text-xs font-bold text-foreground hover:text-primary"
                    >
                      +
                    </button>
                  </div>

                  {/* Add to Cart */}
                  <button
                    onClick={handleAddToCart}
                    disabled={product.stock <= 0}
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl gradient-brand px-6 py-3.5 text-xs font-bold uppercase tracking-widest text-white shadow-soft hover:scale-[1.02] active:scale-[0.98] transition cursor-pointer disabled:opacity-50"
                  >
                    <ShoppingBag className="size-4" />
                    Add to Cart
                  </button>

                  {/* Buy Now */}
                  <button
                    onClick={handleBuyNow}
                    disabled={product.stock <= 0}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F2D27C] text-[#0C1220] font-extrabold px-6 py-3.5 text-xs uppercase tracking-widest shadow-glow hover:scale-[1.02] active:scale-[0.98] transition cursor-pointer disabled:opacity-50"
                  >
                    Buy Now
                  </button>
                </div>
              </div>

              {/* Guarantees Box */}
              <div className="grid grid-cols-3 gap-3 pt-4 text-[10px] text-muted-foreground border-t border-border/40">
                <div className="flex items-center gap-2">
                  <Truck className="size-4 text-primary shrink-0" />
                  <span>Free Shipping over $75</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="size-4 text-primary shrink-0" />
                  <span>100% Impact Guarantee</span>
                </div>
                <div className="flex items-center gap-2">
                  <RefreshCw className="size-4 text-primary shrink-0" />
                  <span>30-Day Easy Returns</span>
                </div>
              </div>

            </div>
          </div>

          {/* Product Tabs (Description, Specs, Reviews) */}
          <div className="glass rounded-[32px] p-6 md:p-10 border border-white/60 shadow-soft space-y-8">
            <div className="flex border-b border-border/60 gap-8 overflow-x-auto">
              <button
                onClick={() => setActiveTab("desc")}
                className={`pb-4 text-sm font-bold tracking-tight transition border-b-2 cursor-pointer ${
                  activeTab === "desc" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                Description
              </button>
              <button
                onClick={() => setActiveTab("specs")}
                className={`pb-4 text-sm font-bold tracking-tight transition border-b-2 cursor-pointer ${
                  activeTab === "specs" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                Specifications & Care
              </button>
              <button
                onClick={() => setActiveTab("reviews")}
                className={`pb-4 text-sm font-bold tracking-tight transition border-b-2 cursor-pointer ${
                  activeTab === "reviews" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                Reviews ({product.numReviews})
              </button>
            </div>

            {/* Tab 1: Description */}
            {activeTab === "desc" && (
              <div className="space-y-4 text-sm text-foreground/80 leading-relaxed max-w-3xl">
                <p>{product.description || product.shortDescription}</p>
                <p>
                  Every merchandise piece in the SOAR Store is ethically crafted and directly supports our mission to provide sustainable homeownership pathways, vocational training, and mentorship to women in need.
                </p>
              </div>
            )}

            {/* Tab 2: Specs */}
            {activeTab === "specs" && (
              <div className="space-y-4 max-w-xl text-xs">
                <div className="grid grid-cols-2 py-2 border-b border-border/40">
                  <span className="font-bold text-muted-foreground">Category</span>
                  <span className="text-foreground">{product.category}</span>
                </div>
                <div className="grid grid-cols-2 py-2 border-b border-border/40">
                  <span className="font-bold text-muted-foreground">SKU Number</span>
                  <span className="text-foreground">{product.sku || "N/A"}</span>
                </div>
                <div className="grid grid-cols-2 py-2 border-b border-border/40">
                  <span className="font-bold text-muted-foreground">Material & Finish</span>
                  <span className="text-foreground">Premium Organic & Recycled Blend</span>
                </div>
                <div className="grid grid-cols-2 py-2">
                  <span className="font-bold text-muted-foreground">Shipping</span>
                  <span className="text-foreground">Ships in 1-3 business days from Orlando, FL</span>
                </div>
              </div>
            )}

            {/* Tab 3: Reviews & Review Form */}
            {activeTab === "reviews" && (
              <div className="space-y-8">
                {/* Review List */}
                <div className="space-y-4">
                  {product.reviews.length === 0 ? (
                    <p className="text-xs text-muted-foreground italic">No customer reviews yet. Be the first to leave a review!</p>
                  ) : (
                    product.reviews.map((rev) => (
                      <div key={rev.id} className="p-4 rounded-2xl bg-white/60 border border-border/40 space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="size-7 rounded-full bg-primary/10 text-primary font-bold text-xs grid place-items-center">
                              {rev.user.charAt(0)}
                            </div>
                            <span className="font-bold text-xs text-foreground">{rev.user}</span>
                          </div>
                          <span className="text-[10px] text-muted-foreground">{rev.date}</span>
                        </div>
                        <div className="flex text-amber-500">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star key={s} className={`size-3 ${s <= rev.rating ? "fill-current" : "text-slate-300"}`} />
                          ))}
                        </div>
                        <p className="text-xs text-foreground/80 leading-relaxed">{rev.comment}</p>
                      </div>
                    ))
                  )}
                </div>

                {/* Write Review Form */}
                <div className="border-t border-border/50 pt-6 space-y-4 max-w-lg">
                  <h4 className="font-bold text-sm text-foreground">Write a Customer Review</h4>
                  {reviewSuccess ? (
                    <div className="p-4 rounded-xl bg-emerald-50 text-emerald-700 text-xs font-semibold flex items-center gap-2">
                      <CheckCircle2 className="size-4" /> Thank you! Your review has been published.
                    </div>
                  ) : (
                    <form onSubmit={handleReviewSubmit} className="space-y-4">
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
                          Rating
                        </label>
                        <div className="flex gap-1 text-amber-500">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => setReviewRating(star)}
                              className="p-1 cursor-pointer"
                            >
                              <Star className={`size-5 ${star <= reviewRating ? "fill-current" : "text-slate-300"}`} />
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
                          Your Name
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Sarah M."
                          value={reviewName}
                          onChange={(e) => setReviewName(e.target.value)}
                          className="w-full rounded-xl border border-border bg-white px-3.5 py-2 text-xs text-foreground focus:outline-none focus:border-primary"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
                          Review Comments
                        </label>
                        <textarea
                          rows={3}
                          required
                          placeholder="Share your thoughts about this merchandise..."
                          value={reviewComment}
                          onChange={(e) => setReviewComment(e.target.value)}
                          className="w-full rounded-xl border border-border bg-white px-3.5 py-2 text-xs text-foreground focus:outline-none focus:border-primary"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmittingReview}
                        className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-xs font-bold text-white hover:scale-105 transition cursor-pointer disabled:opacity-50"
                      >
                        <Send className="size-3.5" /> Submit Review
                      </button>
                    </form>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="space-y-6 pt-6">
              <h3 className="font-display text-2xl font-extrabold text-foreground tracking-tight">You Might Also Like</h3>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {relatedProducts.map((rel) => {
                  const relImg = rel.images?.[0] || "/products/hoodie.png";
                  const relPrice = rel.salePrice || rel.price;
                  return (
                    <Link
                      key={rel.id}
                      to={`/shop/$slug`}
                      params={{ slug: rel.slug }}
                      className="group rounded-[24px] glass border border-white/60 p-4 shadow-soft hover:shadow-elegant hover:border-primary/30 transition-all duration-300 flex flex-col justify-between"
                    >
                      <div className="overflow-hidden rounded-[18px] bg-slate-100/60 aspect-square">
                        <img src={relImg} alt={rel.name} className="size-full object-cover group-hover:scale-105 transition duration-500" />
                      </div>
                      <div className="mt-3 space-y-1">
                        <span className="text-[10px] font-bold text-primary uppercase tracking-wider">{rel.category}</span>
                        <h4 className="font-serif text-xs font-bold text-foreground group-hover:text-primary transition line-clamp-1">{rel.name}</h4>
                        <span className="text-sm font-extrabold text-foreground block">${relPrice.toFixed(2)}</span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

        </div>
      </div>
    </SiteLayout>
  );
}
