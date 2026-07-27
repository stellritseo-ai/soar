import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import { connectToDatabase } from "./mongodb";
import { SiteSetting, TeamMember, EventModel, BlogPost, GalleryImage, ContactInquiry, ChatMessage, NewsletterSubscriber, Product, Order, CustomerProfile, seedDatabase } from "./models";

export type TeamMemberType = {
  id: string;
  name: string;
  role: string;
  bio: string | null;
  image_url: string | null;
  sort_order: number;
};

export type EventRow = {
  id: string;
  title: string;
  description: string | null;
  event_date: string | null;
  location: string | null;
  image_url: string | null;
  sort_order: number;
};

export type BlogPostType = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  image_url: string | null;
  published_at: string | null;
};

export type GalleryImageType = {
  id: string;
  title: string | null;
  image_url: string;
  sort_order: number;
};

export type HeroSettings = {
  eyebrow?: string;
  headline?: string;
  subheadline?: string;
  stat1_value?: string;
  stat1_label?: string;
  stat2_value?: string;
  stat2_label?: string;
  stat3_value?: string;
  stat3_label?: string;
};

export type ContactSettings = {
  email?: string;
  phone?: string;
  address?: string;
  hours?: string;
};

export type PopupSettings = {
  enabled?: boolean;
  imageUrl?: string;
  linkUrl?: string;
  title?: string;
  description?: string;
  buttonText?: string;
};

// ----------------------------------------------------
// Server Functions (Secure Database Queries / Mutations)
// ----------------------------------------------------

export const getSettingFn = createServerFn({ method: "GET" })
  .validator((key: string) => key)
  .handler(async ({ data: key }) => {
    await connectToDatabase();
    await seedDatabase();
    const doc = await SiteSetting.findOne({ key });
    return (doc ? doc.value : null) as any;
  });

export const saveSettingFn = createServerFn({ method: "POST" })
  .validator((payload: { key: string; value: any }) => payload)
  .handler(async ({ data: { key, value } }) => {
    const { checkAdminAuth } = await import("./auth.server");
    checkAdminAuth();
    await connectToDatabase();
    await SiteSetting.findOneAndUpdate(
      { key },
      { value, updated_at: new Date() },
      { upsert: true, new: true }
    );
    return { success: true };
  });

export const getTeamMembersFn = createServerFn({ method: "GET" })
  .handler(async () => {
    await connectToDatabase();
    const list = await TeamMember.find({}).sort({ sort_order: 1, created_at: 1 });
    return list.map(doc => ({
      id: doc._id.toString(),
      name: doc.name,
      role: doc.role,
      bio: doc.bio || null,
      image_url: doc.image_url || null,
      sort_order: doc.sort_order
    })) as TeamMemberType[];
  });

export const upsertTeamMemberFn = createServerFn({ method: "POST" })
  .validator((payload: any) => payload)
  .handler(async ({ data: member }) => {
    const { checkAdminAuth } = await import("./auth.server");
    checkAdminAuth();
    await connectToDatabase();
    const id = member.id;
    const updateData = {
      name: member.name,
      role: member.role,
      bio: member.bio,
      image_url: member.image_url,
      sort_order: member.sort_order ?? 0,
      updated_at: new Date()
    };
    if (id) {
      await TeamMember.findByIdAndUpdate(id, updateData);
    } else {
      await TeamMember.create(updateData);
    }
    return { success: true };
  });

export const deleteTeamMemberFn = createServerFn({ method: "POST" })
  .validator((id: string) => id)
  .handler(async ({ data: id }) => {
    const { checkAdminAuth } = await import("./auth.server");
    checkAdminAuth();
    await connectToDatabase();
    await TeamMember.findByIdAndDelete(id);
    return { success: true };
  });

export const getEventsFn = createServerFn({ method: "GET" })
  .handler(async () => {
    await connectToDatabase();
    const list = await EventModel.find({}).sort({ event_date: 1 });
    return list.map(doc => ({
      id: doc._id.toString(),
      title: doc.title,
      description: doc.description || null,
      event_date: doc.event_date ? doc.event_date.toISOString() : null,
      location: doc.location || null,
      image_url: doc.image_url || null,
      sort_order: doc.sort_order
    })) as EventRow[];
  });

export const upsertEventFn = createServerFn({ method: "POST" })
  .validator((payload: any) => payload)
  .handler(async ({ data: event }) => {
    const { checkAdminAuth } = await import("./auth.server");
    checkAdminAuth();
    await connectToDatabase();
    const id = event.id;
    const updateData = {
      title: event.title,
      description: event.description,
      event_date: event.event_date ? new Date(event.event_date) : null,
      location: event.location,
      image_url: event.image_url,
      sort_order: event.sort_order ?? 0,
      updated_at: new Date()
    };
    if (id) {
      await EventModel.findByIdAndUpdate(id, updateData);
    } else {
      await EventModel.create(updateData);
    }
    return { success: true };
  });

export const deleteEventFn = createServerFn({ method: "POST" })
  .validator((id: string) => id)
  .handler(async ({ data: id }) => {
    const { checkAdminAuth } = await import("./auth.server");
    checkAdminAuth();
    await connectToDatabase();
    await EventModel.findByIdAndDelete(id);
    return { success: true };
  });

export const getBlogPostsFn = createServerFn({ method: "GET" })
  .validator((publishedOnly: boolean) => publishedOnly)
  .handler(async ({ data: publishedOnly }) => {
    if (!publishedOnly) {
      const { checkAdminAuth } = await import("./auth.server");
      checkAdminAuth();
    }
    await connectToDatabase();
    const filter: any = {};
    if (publishedOnly) {
      filter.published_at = { $ne: null, $lte: new Date() };
    }
    const list = await BlogPost.find(filter).sort({ published_at: -1, created_at: -1 });
    return list.map(doc => ({
      id: doc._id.toString(),
      title: doc.title,
      slug: doc.slug,
      excerpt: doc.excerpt || null,
      content: doc.content || null,
      image_url: doc.image_url || null,
      published_at: doc.published_at ? doc.published_at.toISOString() : null
    })) as BlogPostType[];
  });

export const upsertBlogPostFn = createServerFn({ method: "POST" })
  .validator((payload: any) => payload)
  .handler(async ({ data: post }) => {
    const { checkAdminAuth } = await import("./auth.server");
    checkAdminAuth();
    await connectToDatabase();
    const id = post.id;
    const updateData = {
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      image_url: post.image_url,
      published_at: post.published_at ? new Date(post.published_at) : null,
      updated_at: new Date()
    };
    if (id) {
      await BlogPost.findByIdAndUpdate(id, updateData);
    } else {
      await BlogPost.create(updateData);
    }
    return { success: true };
  });

export const deleteBlogPostFn = createServerFn({ method: "POST" })
  .validator((id: string) => id)
  .handler(async ({ data: id }) => {
    const { checkAdminAuth } = await import("./auth.server");
    checkAdminAuth();
    await connectToDatabase();
    await BlogPost.findByIdAndDelete(id);
    return { success: true };
  });

export const getGalleryFn = createServerFn({ method: "GET" })
  .handler(async () => {
    await connectToDatabase();
    const list = await GalleryImage.find({}).sort({ sort_order: 1, created_at: 1 });
    return list.map(doc => ({
      id: doc._id.toString(),
      title: doc.title || null,
      image_url: doc.image_url,
      sort_order: doc.sort_order
    })) as GalleryImageType[];
  });

export const upsertGalleryImageFn = createServerFn({ method: "POST" })
  .validator((payload: any) => payload)
  .handler(async ({ data: img }) => {
    const { checkAdminAuth } = await import("./auth.server");
    checkAdminAuth();
    await connectToDatabase();
    const id = img.id;
    const updateData = {
      title: img.title,
      image_url: img.image_url,
      sort_order: img.sort_order ?? 0,
      updated_at: new Date()
    };
    if (id) {
      await GalleryImage.findByIdAndUpdate(id, updateData);
    } else {
      await GalleryImage.create(updateData);
    }
    return { success: true };
  });

export const deleteGalleryImageFn = createServerFn({ method: "POST" })
  .validator((id: string) => id)
  .handler(async ({ data: id }) => {
    const { checkAdminAuth } = await import("./auth.server");
    checkAdminAuth();
    await connectToDatabase();
    await GalleryImage.findByIdAndDelete(id);
    return { success: true };
  });

// ----------------------------------------------------
// React Query Client Hooks
// ----------------------------------------------------

export function useTeam() {
  return useQuery({
    queryKey: ["cms", "team"],
    queryFn: () => getTeamMembersFn(),
  });
}

export function useEventsList() {
  return useQuery({
    queryKey: ["cms", "events"],
    queryFn: () => getEventsFn(),
  });
}

export function usePublishedPosts() {
  return useQuery({
    queryKey: ["cms", "blog", "published"],
    queryFn: () => getBlogPostsFn({ data: true }),
  });
}

export function useAllPosts() {
  return useQuery({
    queryKey: ["cms", "blog", "all"],
    queryFn: () => getBlogPostsFn({ data: false }),
  });
}

export function useGallery() {
  return useQuery({
    queryKey: ["cms", "gallery"],
    queryFn: () => getGalleryFn(),
  });
}

export function useSetting<T = Record<string, unknown>>(key: string) {
  return useQuery({
    queryKey: ["cms", "setting", key],
    queryFn: async () => {
      const data = await getSettingFn({ data: key });
      return (data ?? {}) as T;
    },
  });
}

export type ContactInquiryType = {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  read: boolean;
  created_at: string;
};

export type ChatMessageType = {
  id: string;
  conversationId: string;
  sender: "user" | "admin";
  senderName: string;
  message: string;
  created_at: string;
};

export const submitInquiryFn = createServerFn({ method: "POST" })
  .validator((payload: { name: string; email: string; subject?: string; message: string }) => payload)
  .handler(async ({ data }) => {
    await connectToDatabase();
    await ContactInquiry.create(data);
    return { success: true };
  });

export const getInquiriesFn = createServerFn({ method: "GET" })
  .handler(async () => {
    const { checkAdminAuth } = await import("./auth.server");
    checkAdminAuth();
    await connectToDatabase();
    const list = await ContactInquiry.find({}).sort({ created_at: -1 });
    return list.map(doc => ({
      id: doc._id.toString(),
      name: doc.name,
      email: doc.email,
      subject: doc.subject || null,
      message: doc.message,
      read: doc.read,
      created_at: doc.created_at.toISOString()
    })) as ContactInquiryType[];
  });

export const markInquiryReadFn = createServerFn({ method: "POST" })
  .validator((id: string) => id)
  .handler(async ({ data: id }) => {
    const { checkAdminAuth } = await import("./auth.server");
    checkAdminAuth();
    await connectToDatabase();
    await ContactInquiry.findByIdAndUpdate(id, { read: true });
    return { success: true };
  });

export const deleteInquiryFn = createServerFn({ method: "POST" })
  .validator((id: string) => id)
  .handler(async ({ data: id }) => {
    const { checkAdminAuth } = await import("./auth.server");
    checkAdminAuth();
    await connectToDatabase();
    await ContactInquiry.findByIdAndDelete(id);
    return { success: true };
  });

export const getChatHistoryFn = createServerFn({ method: "GET" })
  .validator((conversationId: string) => conversationId)
  .handler(async ({ data: conversationId }) => {
    await connectToDatabase();
    const messages = await ChatMessage.find({ conversationId }).sort({ created_at: 1 });
    return messages.map(doc => ({
      id: doc._id.toString(),
      conversationId: doc.conversationId,
      sender: doc.sender,
      senderName: doc.senderName,
      message: doc.message,
      created_at: doc.created_at.toISOString()
    })) as ChatMessageType[];
  });

export const sendChatMessageFn = createServerFn({ method: "POST" })
  .validator((payload: any) => payload as { conversationId: string; sender: string; senderName: string; message: string })
  .handler(async ({ data }) => {
    await connectToDatabase();
    const chatMsg = await ChatMessage.create({
      conversationId: data.conversationId,
      sender: data.sender,
      senderName: data.senderName,
      message: data.message,
      created_at: new Date()
    });
    return {
      id: chatMsg._id.toString(),
      conversationId: chatMsg.conversationId,
      sender: chatMsg.sender as "user" | "admin",
      senderName: chatMsg.senderName,
      message: chatMsg.message,
      created_at: chatMsg.created_at.toISOString()
    } as ChatMessageType;
  });

export const getChatConversationsFn = createServerFn({ method: "GET" })
  .handler(async () => {
    await connectToDatabase();
    const sessions = await ChatMessage.aggregate([
      // Sort ascending so $last picks the most recent message per conversation
      { $sort: { created_at: 1 } },
      {
        $group: {
          _id: "$conversationId",
          latestMessage: { $last: "$message" },
          senderName: { $first: "$senderName" },
          created_at: { $last: "$created_at" }
        }
      },
      // Sort conversations by most recent activity
      { $sort: { created_at: -1 } }
    ]);
    return sessions.map(s => ({
      conversationId: s._id,
      latestMessage: s.latestMessage,
      senderName: s.senderName,
      created_at: s.created_at.toISOString()
    }));
  });

export function useInquiries() {
  return useQuery({
    queryKey: ["cms", "inquiries"],
    queryFn: () => getInquiriesFn(),
  });
}

export function useChatHistory(conversationId: string) {
  return useQuery({
    queryKey: ["chat", "history", conversationId],
    queryFn: () => getChatHistoryFn({ data: conversationId }),
    enabled: !!conversationId,
    refetchInterval: 3000
  });
}

export function useChatConversations() {
  return useQuery({
    queryKey: ["chat", "conversations"],
    queryFn: () => getChatConversationsFn(),
    refetchInterval: 2000,
    retry: 1,
    staleTime: 0,
  });
}

export type NewsletterSubscriberType = {
  id: string;
  email: string;
  created_at: string;
};

export const subscribeNewsletterFn = createServerFn({ method: "POST" })
  .validator((email: string) => email)
  .handler(async ({ data: email }) => {
    await connectToDatabase();
    const cleanEmail = email?.trim().toLowerCase();
    if (!cleanEmail) throw new Error("Email is required");
    const exists = await NewsletterSubscriber.findOne({ email: cleanEmail });
    if (exists) return { success: true, message: "Already subscribed" };
    await NewsletterSubscriber.create({ email: cleanEmail });
    return { success: true };
  });

export const getNewsletterSubscribersFn = createServerFn({ method: "GET" })
  .handler(async () => {
    const { checkAdminAuth } = await import("./auth.server");
    checkAdminAuth();
    await connectToDatabase();
    const list = await NewsletterSubscriber.find({}).sort({ created_at: -1 });
    return list.map(doc => ({
      id: doc._id.toString(),
      email: doc.email,
      created_at: doc.created_at.toISOString()
    })) as NewsletterSubscriberType[];
  });

export const deleteNewsletterSubscriberFn = createServerFn({ method: "POST" })
  .validator((id: string) => id)
  .handler(async ({ data: id }) => {
    const { checkAdminAuth } = await import("./auth.server");
    checkAdminAuth();
    await connectToDatabase();
    await NewsletterSubscriber.findByIdAndDelete(id);
    return { success: true };
  });

export function useNewsletterSubscribers() {
  return useQuery({
    queryKey: ["cms", "subscribers"],
    queryFn: () => getNewsletterSubscribersFn(),
  });
}

// ==========================================
// E-COMMERCE CMS TYPES & SERVER FUNCTIONS
// ==========================================

export type ProductReviewType = {
  id: string;
  user: string;
  avatar?: string;
  rating: number;
  comment: string;
  date: string;
};

export type ProductVariantType = {
  name: string;
  options: string[];
};

export type ProductType = {
  id: string;
  name: string;
  slug: string;
  price: number;
  salePrice?: number | null;
  category: string;
  shortDescription?: string | null;
  description?: string | null;
  images: string[];
  variants: ProductVariantType[];
  sku?: string | null;
  stock: number;
  status: "Published" | "Draft";
  isFeatured: boolean;
  rating: number;
  numReviews: number;
  reviews: ProductReviewType[];
  created_at: string;
  updated_at: string;
};

export type OrderItemType = {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  variant?: string;
};

export type OrderType = {
  id: string;
  orderNumber: string;
  customer: {
    name: string;
    email: string;
    phone?: string;
    address: {
      street: string;
      city: string;
      state: string;
      zip: string;
      country: string;
    };
  };
  items: OrderItemType[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  paymentStatus: "Paid" | "Pending" | "Refunded";
  paymentMethod: string;
  orderStatus: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
  created_at: string;
  updated_at: string;
};

export type CustomerProfileType = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  totalOrders: number;
  totalSpent: number;
  lastOrderDate: string;
};

export type ShopAnalyticsType = {
  totalSales: number;
  totalOrders: number;
  averageOrderValue: number;
  lowStockCount: number;
  bestSellers: Array<{ name: string; category: string; sold: number; revenue: number; image?: string }>;
  recentOrders: OrderType[];
};

// 1. PRODUCTS SERVER FUNCTIONS
export const getProductsFn = createServerFn({ method: "GET" })
  .handler(async () => {
    await connectToDatabase();
    await seedDatabase();
    const docs = await Product.find({}).sort({ created_at: -1 }).lean();
    return docs.map((doc: any) => ({
      id: doc._id ? doc._id.toString() : `prod-${Math.random()}`,
      name: doc.name,
      slug: doc.slug,
      price: doc.price,
      salePrice: doc.salePrice || null,
      category: doc.category || "Apparel",
      shortDescription: doc.shortDescription || "",
      description: doc.description || "",
      images: (doc.images || []).map((img: string) => img.replace("/src/assets/products/", "/products/")),
      variants: (doc.variants || []).map((v: any) => ({
        name: v.name,
        options: v.options || []
      })),
      sku: doc.sku || "",
      stock: doc.stock ?? 0,
      status: doc.status || "Published",
      isFeatured: !!doc.isFeatured,
      rating: doc.rating || 5.0,
      numReviews: doc.numReviews || 0,
      reviews: (doc.reviews || []).map((r: any) => ({
        id: r.id || (r._id ? r._id.toString() : `rev-${Math.random()}`),
        user: r.user || "Verified Buyer",
        avatar: r.avatar || "",
        rating: r.rating || 5,
        comment: r.comment || "",
        date: r.date || ""
      })),
      created_at: safeIsoDate(doc.created_at),
      updated_at: safeIsoDate(doc.updated_at),
    })) as ProductType[];
  });

export const getProductBySlugFn = createServerFn({ method: "POST" })
  .validator((slug: string) => slug)
  .handler(async ({ data: slug }) => {
    await connectToDatabase();
    await seedDatabase();
    const doc = (await Product.findOne({ slug }).lean()) as any;
    if (!doc) return null;
    return {
      id: doc._id ? doc._id.toString() : `prod-${Math.random()}`,
      name: doc.name,
      slug: doc.slug,
      price: doc.price,
      salePrice: doc.salePrice || null,
      category: doc.category || "Apparel",
      shortDescription: doc.shortDescription || "",
      description: doc.description || "",
      images: (doc.images || []).map((img: string) => img.replace("/src/assets/products/", "/products/")),
      variants: (doc.variants || []).map((v: any) => ({
        name: v.name,
        options: v.options || []
      })),
      sku: doc.sku || "",
      stock: doc.stock ?? 0,
      status: doc.status || "Published",
      isFeatured: !!doc.isFeatured,
      rating: doc.rating || 5.0,
      numReviews: doc.numReviews || 0,
      reviews: (doc.reviews || []).map((r: any) => ({
        id: r.id || (r._id ? r._id.toString() : `rev-${Math.random()}`),
        user: r.user || "Verified Buyer",
        avatar: r.avatar || "",
        rating: r.rating || 5,
        comment: r.comment || "",
        date: r.date || ""
      })),
      created_at: safeIsoDate(doc.created_at),
      updated_at: safeIsoDate(doc.updated_at),
    } as ProductType;
  });

export const upsertProductFn = createServerFn({ method: "POST" })
  .validator((data: Partial<ProductType>) => data)
  .handler(async ({ data }) => {
    const { checkAdminAuth } = await import("./auth.server");
    checkAdminAuth();
    await connectToDatabase();

    const slug = data.slug || data.name?.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

    const payload = {
      name: data.name,
      slug,
      price: Number(data.price),
      salePrice: data.salePrice ? Number(data.salePrice) : null,
      category: data.category || "Apparel",
      shortDescription: data.shortDescription,
      description: data.description,
      images: data.images && data.images.length > 0 ? data.images : ["/products/hoodie.png"],
      variants: data.variants || [],
      sku: data.sku || `SOAR-SKU-${Math.floor(1000 + Math.random() * 9000)}`,
      stock: Number(data.stock ?? 0),
      status: data.status || "Published",
      isFeatured: !!data.isFeatured,
      updated_at: new Date()
    };

    if (data.id) {
      await Product.findByIdAndUpdate(data.id, payload);
    } else {
      await Product.create(payload);
    }
    return { success: true };
  });

export const deleteProductFn = createServerFn({ method: "POST" })
  .validator((id: string) => id)
  .handler(async ({ data: id }) => {
    const { checkAdminAuth } = await import("./auth.server");
    checkAdminAuth();
    await connectToDatabase();
    await Product.findByIdAndDelete(id);
    return { success: true };
  });

export const addProductReviewFn = createServerFn({ method: "POST" })
  .validator((data: { slug: string; user: string; rating: number; comment: string }) => data)
  .handler(async ({ data }) => {
    await connectToDatabase();
    const product = await Product.findOne({ slug: data.slug });
    if (!product) throw new Error("Product not found");

    const newReview = {
      id: `rev-${Date.now()}`,
      user: data.user || "Verified Buyer",
      rating: Number(data.rating),
      comment: data.comment,
      date: new Date().toISOString().split("T")[0]
    };

    const reviews = [newReview, ...(product.reviews || [])];
    const avgRating = Number((reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1));

    product.reviews = reviews;
    product.numReviews = reviews.length;
    product.rating = avgRating;
    await product.save();

    return { success: true };
  });

function safeIsoDate(val: any): string {
  if (!val) return new Date().toISOString();
  try {
    const d = new Date(val);
    if (isNaN(d.getTime())) return new Date().toISOString();
    return d.toISOString();
  } catch {
    return new Date().toISOString();
  }
}

// 2. ORDERS SERVER FUNCTIONS
export const getOrdersFn = createServerFn({ method: "GET" })
  .handler(async () => {
    await connectToDatabase();
    await seedDatabase();
    const docs = await Order.find({}).sort({ created_at: -1 }).lean();
    return docs.map((doc: any) => ({
      id: doc._id ? doc._id.toString() : `ord-${Math.random()}`,
      orderNumber: doc.orderNumber || `SOAR-${Math.floor(1000 + Math.random() * 9000)}`,
      customer: doc.customer || { name: "Customer", email: "customer@example.com", address: { street: "", city: "", state: "", zip: "", country: "" } },
      items: (doc.items || []).map((i: any) => ({
        productId: i.productId || "",
        name: i.name || "Merchandise Item",
        price: Number(i.price || 0),
        quantity: Number(i.quantity || 1),
        image: i.image || "/products/hoodie.png",
        variant: i.variant || ""
      })),
      subtotal: Number(doc.subtotal || 0),
      tax: Number(doc.tax || 0),
      shipping: Number(doc.shipping || 0),
      total: Number(doc.total || 0),
      paymentStatus: doc.paymentStatus || "Paid",
      paymentMethod: doc.paymentMethod || "Credit Card",
      orderStatus: doc.orderStatus || "Processing",
      created_at: safeIsoDate(doc.created_at),
      updated_at: safeIsoDate(doc.updated_at),
    })) as OrderType[];
  });

export const createOrderFn = createServerFn({ method: "POST" })
  .validator((data: any) => data)
  .handler(async ({ data }) => {
    await connectToDatabase();
    const count = await Order.countDocuments();
    const orderNumber = `SOAR-${1000 + count + 1}`;

    // Create Order in MongoDB
    const newOrder = await Order.create({
      customer: data.customer,
      items: data.items,
      subtotal: Number(data.subtotal),
      tax: Number(data.tax),
      shipping: Number(data.shipping),
      total: Number(data.total),
      paymentStatus: data.paymentStatus || "Paid",
      paymentMethod: data.paymentMethod || "Credit Card",
      orderStatus: data.orderStatus || "Processing",
      created_at: new Date(),
      updated_at: new Date()
    });

    // Deduct stock for each product ordered
    if (data.items && Array.isArray(data.items)) {
      for (const item of data.items) {
        if (item.productId && !item.productId.startsWith("seed-")) {
          await Product.findByIdAndUpdate(item.productId, {
            $inc: { stock: -Number(item.quantity || 1) }
          });
        }
      }
    }

    // Upsert Customer Profile
    if (data.customer && data.customer.email) {
      const email = data.customer.email.toLowerCase().trim();
      const existingCustomer = await CustomerProfile.findOne({ email });
      if (existingCustomer) {
        existingCustomer.totalOrders += 1;
        existingCustomer.totalSpent += Number(data.total || 0);
        existingCustomer.lastOrderDate = new Date();
        if (data.customer.phone) existingCustomer.phone = data.customer.phone;
        await existingCustomer.save();
      } else {
        await CustomerProfile.create({
          name: data.customer.name,
          email,
          phone: data.customer.phone || "",
          totalOrders: 1,
          totalSpent: Number(data.total || 0),
          lastOrderDate: new Date()
        });
      }
    }

    return {
      success: true,
      orderNumber,
      orderId: newOrder._id.toString()
    };
  });

export const updateOrderStatusFn = createServerFn({ method: "POST" })
  .validator((data: { id: string; orderStatus?: OrderType["orderStatus"]; paymentStatus?: OrderType["paymentStatus"] }) => data)
  .handler(async ({ data }) => {
    const { checkAdminAuth } = await import("./auth.server");
    checkAdminAuth();
    await connectToDatabase();

    const update: Record<string, unknown> = { updated_at: new Date() };
    if (data.orderStatus) update.orderStatus = data.orderStatus;
    if (data.paymentStatus) update.paymentStatus = data.paymentStatus;

    await Order.findByIdAndUpdate(data.id, update);
    return { success: true };
  });

// 3. CUSTOMERS SERVER FUNCTIONS
export const getCustomersFn = createServerFn({ method: "GET" })
  .handler(async () => {
    await connectToDatabase();
    await seedDatabase();
    const docs = await CustomerProfile.find({}).sort({ totalSpent: -1 }).lean();
    return docs.map((doc: any) => ({
      id: doc._id ? doc._id.toString() : `cust-${Math.random()}`,
      name: doc.name || "Customer",
      email: doc.email || "customer@example.com",
      phone: doc.phone || "",
      totalOrders: Number(doc.totalOrders || 0),
      totalSpent: Number(doc.totalSpent || 0),
      lastOrderDate: safeIsoDate(doc.lastOrderDate)
    })) as CustomerProfileType[];
  });

// 4. SHOP ANALYTICS SERVER FUNCTION
export const getShopAnalyticsFn = createServerFn({ method: "GET" })
  .handler(async () => {
    await connectToDatabase();
    await seedDatabase();

    const orders = await Order.find({}).sort({ created_at: -1 }).lean();
    const products = await Product.find({}).lean();

    const totalSales = orders.reduce((acc: number, o: any) => acc + (o.paymentStatus === "Paid" ? Number(o.total || 0) : 0), 0);
    const totalOrders = orders.length;
    const averageOrderValue = totalOrders > 0 ? totalSales / totalOrders : 0;
    const lowStockCount = products.filter((p: any) => Number(p.stock ?? 0) <= 10).length;

    // Best sellers aggregate
    const productSalesMap: Record<string, { name: string; category: string; sold: number; revenue: number; image?: string }> = {};
    orders.forEach((ord: any) => {
      if (ord.items && Array.isArray(ord.items)) {
        ord.items.forEach((item: any) => {
          const itemName = item.name || "Merchandise Item";
          if (!productSalesMap[itemName]) {
            productSalesMap[itemName] = {
              name: itemName,
              category: "Merchandise",
              sold: 0,
              revenue: 0,
              image: item.image || "/products/hoodie.png"
            };
          }
          productSalesMap[itemName].sold += Number(item.quantity || 1);
          productSalesMap[itemName].revenue += Number(item.price || 0) * Number(item.quantity || 1);
        });
      }
    });

    const bestSellers = Object.values(productSalesMap).sort((a, b) => b.revenue - a.revenue).slice(0, 5);

    const recentOrders = orders.slice(0, 5).map((doc: any) => ({
      id: doc._id ? doc._id.toString() : `ord-${Math.random()}`,
      orderNumber: doc.orderNumber || `SOAR-${Math.floor(1000 + Math.random() * 9000)}`,
      customer: doc.customer || { name: "Customer", email: "customer@example.com", address: { street: "", city: "", state: "", zip: "", country: "" } },
      items: doc.items || [],
      subtotal: Number(doc.subtotal || 0),
      tax: Number(doc.tax || 0),
      shipping: Number(doc.shipping || 0),
      total: Number(doc.total || 0),
      paymentStatus: doc.paymentStatus || "Paid",
      paymentMethod: doc.paymentMethod || "Credit Card",
      orderStatus: doc.orderStatus || "Processing",
      created_at: safeIsoDate(doc.created_at),
      updated_at: safeIsoDate(doc.updated_at),
    })) as OrderType[];

    return {
      totalSales,
      totalOrders,
      averageOrderValue,
      lowStockCount,
      bestSellers,
      recentOrders
    } as ShopAnalyticsType;
  });

// REACT QUERY HOOKS FOR SHOP
export function useProducts() {
  return useQuery({
    queryKey: ["cms", "products"],
    queryFn: () => getProductsFn(),
  });
}

export function useProductBySlug(slug: string) {
  return useQuery({
    queryKey: ["cms", "product", slug],
    queryFn: () => getProductBySlugFn({ data: slug }),
    enabled: !!slug,
  });
}

export function useOrders() {
  return useQuery({
    queryKey: ["cms", "orders"],
    queryFn: () => getOrdersFn(),
  });
}

export function useCustomers() {
  return useQuery({
    queryKey: ["cms", "customers"],
    queryFn: () => getCustomersFn(),
  });
}

export function useShopAnalytics() {
  const { data: serverAnalytics, isLoading: isServerLoading, error: serverError, refetch } = useQuery({
    queryKey: ["cms", "shop-analytics"],
    queryFn: () => getShopAnalyticsFn(),
    staleTime: 2000,
  });

  const { data: orders = [] } = useOrders();
  const { data: products = [] } = useProducts();

  const data: ShopAnalyticsType = useMemo(() => {
    if (serverAnalytics) return serverAnalytics;

    const totalSales = orders.reduce((acc, o) => acc + (o.paymentStatus === "Paid" ? Number(o.total || 0) : 0), 0);
    const totalOrders = orders.length;
    const averageOrderValue = totalOrders > 0 ? totalSales / totalOrders : 0;
    const lowStockCount = products.filter(p => Number(p.stock ?? 0) <= 10).length;

    const productSalesMap: Record<string, { name: string; category: string; sold: number; revenue: number; image?: string }> = {};
    orders.forEach(ord => {
      (ord.items || []).forEach(item => {
        const itemName = item.name || "Merchandise Item";
        if (!productSalesMap[itemName]) {
          productSalesMap[itemName] = {
            name: itemName,
            category: "Merchandise",
            sold: 0,
            revenue: 0,
            image: item.image || "/products/hoodie.png"
          };
        }
        productSalesMap[itemName].sold += Number(item.quantity || 1);
        productSalesMap[itemName].revenue += Number(item.price || 0) * Number(item.quantity || 1);
      });
    });

    const bestSellers = Object.values(productSalesMap).sort((a, b) => b.revenue - a.revenue).slice(0, 5);
    const recentOrders = orders.slice(0, 5);

    return {
      totalSales,
      totalOrders,
      averageOrderValue,
      lowStockCount,
      bestSellers,
      recentOrders
    };
  }, [serverAnalytics, orders, products]);

  const isLoading = isServerLoading && orders.length === 0 && products.length === 0;

  return {
    data,
    isLoading,
    isError: !!serverError && !data,
    refetch
  };
}

// Preserve original exports mapping for backward compatibility
export type TeamMember = TeamMemberType;
export type BlogPost = BlogPostType;
export type GalleryImage = GalleryImageType;
export type ContactInquiry = ContactInquiryType;
export type ChatMessage = ChatMessageType;
export type NewsletterSubscriber = NewsletterSubscriberType;

// Stripe Server Function for Live Payment Intents
export const createStripePaymentIntentFn = createServerFn({ method: "POST" })
  .validator((amount: number) => amount)
  .handler(async ({ data: amount }) => {
    try {
      const Stripe = (await import("stripe")).default;
      const stripeSecret = process.env.STRIPE_SECRET_KEY || "";
      const stripe = new Stripe(stripeSecret, {
        apiVersion: "2023-10-16" as any,
      });

      const amountInCents = Math.max(50, Math.round(amount * 100));
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amountInCents,
        currency: "usd",
        automatic_payment_methods: { enabled: true },
      });

      return { clientSecret: paymentIntent.client_secret, id: paymentIntent.id };
    } catch (err: any) {
      console.error("Stripe PaymentIntent Error:", err);
      return { clientSecret: null, error: err?.message || "Failed to create Stripe PaymentIntent" };
    }
  });

// Donation Type Definition
export type DonationType = {
  id: string;
  donorName: string;
  donorEmail: string;
  donorPhone?: string;
  amount: number;
  giftType: string;
  fundCategory: string;
  paymentMethod: string;
  paymentStatus: string;
  stripePaymentId?: string;
  tributeName?: string;
  isTribute?: boolean;
  message?: string;
  created_at: string;
};

// Create Donation Server Function
export const createDonationFn = createServerFn({ method: "POST" })
  .validator((data: Omit<DonationType, "id" | "created_at">) => data)
  .handler(async ({ data }) => {
    try {
      const { connectDB, Donation } = await import("./models");
      await connectDB();

      const newDonation = await Donation.create({
        ...data,
        paymentStatus: data.paymentStatus || "Completed",
        created_at: new Date()
      });

      return { success: true, donationId: newDonation._id.toString() };
    } catch (err: any) {
      console.error("Failed to save donation:", err);
      return { success: false, error: err?.message || "Database insert failed" };
    }
  });

// Fetch All Donations Server Function
export const getDonationsFn = createServerFn({ method: "GET" })
  .handler(async (): Promise<DonationType[]> => {
    try {
      const { connectDB, Donation } = await import("./models");
      await connectDB();

      const docs = await Donation.find({}).sort({ created_at: -1 }).lean();
      return docs.map((doc: any) => ({
        id: doc._id.toString(),
        donorName: doc.donorName,
        donorEmail: doc.donorEmail,
        donorPhone: doc.donorPhone || "",
        amount: doc.amount,
        giftType: doc.giftType || "One-time",
        fundCategory: doc.fundCategory || "Where needed most",
        paymentMethod: doc.paymentMethod || "Stripe Credit Card",
        paymentStatus: doc.paymentStatus || "Completed",
        stripePaymentId: doc.stripePaymentId || "",
        tributeName: doc.tributeName || "",
        isTribute: !!doc.isTribute,
        message: doc.message || "",
        created_at: doc.created_at ? new Date(doc.created_at).toISOString() : new Date().toISOString()
      }));
    } catch (err) {
      console.error("Failed to fetch donations:", err);
      return [];
    }
  });

// React Query Hooks for Donations
export function useDonations() {
  return useQuery({
    queryKey: ["cms", "donations"],
    queryFn: () => getDonationsFn(),
    staleTime: 1000 * 30,
  });
}

