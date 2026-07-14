import mongoose, { Schema } from "mongoose";

// SiteSetting Schema
const SiteSettingSchema = new Schema({
  key: { type: String, required: true, unique: true },
  value: { type: Schema.Types.Mixed, required: true },
  updated_at: { type: Date, default: Date.now }
});

// TeamMember Schema
const TeamMemberSchema = new Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  bio: { type: String },
  image_url: { type: String },
  sort_order: { type: Number, default: 0 },
  updated_at: { type: Date, default: Date.now }
});

// Event Schema
const EventSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  event_date: { type: Date },
  location: { type: String },
  image_url: { type: String },
  sort_order: { type: Number, default: 0 },
  updated_at: { type: Date, default: Date.now }
});

// BlogPost Schema
const BlogPostSchema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  excerpt: { type: String },
  content: { type: String },
  image_url: { type: String },
  published_at: { type: Date },
  updated_at: { type: Date, default: Date.now }
});

// GalleryImage Schema
const GalleryImageSchema = new Schema({
  title: { type: String },
  image_url: { type: String, required: true },
  sort_order: { type: Number, default: 0 },
  updated_at: { type: Date, default: Date.now }
});

// ContactInquiry Schema
const ContactInquirySchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String },
  message: { type: String, required: true },
  read: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now }
});

// ChatMessage Schema
const ChatMessageSchema = new Schema({
  conversationId: { type: String, required: true },
  sender: { type: String, required: true }, // "user" | "admin"
  senderName: { type: String, required: true },
  message: { type: String, required: true },
  created_at: { type: Date, default: Date.now }
});

export const SiteSetting = mongoose.models.SiteSetting || mongoose.model("SiteSetting", SiteSettingSchema);
export const TeamMember = mongoose.models.TeamMember || mongoose.model("TeamMember", TeamMemberSchema);
export const EventModel = mongoose.models.Event || mongoose.model("Event", EventSchema);
export const BlogPost = mongoose.models.BlogPost || mongoose.model("BlogPost", BlogPostSchema);
export const GalleryImage = mongoose.models.GalleryImage || mongoose.model("GalleryImage", GalleryImageSchema);
export const ContactInquiry = mongoose.models.ContactInquiry || mongoose.model("ContactInquiry", ContactInquirySchema);
export const ChatMessage = mongoose.models.ChatMessage || mongoose.model("ChatMessage", ChatMessageSchema);

export async function seedDatabase() {
  const settingsCount = await SiteSetting.countDocuments();
  if (settingsCount === 0) {
    console.log("Seeding default settings into MongoDB...");
    await SiteSetting.insertMany([
      {
        key: "hero",
        value: {
          eyebrow: "A future where everyone can soar",
          headline: "Empowering communities, one life at a time.",
          subheadline: "SOAR Global Foundation provides food, shelter, education, and hope to families and children in need across the globe.",
          stat1_value: "120K+",
          stat1_label: "Lives touched",
          stat2_value: "45",
          stat2_label: "Countries",
          stat3_value: "98%",
          stat3_label: "Funds to programs"
        }
      },
      {
        key: "contact",
        value: {
          email: "hello@soarglobal.org",
          phone: "+1 (321) 710-7145",
          address: "3311 N Powers Dr, Orlando, FL 32818",
          hours: "Mon–Fri, 9am–6pm PT"
        }
      }
    ]);
  }

  const teamCount = await TeamMember.countDocuments();
  if (teamCount === 0) {
    console.log("Seeding default team members into MongoDB...");
    await TeamMember.insertMany([
      {
        name: "Myrtle Dixon",
        role: "Founder & President",
        bio: "Visionary leader championing women's empowerment for over 20 years.",
        image_url: "",
        sort_order: 1
      },
      {
        name: "Dixon, Myrtle",
        role: "President",
        bio: "Leading strategic direction and advocacy for sustainable housing.",
        image_url: "",
        sort_order: 2
      },
      {
        name: "Terry-Ann Taylor-Beckford",
        role: "President",
        bio: "Architect of SOAR's mentorship and financial literacy curriculum.",
        image_url: "",
        sort_order: 3
      },
      {
        name: "Betty Arhelo",
        role: "Vice President",
        bio: "Cultivating community support and organizing outreach programs.",
        image_url: "",
        sort_order: 4
      },
      {
        name: "Arhelo Betty",
        role: "Secretary",
        bio: "Builds the sisterhood — events, outreach, and volunteer care.",
        image_url: "",
        sort_order: 5
      },
      {
        name: "Tamara Girly",
        role: "Director",
        bio: "Cultivates sponsors and strategic partners advancing our mission.",
        image_url: "",
        sort_order: 6
      }
    ]);
  }

  const eventCount = await EventModel.countDocuments();
  if (eventCount === 0) {
    console.log("Seeding default events into MongoDB...");
    await EventModel.insertMany([
      {
        title: "Purple Hearts Gala",
        description: "A signature fundraising dinner and silent auction celebrating stories of resilience and sovereignty.",
        event_date: new Date("2026-10-24T18:00:00Z"),
        location: "Grand Ballroom, Orlando, FL",
        image_url: "",
        sort_order: 1
      },
      {
        title: "Financial Literacy Bootcamp",
        description: "An intensive workshop covering credit repair, household budgeting, and paths to homeownership.",
        event_date: new Date("2026-08-15T09:00:00Z"),
        location: "Community Center, Orlando, FL",
        image_url: "",
        sort_order: 2
      }
    ]);
  }

  const blogCount = await BlogPost.countDocuments();
  if (blogCount === 0) {
    console.log("Seeding default blog posts into MongoDB...");
    await BlogPost.insertMany([
      {
        title: "Rising Together: A Sisterhood's Vision",
        slug: "rising-together",
        excerpt: "How homeownership transforms lives and builds stable communities for generations to come.",
        content: "Sovereignty is not just about having a key. It is about a woman's path to dignity, self-determination, and lasting independence...",
        image_url: "",
        published_at: new Date()
      }
    ]);
  }
}
