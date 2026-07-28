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

// NewsletterSubscriber Schema
const NewsletterSubscriberSchema = new Schema({
  email: { type: String, required: true, unique: true, lowercase: true },
  created_at: { type: Date, default: Date.now }
});

export const SiteSetting = mongoose.models.SiteSetting || mongoose.model("SiteSetting", SiteSettingSchema);
export const TeamMember = mongoose.models.TeamMember || mongoose.model("TeamMember", TeamMemberSchema);
// Product Schema
const ProductSchema = new Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
  salePrice: { type: Number },
  category: { type: String, required: true, default: "Apparel" },
  shortDescription: { type: String },
  description: { type: String },
  images: [{ type: String }],
  variants: [
    {
      name: { type: String }, // e.g. "Size"
      options: [{ type: String }] // e.g. ["S", "M", "L", "XL"]
    }
  ],
  sku: { type: String },
  stock: { type: Number, default: 50 },
  status: { type: String, enum: ["Published", "Draft"], default: "Published" },
  isFeatured: { type: Boolean, default: false },
  rating: { type: Number, default: 5.0 },
  numReviews: { type: Number, default: 0 },
  reviews: [
    {
      id: { type: String },
      user: { type: String },
      avatar: { type: String },
      rating: { type: Number },
      comment: { type: String },
      date: { type: String }
    }
  ],
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

// Order Schema
const OrderSchema = new Schema({
  orderNumber: { type: String, required: true, unique: true },
  customer: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    address: {
      street: { type: String },
      city: { type: String },
      state: { type: String },
      zip: { type: String },
      country: { type: String, default: "USA" }
    }
  },
  items: [
    {
      productId: { type: String, required: true },
      name: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
      image: { type: String },
      variant: { type: String }
    }
  ],
  subtotal: { type: Number, required: true },
  tax: { type: Number, required: true, default: 0 },
  shipping: { type: Number, required: true, default: 0 },
  total: { type: Number, required: true },
  paymentStatus: { type: String, enum: ["Paid", "Pending", "Refunded"], default: "Paid" },
  paymentMethod: { type: String, default: "Credit Card" },
  orderStatus: { type: String, enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"], default: "Processing" },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

// CustomerProfile Schema
const CustomerProfileSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  totalOrders: { type: Number, default: 0 },
  totalSpent: { type: Number, default: 0 },
  lastOrderDate: { type: Date, default: Date.now }
});

export const EventModel = mongoose.models.Event || mongoose.model("Event", EventSchema);
export const BlogPost = mongoose.models.BlogPost || mongoose.model("BlogPost", BlogPostSchema);
export const GalleryImage = mongoose.models.GalleryImage || mongoose.model("GalleryImage", GalleryImageSchema);
export const ContactInquiry = mongoose.models.ContactInquiry || mongoose.model("ContactInquiry", ContactInquirySchema);
export const ChatMessage = mongoose.models.ChatMessage || mongoose.model("ChatMessage", ChatMessageSchema);
export const NewsletterSubscriber = mongoose.models.NewsletterSubscriber || mongoose.model("NewsletterSubscriber", NewsletterSubscriberSchema);
export const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);
export const Order = mongoose.models.Order || mongoose.model("Order", OrderSchema);
export const CustomerProfile = mongoose.models.CustomerProfile || mongoose.model("CustomerProfile", CustomerProfileSchema);

let isSeeded = false;

export async function connectDB() {
  if (mongoose.connection.readyState >= 1) return;
  const uri = process.env.MONGODB_URI || "mongodb+srv://sora_db_user:dF8rsHBOMdKSkvGa@sora.8mllofs.mongodb.net/soar?appName=sora";
  await mongoose.connect(uri);
}

export async function seedDatabase() {
  await connectDB();
  if (isSeeded) return;
  isSeeded = true;
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
          email: "shoutgospelworship@gmail.com",
          phone: "+1 (321) 710-7145",
          address: "Orlando, FL 32818",
          hours: "Mon–Fri, 9am–6pm PT"
        }
      }
    ]);
  }

  // Self-healing database update to ensure existing database reflects the email & address shift
  const contactSetting = await SiteSetting.findOne({ key: "contact" });
  if (contactSetting && contactSetting.value) {
    let modified = false;
    if (contactSetting.value.email === "hello@soarglobal.org" || contactSetting.value.email === "sistersoar14@gmail.com") {
      contactSetting.value.email = "shoutgospelworship@gmail.com";
      modified = true;
      console.log("Database contact settings email automatically updated to shoutgospelworship@gmail.com");
    }
    if (contactSetting.value.address === "3311 N Powers Dr, Orlando, FL 32818") {
      contactSetting.value.address = "Orlando, FL 32818";
      modified = true;
      console.log("Database contact settings address automatically updated to Orlando, FL 32818");
    }
    if (modified) {
      contactSetting.markModified("value");
      await contactSetting.save();
    }
  }

  // Self-healing database update for popup Zeffy ticketing link
  const popupSetting = await SiteSetting.findOne({ key: "popup" });
  if (popupSetting && popupSetting.value) {
    const zeffyLink = "https://www.zeffy.com/en-US/ticketing/purple-heart-annual-gala";
    if (popupSetting.value.linkUrl !== zeffyLink) {
      popupSetting.value.linkUrl = zeffyLink;
      popupSetting.markModified("value");
      await popupSetting.save();
      console.log("Database popup settings linkUrl automatically updated to Zeffy ticketing link.");
    }
  }

  // Check if we have the old duplicate entries and clean them up to trigger a fresh aligned re-seed
  const hasDuplicates = await TeamMember.exists({ name: { $in: ["Dixon, Myrtle", "Arhelo Betty"] } });
  if (hasDuplicates) {
    console.log("Cleaning up old duplicate team members from database...");
    await TeamMember.deleteMany({});
  }

  const teamCount = await TeamMember.countDocuments();
  if (teamCount === 0) {
    console.log("Seeding default team members into MongoDB...");
    await TeamMember.insertMany([
      {
        name: "Myrtle Dixon",
        role: "Founder",
        bio: "Visionary leader championing women's empowerment for over 20 years.",
        image_url: "",
        sort_order: 1
      },
      {
        name: "Terry-Ann Taylor-Beckford",
        role: "President",
        bio: "Architect of SOAR's mentorship and financial literacy curriculum.",
        image_url: "",
        sort_order: 2
      },
      {
        name: "Betty Arhelo",
        role: "Vice President",
        bio: "Cultivating community support and organizing outreach programs.",
        image_url: "",
        sort_order: 3
      },
      {
        name: "Kameka Harrison",
        role: "Secretary",
        bio: "Builds the sisterhood — events, outreach, and volunteer care.",
        image_url: "",
        sort_order: 4
      },
      {
        name: "Tamara Girly",
        role: "Director",
        bio: "Cultivates sponsors and strategic partners advancing our mission.",
        image_url: "",
        sort_order: 5
      },
      {
        name: "Tamar Raby",
        role: "Director",
        bio: "Tamar builds bridges with community partners and local sponsors.",
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

  // Auto-heal products if they have old image paths, missing status, or outdated categories
  const existingProducts = await Product.find({});
  if (existingProducts.length > 0) {
    for (const prod of existingProducts) {
      let updated = false;
      if (prod.images && prod.images.length > 0) {
        const newImages = prod.images.map((img: string) => img.replace("/src/assets/products/", "/products/"));
        if (JSON.stringify(newImages) !== JSON.stringify(prod.images)) {
          prod.images = newImages;
          updated = true;
        }
      }
      if (!prod.status) {
        prod.status = "Published";
        updated = true;
      }
      // Standardize categories strictly to "Books" or "Cloth"
      const nameCat = `${prod.name} ${prod.category}`.toLowerCase();
      const targetCat = (nameCat.includes("book") || nameCat.includes("journal") || nameCat.includes("read") || nameCat.includes("story")) ? "Books" : "Cloth";
      if (prod.category !== targetCat) {
        prod.category = targetCat;
        updated = true;
      }
      if (updated) {
        await prod.save();
      }
    }
  }

  const productCount = await Product.countDocuments();
  if (productCount === 0) {
    console.log("Seeding default shop merchandise products into MongoDB...");
    await Product.insertMany([
      {
        name: "SOAR Empowered Purple & Gold Hoodie",
        slug: "soar-empowered-purple-gold-hoodie",
        price: 65,
        salePrice: 55,
        category: "Apparel",
        shortDescription: "Ultra-soft premium heavyweight cotton fleece hoodie featuring embroidered metallic gold SOAR emblem.",
        description: "Wrap yourself in luxury and solidarity. Crafted from 400GSM organic cotton fleece, this rich royal purple hoodie features subtle metallic gold embroidery on the chest and a cozy double-lined hood. 100% of proceeds support SOAR's homeownership mentorship tracks for women.",
        images: [
          "/products/hoodie.png"
        ],
        variants: [
          { name: "Size", options: ["S", "M", "L", "XL", "2XL"] },
          { name: "Color", options: ["Royal Purple", "Midnight Black"] }
        ],
        sku: "SOAR-HOOD-001",
        stock: 45,
        status: "Published",
        isFeatured: true,
        rating: 5.0,
        numReviews: 12,
        reviews: [
          {
            id: "rev-1",
            user: "Marcus V.",
            avatar: "",
            rating: 5,
            comment: "The quality is unbelievable. Extremely soft, heavy, and the gold stitching looks so elegant!",
            date: "2026-07-20"
          },
          {
            id: "rev-2",
            user: "Elena R.",
            avatar: "",
            rating: 5,
            comment: "Bought 2 hoodies for my sister and myself. Proud to support such an inspiring organization!",
            date: "2026-07-22"
          }
        ]
      },
      {
        name: "Sovereignty Luxury Silk Scarf",
        slug: "sovereignty-luxury-silk-scarf",
        price: 45,
        category: "Accessories",
        shortDescription: "100% pure Mulberry silk scarf adorned with custom geometric gold filigree and SOAR seal.",
        description: "Elevate any attire with this handcrafted 100% Mulberry silk scarf. Featuring vibrant royal purple dye and intricate gold geometric motifs inspired by resilience and sisterhood. Finished with hand-rolled edges.",
        images: [
          "/products/scarf.png"
        ],
        variants: [
          { name: "Color", options: ["Royal Purple & Gold", "Emerald & Gold"] }
        ],
        sku: "SOAR-SCRF-002",
        stock: 30,
        status: "Published",
        isFeatured: true,
        rating: 4.9,
        numReviews: 8,
        reviews: [
          {
            id: "rev-3",
            user: "Patricia K.",
            avatar: "",
            rating: 5,
            comment: "Silky smooth and looks incredible with formal and professional wear. Highly recommended!",
            date: "2026-07-18"
          }
        ]
      },
      {
        name: "SOAR Gold Plated Soaring Wing Pendant",
        slug: "soar-gold-plated-soaring-wing-pendant",
        price: 85,
        salePrice: 75,
        category: "Jewelry",
        shortDescription: "18k gold-plated soaring wing necklace featuring a brilliant genuine amethyst stone accent.",
        description: "A symbol of transformation and rising above adversity. Crafted in 18k yellow gold-plated sterling silver with a delicate amethyst gem at the base. Includes an adjustable 18-20 inch box chain.",
        images: [
          "/products/pendant.png"
        ],
        variants: [
          { name: "Metal", options: ["18k Gold Plated", "Sterling Silver"] }
        ],
        sku: "SOAR-JWL-003",
        stock: 18,
        status: "Published",
        isFeatured: true,
        rating: 5.0,
        numReviews: 15,
        reviews: [
          {
            id: "rev-4",
            user: "Denise M.",
            avatar: "",
            rating: 5,
            comment: "I wear this necklace every day as a reminder of my own journey. Beautiful craftsmanship.",
            date: "2026-07-15"
          }
        ]
      },
      {
        name: "Sisterhood Rise Ceramic Mug (15oz)",
        slug: "sisterhood-rise-ceramic-mug",
        price: 22,
        category: "Home & Gift",
        shortDescription: "Matte black ceramic coffee mug with metallic gold interior and embossed SOAR logo.",
        description: "Start every morning with purpose. High-fired ceramic mug with a gorgeous metallic gold interior wall and subtle matte exterior finish. Dishwasher and microwave safe.",
        images: [
          "/products/hoodie.png"
        ],
        variants: [
          { name: "Color", options: ["Black & Gold", "Purple & Gold"] }
        ],
        sku: "SOAR-MUG-004",
        stock: 60,
        status: "Published",
        isFeatured: false,
        rating: 4.8,
        numReviews: 6,
        reviews: []
      },
      {
        name: "Daily Sovereignty Guided Journal",
        slug: "daily-sovereignty-guided-journal",
        price: 28,
        category: "Books & Stationery",
        shortDescription: "Hardcover linen notebook with gold foil stamping, 200 ribbon-marked pages for goal tracking.",
        description: "Designed by SOAR mentors to empower women on their journey to financial literacy, personal growth, and homeownership. Features daily prompts, budget tracking templates, and inspirational quotes.",
        images: [
          "/products/scarf.png"
        ],
        variants: [],
        sku: "SOAR-JRNL-005",
        stock: 40,
        status: "Published",
        isFeatured: false,
        rating: 4.9,
        numReviews: 4,
        reviews: []
      }
    ]);
  }

  const orderCount = await Order.countDocuments();
  if (orderCount === 0) {
    console.log("Seeding sample orders into MongoDB...");
    await Order.insertMany([
      {
        orderNumber: "SOAR-1001",
        customer: {
          name: "Sophia Martinez",
          email: "sophia.m@example.com",
          phone: "(407) 555-0142",
          address: {
            street: "452 Summerlin Ave",
            city: "Orlando",
            state: "FL",
            zip: "32801",
            country: "USA"
          }
        },
        items: [
          {
            productId: "seed-1",
            name: "SOAR Empowered Purple & Gold Hoodie",
            price: 55,
            quantity: 1,
            image: "/products/hoodie.png",
            variant: "Size: L, Color: Royal Purple"
          },
          {
            productId: "seed-2",
            name: "Sovereignty Luxury Silk Scarf",
            price: 45,
            quantity: 1,
            image: "/products/scarf.png",
            variant: "Color: Royal Purple & Gold"
          }
        ],
        subtotal: 100,
        tax: 7,
        shipping: 0,
        total: 107,
        paymentStatus: "Paid",
        paymentMethod: "Credit Card",
        orderStatus: "Delivered",
        created_at: new Date(Date.now() - 86400000 * 5)
      },
      {
        orderNumber: "SOAR-1002",
        customer: {
          name: "Amara Johnson",
          email: "amara.j@example.com",
          phone: "(407) 555-0891",
          address: {
            street: "1280 West Colonial Dr",
            city: "Orlando",
            state: "FL",
            zip: "32804",
            country: "USA"
          }
        },
        items: [
          {
            productId: "seed-3",
            name: "SOAR Gold Plated Soaring Wing Pendant",
            price: 75,
            quantity: 1,
            image: "/products/pendant.png",
            variant: "Metal: 18k Gold Plated"
          }
        ],
        subtotal: 75,
        tax: 5.25,
        shipping: 5,
        total: 85.25,
        paymentStatus: "Paid",
        paymentMethod: "Apple Pay",
        orderStatus: "Processing",
        created_at: new Date(Date.now() - 86400000 * 2)
      }
    ]);

    await CustomerProfile.insertMany([
      {
        name: "Sophia Martinez",
        email: "sophia.m@example.com",
        phone: "(407) 555-0142",
        totalOrders: 1,
        totalSpent: 107,
        lastOrderDate: new Date(Date.now() - 86400000 * 5)
      },
      {
        name: "Amara Johnson",
        email: "amara.j@example.com",
        phone: "(407) 555-0891",
        totalOrders: 1,
        totalSpent: 85.25,
        lastOrderDate: new Date(Date.now() - 86400000 * 2)
      }
    ]);
  }

  const donationCount = await Donation.countDocuments();
  if (donationCount === 0) {
    console.log("Seeding initial foundation donations into MongoDB...");
    await Donation.insertMany([
      {
        donorName: "Elena Rostova",
        donorEmail: "elena.rostova@example.com",
        donorPhone: "(407) 555-0192",
        amount: 500,
        giftType: "Sponsor a Family",
        fundCategory: "Homeownership Education",
        paymentMethod: "Stripe Credit Card",
        paymentStatus: "Completed",
        stripePaymentId: "ch_3N8v_seed_001",
        message: "Dedicated to supporting women building generational wealth through homeownership.",
        created_at: new Date(Date.now() - 86400000 * 1)
      },
      {
        donorName: "Marcus Vance",
        donorEmail: "marcus.v@example.com",
        donorPhone: "(321) 555-0811",
        amount: 100,
        giftType: "Monthly",
        fundCategory: "Financial Literacy Workshops",
        paymentMethod: "Stripe Card",
        paymentStatus: "Completed",
        stripePaymentId: "ch_3N8v_seed_002",
        created_at: new Date(Date.now() - 86400000 * 3)
      },
      {
        donorName: "Dr. Patricia King",
        donorEmail: "patricia.k@example.com",
        donorPhone: "(407) 555-0431",
        amount: 1000,
        giftType: "One-time",
        fundCategory: "Where needed most",
        paymentMethod: "Stripe Credit Card",
        paymentStatus: "Completed",
        stripePaymentId: "ch_3N8v_seed_003",
        isTribute: true,
        tributeName: "In memory of Sarah King",
        message: "In honor of my mother who taught me the true value of independence.",
        created_at: new Date(Date.now() - 86400000 * 5)
      }
    ]);
  }
}

// Donation Interface & Model
export interface IDonation extends Document {
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
  created_at: Date;
}

const DonationSchema = new Schema<IDonation>({
  donorName: { type: String, required: true },
  donorEmail: { type: String, required: true },
  donorPhone: { type: String, default: "" },
  amount: { type: Number, required: true },
  giftType: { type: String, default: "One-time" },
  fundCategory: { type: String, default: "Where needed most" },
  paymentMethod: { type: String, default: "Stripe Credit Card" },
  paymentStatus: { type: String, default: "Completed" },
  stripePaymentId: { type: String, default: "" },
  tributeName: { type: String, default: "" },
  isTribute: { type: Boolean, default: false },
  message: { type: String, default: "" },
  created_at: { type: Date, default: Date.now },
});

export const Donation = mongoose.models.Donation || mongoose.model<IDonation>("Donation", DonationSchema);

// AdminUser Interface & Schema
export interface IAdminUser {
  username: string;
  password: string;
  email: string;
  name: string;
  avatar_url?: string;
  role?: string;
  failed_attempts?: number;
  lockout_until?: Date | null;
  updated_at: Date;
}

const AdminUserSchema = new Schema<IAdminUser>({
  username: { type: String, required: true, default: "admin" },
  password: { type: String, required: true, default: "admin" },
  email: { type: String, default: "sistersoar14@gmail.com" },
  name: { type: String, default: "Myrtle Dixon" },
  avatar_url: { type: String, default: "" },
  role: { type: String, default: "Super Administrator" },
  failed_attempts: { type: Number, default: 0 },
  lockout_until: { type: Date, default: null },
  updated_at: { type: Date, default: Date.now },
});

export const AdminUser = mongoose.models.AdminUser || mongoose.model<IAdminUser>("AdminUser", AdminUserSchema);


