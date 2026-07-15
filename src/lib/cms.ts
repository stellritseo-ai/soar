import { useQuery } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import { connectToDatabase } from "./mongodb";
import { SiteSetting, TeamMember, EventModel, BlogPost, GalleryImage, ContactInquiry, ChatMessage, NewsletterSubscriber, seedDatabase } from "./models";

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

// Preserve original exports mapping for backward compatibility
export type TeamMember = TeamMemberType;
export type BlogPost = BlogPostType;
export type GalleryImage = GalleryImageType;
export type ContactInquiry = ContactInquiryType;
export type ChatMessage = ChatMessageType;
export type NewsletterSubscriber = NewsletterSubscriberType;
