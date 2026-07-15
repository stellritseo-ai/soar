import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { PageHeader } from "@/components/site/PageHeader";
import { useState } from "react";
import {
  Heart,
  Sparkles,
  DollarSign,
  Gift,
  Check,
  CheckCircle2,
  CreditCard,
  Lock,
  ChevronRight,
  ChevronDown,
  Shield,
  Phone,
  Mail,
  FileText,
  Award,
  ArrowRight,
  ArrowLeft,
  Users,
  TrendingUp,
  MapPin,
  HelpCircle,
  Briefcase,
  Share2
} from "lucide-react";
import { toast } from "sonner";
import donateHero from "@/assets/donate-hero.png";
import donateWorkshop from "@/assets/donate-workshop.png";

export const Route = createFileRoute("/donate")({
  head: () => ({
    meta: [
      { title: "Donate Now — SOAR Global Foundation" },
      {
        name: "description",
        content: "Support SOAR Global Foundation. Empower women to achieve homeownership, financial literacy, and lasting independence."
      },
      { property: "og:title", content: "Donate Now — SOAR Global Foundation" },
      { property: "og:url", content: "/donate" }
    ],
    links: [{ rel: "canonical", href: "/donate" }]
  }),
  component: DonatePage
});

const presetAmounts = [
  { value: 25, label: "$25", impact: "Provides financial literacy materials for one woman" },
  { value: 50, label: "$50", impact: "Covers one mentorship session" },
  { value: 100, label: "$100", impact: "Supports a homeownership education workshop" },
  { value: 250, label: "$250", impact: "Funds down payment assistance for a family" },
  { value: 500, label: "$500", impact: "Sponsors a full program enrollment for one woman" },
  { value: 1000, label: "$1,000", impact: "Supports wraparound family services for a mother and her children" },
  { value: 5000, label: "$5,000", impact: "Helps secure an energy-efficient home for a family" }
];

const designations = [
  { id: "general", label: "Where needed most" },
  { id: "literacy", label: "Financial Literacy Workshops" },
  { id: "education", label: "Homeownership Education" },
  { id: "mentorship", label: "Mentorship Program" },
  { id: "family", label: "Family Support Services" },
  { id: "housing", label: "Affordable Housing Access" }
];

const faqs = [
  {
    q: "Is my donation tax-deductible?",
    a: "Yes. SOAR Global Foundation Inc. is a registered 501(c)(3) nonprofit organization. All contributions are tax-deductible to the fullest extent permitted by law."
  },
  {
    q: "What is your tax ID number?",
    a: "Our tax ID number (EIN) is available upon request. Please contact us at sistersoar14@gmail.com for official documentation."
  },
  {
    q: "How will my donation be used?",
    a: "Your donation supports our core programs: Financial Literacy Workshops, Homeownership Education, Mentorship Program, Family Support Services, and Affordable Housing Access. You can designate your gift to a specific program during the checkout process."
  },
  {
    q: "How do I receive a receipt for my donation?",
    a: "All donors receive an email receipt immediately after giving online. Mail-in donations receive receipts via mail within 2-3 weeks."
  },
  {
    q: "Can I make a gift in honor or memory of someone?",
    a: "Yes. We are honored to accept gifts made in tribute to loved ones. In Step 3 of the donation form, check the option 'Make this donation in honor/memory of someone' to provide their details."
  },
  {
    q: "How do I update my donor or monthly giving information?",
    a: "Please contact our support team at (321) 710-7145 or email sistersoar14@gmail.com, and we will gladly update your account, amount, or billing information."
  },
  {
    q: "What is your privacy policy?",
    a: "We respect your privacy. We do not sell, trade, or share your personal information with third parties. You may opt out of future communications at any time."
  },
  {
    q: "Who can I contact with questions?",
    a: "Please reach out to our team at (321) 710-7145 or sistersoar14@gmail.com. We are here to help!"
  }
];

const successStories = [
  {
    quote: "SOAR walked with me from a shelter to my very own front door. I finally have a home for my daughters — and a future. None of this would have been possible without the generosity of donors who believed in me.",
    author: "Amara J.",
    tagline: "First-time Homeowner"
  },
  {
    quote: "The mentorship changed everything. I launched my business, rebuilt my credit, and I'm about to close on my first house. Thank you to everyone who made this possible.",
    author: "Isabela R.",
    tagline: "Program Graduate"
  },
  {
    quote: "I dreamed again for the first time in years. SOAR gave me tools, sisters, and hope I can pass down. Your support made all the difference.",
    author: "Denise M.",
    tagline: "SOAR Circle Member"
  }
];

function DonatePage() {
  const [formStep, setFormStep] = useState(1);
  const [giftType, setGiftType] = useState<"one-time" | "monthly">("one-time");
  const [selectedAmount, setSelectedAmount] = useState<number | null>(100);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [designation, setDesignation] = useState("general");

  // Donor Info
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");

  // Payment Info
  const [cardType, setCardType] = useState("visa");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");

  // Additional Options
  const [coverFee, setCoverFee] = useState(false);
  const [isTribute, setIsTribute] = useState(false);
  const [tributeName, setTributeName] = useState("");

  // Review & Submit
  const [reviewed, setReviewed] = useState(false);
  const [agreedTerms, setAgreedTerms] = useState(false);

  // Success Dialog State
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // FAQ state
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Calculate final amount
  const activeAmount = customAmount ? parseFloat(customAmount) || 0 : selectedAmount || 0;
  const processingFee = activeAmount * 0.03;
  const totalAmount = coverFee ? activeAmount + processingFee : activeAmount;

  // Handle Amount selection
  const handlePresetSelect = (val: number) => {
    setSelectedAmount(val);
    setCustomAmount("");
  };

  const handleCustomAmountChange = (val: string) => {
    setCustomAmount(val);
    setSelectedAmount(null);
  };

  // Find impact statement
  const currentImpact = presetAmounts.find(p => p.value === activeAmount)?.impact 
    || (activeAmount > 0 ? `Empowers women through programs for lasting independence` : "Select an amount to see your impact");

  // Basic step navigation validation
  const handleNextStep = () => {
    if (formStep === 1) {
      if (activeAmount <= 0) {
        toast.error("Please select or enter a donation amount.");
        return;
      }
      setFormStep(2);
    } else if (formStep === 2) {
      if (!firstName || !lastName || !email || !address || !city || !state || !zip) {
        toast.error("Please fill in all required personal information fields.");
        return;
      }
      // Simple email validation regex
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        toast.error("Please enter a valid email address.");
        return;
      }
      setFormStep(3);
    }
  };

  // Handle Submit
  const handleSubmitDonation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardNumber || !cardExpiry || !cardCvv) {
      toast.error("Please fill in your payment details.");
      return;
    }
    if (!reviewed || !agreedTerms) {
      toast.error("Please review details and agree to terms & conditions.");
      return;
    }
    
    // Simulate successful API call
    setShowSuccessModal(true);
  };

  const resetForm = () => {
    setFormStep(1);
    setSelectedAmount(100);
    setCustomAmount("");
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
    setAddress("");
    setCity("");
    setState("");
    setZip("");
    setCardNumber("");
    setCardExpiry("");
    setCardCvv("");
    setCoverFee(false);
    setIsTribute(false);
    setTributeName("");
    setReviewed(false);
    setAgreedTerms(false);
    setShowSuccessModal(false);
  };

  return (
    <SiteLayout>
      <div className="bg-gradient-to-b from-background via-[#FDFBF7] to-[#F3F0F8]/40 min-h-screen">
        <PageHeader
          eyebrow="Empower & Elevate"
          title={<>Help a Woman <span className="text-gradient-brand italic font-extrabold">Dream Again</span>.</>}
          subtitle="Your generosity plants a seed of possibility — a workshop attended, a mentor met, a key placed in her hand. Every donation creates a ripple effect that transforms lives."
          bgImage={donateHero}
        />

        {/* Introduction Section */}
        <section className="mx-auto max-w-7xl px-6 py-12 lg:px-10 grid gap-12 lg:grid-cols-2 items-center">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-primary">
              <Heart className="size-3.5 fill-primary" /> Joint Movement
            </span>
            <h2 className="font-display text-4xl font-extrabold text-foreground tracking-tight leading-tight">
              Create a Legacy of Sovereignty
            </h2>
            <p className="text-lg leading-relaxed text-muted-foreground">
              When you give to SOAR Global Foundation Inc., you are not just making a donation. You are joining a movement of supporters who believe that every woman deserves the opportunity to own her home, achieve her dreams, and live with dignity.
            </p>
            <p className="text-base leading-relaxed text-primary-deep font-semibold border-l-4 border-accent pl-4 italic">
              "Your gift makes a real, immediate difference. Every dollar directly supports programs that empower women to achieve homeownership and lasting independence."
            </p>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 rounded-[36px] bg-gradient-to-r from-accent/20 to-primary/10 opacity-30 blur-2xl" />
            <div className="relative overflow-hidden rounded-[24px] border border-white/60 shadow-elegant">
              <img src={donateWorkshop} alt="Women at SOAR workshop" className="aspect-[4/3] w-full object-cover" />
            </div>
          </div>
        </section>

        {/* Main Interactive Checkout Section */}
        <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-10">
          <div id="donation-builder" className="grid gap-10 lg:grid-cols-12 items-start mt-8">
            
            {/* Donation Form Card (Left/Main Column) */}
            <div className="lg:col-span-7 bg-white/70 backdrop-blur-xl border border-white/80 rounded-3xl p-6 sm:p-8 shadow-elegant relative overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-1.5 gradient-brand" />
              
              {/* Form Step Headers */}
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-border/60">
                <div className={`flex items-center gap-2 ${formStep >= 1 ? "text-primary" : "text-muted-foreground"}`}>
                  <span className={`size-7 rounded-full flex items-center justify-center text-xs font-bold ${formStep === 1 ? "bg-primary text-white" : formStep > 1 ? "bg-primary/20 text-primary" : "bg-muted"}`}>
                    {formStep > 1 ? <Check className="size-4" /> : "1"}
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider hidden sm:inline">Amount</span>
                </div>
                <div className="h-px bg-border flex-1 mx-4 max-w-[60px]" />
                <div className={`flex items-center gap-2 ${formStep >= 2 ? "text-primary" : "text-muted-foreground"}`}>
                  <span className={`size-7 rounded-full flex items-center justify-center text-xs font-bold ${formStep === 2 ? "bg-primary text-white" : formStep > 2 ? "bg-primary/20 text-primary" : "bg-muted"}`}>
                    {formStep > 2 ? <Check className="size-4" /> : "2"}
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider hidden sm:inline">Details</span>
                </div>
                <div className="h-px bg-border flex-1 mx-4 max-w-[60px]" />
                <div className={`flex items-center gap-2 ${formStep >= 3 ? "text-primary" : "text-muted-foreground"}`}>
                  <span className={`size-7 rounded-full flex items-center justify-center text-xs font-bold ${formStep === 3 ? "bg-primary text-white" : "bg-muted"}`}>
                    3
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider hidden sm:inline">Payment</span>
                </div>
              </div>

              <form onSubmit={handleSubmitDonation}>
                
                {/* STEP 1: AMOUNT & FREQUENCY */}
                {formStep === 1 && (
                  <div className="space-y-6 animate-fade-up">
                    <div>
                      <h3 className="text-xl font-bold text-foreground">Select Your Gift Type</h3>
                      <p className="text-xs text-muted-foreground mt-1">Choose how often you would like to give to SOAR</p>
                      
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <button
                          type="button"
                          onClick={() => setGiftType("one-time")}
                          className={`py-3.5 px-4 rounded-xl font-semibold text-sm border transition duration-200 flex items-center justify-center gap-2 ${giftType === "one-time" ? "border-primary bg-primary/5 text-primary shadow-sm" : "border-border hover:bg-secondary/40 text-foreground/80"}`}
                        >
                          One-Time Donation
                        </button>
                        <button
                          type="button"
                          onClick={() => setGiftType("monthly")}
                          className={`py-3.5 px-4 rounded-xl font-semibold text-sm border transition duration-200 flex items-center justify-center gap-2 relative ${giftType === "monthly" ? "border-primary bg-primary/5 text-primary shadow-sm" : "border-border hover:bg-secondary/40 text-foreground/80"}`}
                        >
                          Monthly Donation
                          <span className="absolute -top-2.5 right-2 text-[8px] bg-accent text-accent-foreground font-black px-2 py-0.5 rounded-full uppercase tracking-wider animate-pulse">
                            SOAR Circle
                          </span>
                        </button>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-foreground">Choose Your Gift Amount</h3>
                      <p className="text-xs text-muted-foreground mt-1">Suggested amount guidelines and impacts below</p>
                      
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
                        {presetAmounts.slice(0, 4).map(amt => (
                          <button
                            key={amt.value}
                            type="button"
                            onClick={() => handlePresetSelect(amt.value)}
                            className={`py-3 px-3 rounded-xl border text-sm font-semibold transition duration-200 ${selectedAmount === amt.value ? "border-primary bg-primary text-white shadow-soft" : "border-border hover:bg-secondary/40 text-foreground/80"}`}
                          >
                            ${amt.value}
                          </button>
                        ))}
                        {presetAmounts.slice(4, 7).map(amt => (
                          <button
                            key={amt.value}
                            type="button"
                            onClick={() => handlePresetSelect(amt.value)}
                            className={`py-3 px-3 rounded-xl border text-sm font-semibold transition duration-200 ${selectedAmount === amt.value ? "border-primary bg-primary text-white shadow-soft" : "border-border hover:bg-secondary/40 text-foreground/80"}`}
                          >
                            ${amt.value.toLocaleString()}
                          </button>
                        ))}
                        
                        {/* Custom Input Wrapper */}
                        <div className="relative col-span-2 sm:col-span-1">
                          <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                          <input
                            type="number"
                            placeholder="Custom"
                            value={customAmount}
                            onChange={(e) => handleCustomAmountChange(e.target.value)}
                            className={`w-full h-full min-h-[46px] pl-8 pr-3 rounded-xl border text-sm font-semibold focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary ${customAmount ? "border-primary bg-primary/5 text-primary" : "border-border"}`}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Impact preview inside the step */}
                    <div className="bg-[#FFFDF9] border border-accent/15 rounded-2xl p-4 flex items-start gap-3">
                      <Gift className="size-5 text-accent mt-0.5 shrink-0" />
                      <div>
                        <span className="text-[10px] uppercase font-bold tracking-widest text-accent">Your Impact</span>
                        <p className="text-sm font-bold text-primary-deep mt-0.5">{currentImpact}</p>
                      </div>
                    </div>

                    <div className="pt-2 flex justify-end">
                      <button
                        type="button"
                        onClick={handleNextStep}
                        className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-primary-deep text-white px-6 py-3 text-sm font-bold uppercase tracking-wider hover:scale-[1.02] active:scale-[0.98] transition shadow-soft cursor-pointer"
                      >
                        Continue <ArrowRight className="size-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 2: YOUR INFO & DESIGNATION */}
                {formStep === 2 && (
                  <div className="space-y-6 animate-fade-up">
                    <div>
                      <h3 className="text-xl font-bold text-foreground">Designate Your Gift</h3>
                      <p className="text-xs text-muted-foreground mt-1">Direct your support to a program close to your heart</p>
                      
                      <div className="relative mt-3">
                        <select
                          value={designation}
                          onChange={(e) => setDesignation(e.target.value)}
                          className="w-full bg-white border border-border rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary appearance-none cursor-pointer"
                        >
                          {designations.map(opt => (
                            <option key={opt.id} value={opt.id}>{opt.label}</option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 size-4 pointer-events-none text-muted-foreground" />
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-foreground">Your Personal Information</h3>
                      <p className="text-xs text-muted-foreground mt-1">All fields are required for receipting and compliance</p>
                      
                      <div className="grid sm:grid-cols-2 gap-4 mt-4">
                        <div>
                          <label className="text-xs font-bold text-foreground/80 block mb-1">First Name *</label>
                          <input
                            type="text"
                            required
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            placeholder="Jane"
                            className="w-full border border-border rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-bold text-foreground/80 block mb-1">Last Name *</label>
                          <input
                            type="text"
                            required
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            placeholder="Doe"
                            className="w-full border border-border rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <label className="text-xs font-bold text-foreground/80 block mb-1">Email Address *</label>
                          <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="jane.doe@example.com"
                            className="w-full border border-border rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <label className="text-xs font-bold text-foreground/80 block mb-1">Phone Number</label>
                          <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="(123) 456-7890"
                            className="w-full border border-border rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <label className="text-xs font-bold text-foreground/80 block mb-1">Street Address *</label>
                          <input
                            type="text"
                            required
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="123 Hope Lane"
                            className="w-full border border-border rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-bold text-foreground/80 block mb-1">City *</label>
                          <input
                            type="text"
                            required
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            placeholder="Orlando"
                            className="w-full border border-border rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="text-xs font-bold text-foreground/80 block mb-1">State *</label>
                            <input
                              type="text"
                              required
                              value={state}
                              onChange={(e) => setState(e.target.value)}
                              placeholder="FL"
                              className="w-full border border-border rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                            />
                          </div>
                          <div>
                            <label className="text-xs font-bold text-foreground/80 block mb-1">ZIP *</label>
                            <input
                              type="text"
                              required
                              value={zip}
                              onChange={(e) => setZip(e.target.value)}
                              placeholder="32818"
                              className="w-full border border-border rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 flex justify-between items-center">
                      <button
                        type="button"
                        onClick={() => setFormStep(1)}
                        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground hover:text-primary transition"
                      >
                        <ArrowLeft className="size-4" /> Back to Amount
                      </button>
                      <button
                        type="button"
                        onClick={handleNextStep}
                        className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-primary-deep text-white px-6 py-3 text-sm font-bold uppercase tracking-wider hover:scale-[1.02] active:scale-[0.98] transition shadow-soft cursor-pointer"
                      >
                        Go to Payment <ArrowRight className="size-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 3: PAYMENT & REVIEW */}
                {formStep === 3 && (
                  <div className="space-y-6 animate-fade-up">
                    <div>
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold text-foreground">Secure Payment Details</h3>
                        <div className="flex items-center gap-1.5 text-emerald-600 text-xs font-bold">
                          <Lock className="size-3.5" /> Encrypted
                        </div>
                      </div>
                      
                      {/* Card Type Selector */}
                      <div className="grid grid-cols-4 gap-2 mt-4">
                        {["visa", "mastercard", "amex", "discover"].map(type => (
                          <button
                            key={type}
                            type="button"
                            onClick={() => setCardType(type)}
                            className={`py-2 px-3 rounded-lg border text-xs font-semibold capitalize flex items-center justify-center gap-1 transition ${cardType === type ? "border-primary bg-primary/5 text-primary shadow-sm font-bold" : "border-border hover:bg-secondary/40 text-muted-foreground"}`}
                          >
                            <CreditCard className="size-3.5" /> {type === "mastercard" ? "Master" : type === "amex" ? "Amex" : type}
                          </button>
                        ))}
                      </div>

                      {/* Card Form */}
                      <div className="grid grid-cols-3 gap-4 mt-4">
                        <div className="col-span-3">
                          <label className="text-xs font-bold text-foreground/80 block mb-1">Card Number *</label>
                          <input
                            type="text"
                            required
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            placeholder="4111 2222 3333 4444"
                            maxLength={19}
                            className="w-full border border-border rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                          />
                        </div>
                        <div className="col-span-2">
                          <label className="text-xs font-bold text-foreground/80 block mb-1">Expiration Date *</label>
                          <input
                            type="text"
                            required
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value)}
                            placeholder="MM / YY"
                            maxLength={7}
                            className="w-full border border-border rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-bold text-foreground/80 block mb-1">CVV *</label>
                          <input
                            type="password"
                            required
                            value={cardCvv}
                            onChange={(e) => setCardCvv(e.target.value)}
                            placeholder="123"
                            maxLength={4}
                            className="w-full border border-border rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Additional Options */}
                    <div className="space-y-3 pt-2">
                      <label className="flex items-start gap-2.5 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={coverFee}
                          onChange={(e) => setCoverFee(e.target.checked)}
                          className="mt-1 accent-primary size-4"
                        />
                        <span className="text-xs text-muted-foreground leading-snug group-hover:text-foreground transition">
                          I would like to cover the processing fee of <strong>${processingFee.toFixed(2)}</strong> so SOAR receives 100% of my donation.
                        </span>
                      </label>

                      <label className="flex items-start gap-2.5 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={isTribute}
                          onChange={(e) => setIsTribute(e.target.checked)}
                          className="mt-1 accent-primary size-4"
                        />
                        <span className="text-xs text-muted-foreground leading-snug group-hover:text-foreground transition">
                          I would like to make this donation in honor/memory of someone
                        </span>
                      </label>

                      {isTribute && (
                        <div className="pl-6 animate-fade-up">
                          <label className="text-xs font-bold text-foreground/80 block mb-1">Honoree's Full Name</label>
                          <input
                            type="text"
                            value={tributeName}
                            onChange={(e) => setTributeName(e.target.value)}
                            placeholder="Honoree's Name"
                            className="w-full border border-border rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                          />
                        </div>
                      )}
                    </div>

                    {/* Checkboxes Review & Terms */}
                    <div className="border-t border-border/60 pt-4 space-y-3">
                      <label className="flex items-center gap-2.5 cursor-pointer">
                        <input
                          type="checkbox"
                          required
                          checked={reviewed}
                          onChange={(e) => setReviewed(e.target.checked)}
                          className="accent-primary size-4"
                        />
                        <span className="text-xs font-semibold text-foreground/90">
                          I have reviewed my donation details *
                        </span>
                      </label>

                      <label className="flex items-center gap-2.5 cursor-pointer">
                        <input
                          type="checkbox"
                          required
                          checked={agreedTerms}
                          onChange={(e) => setAgreedTerms(e.target.checked)}
                          className="accent-primary size-4"
                        />
                        <span className="text-xs font-semibold text-foreground/90">
                          I agree to the <Link to="/terms" className="text-primary hover:underline">terms and conditions</Link> *
                        </span>
                      </label>
                    </div>

                    {/* Footer Actions */}
                    <div className="pt-2 flex flex-col sm:flex-row gap-4 items-center justify-between">
                      <button
                        type="button"
                        onClick={() => setFormStep(2)}
                        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground hover:text-primary transition"
                      >
                        <ArrowLeft className="size-4" /> Back to Details
                      </button>
                      
                      <button
                        type="submit"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F2D27C] text-[#0C1220] px-8 py-3.5 text-sm font-bold uppercase tracking-wider hover:scale-[1.02] active:scale-[0.98] transition shadow-soft cursor-pointer"
                      >
                        <Heart className="size-4 fill-current" /> Complete Donation
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </div>

            {/* Donation Sidebar: Summary & Real-time Impact (Right Column) */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Live Donation Summary Box */}
              <div className="bg-[#3A0A63] text-white rounded-3xl p-6 sm:p-8 shadow-elegant relative overflow-hidden border border-primary-deep/20">
                <div className="absolute right-[-20%] bottom-[-20%] size-[220px] rounded-full bg-primary/20 blur-3xl" />
                <div className="absolute left-[-10%] top-[-10%] size-[150px] rounded-full bg-accent/15 blur-2xl" />
                
                <div className="relative space-y-6">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#D4AF37]">Donation Summary</span>
                    <h3 className="text-2xl font-extrabold tracking-tight mt-1">Your Support</h3>
                  </div>

                  <div className="border-t border-white/10 pt-4 space-y-3">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-white/60">Gift Amount</span>
                      <span className="font-bold text-white">${activeAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-white/60">Frequency</span>
                      <span className="font-bold text-white capitalize">{giftType === "one-time" ? "One-Time" : "Monthly"}</span>
                    </div>
                    {coverFee && (
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-white/60">Processing Fee</span>
                        <span className="font-bold text-white">${processingFee.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-white/60">Designation</span>
                      <span className="font-bold text-white">
                        {designations.find(d => d.id === designation)?.label || "Where needed most"}
                      </span>
                    </div>
                    
                    <div className="h-px bg-white/10 my-4" />
                    
                    <div className="flex justify-between items-end">
                      <span className="text-sm text-white/80 font-semibold">Total Donation</span>
                      <span className="text-3xl font-extrabold text-[#D4AF37] leading-none">
                        ${totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                    </div>
                  </div>

                  <div className="border-t border-white/10 pt-4">
                    <div className="flex gap-2">
                      <Shield className="size-4 text-[#D4AF37] shrink-0 mt-0.5" />
                      <p className="text-[11px] text-white/50 leading-relaxed">
                        SOAR Global Foundation is a 501(c)(3) organization. Your donation is fully tax-deductible to the extent allowed by law.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Dynamic Impact Info List */}
              <div className="bg-[#FDFBF7] border border-border/80 rounded-3xl p-6 sm:p-8 space-y-6">
                <h4 className="font-display text-lg font-bold text-foreground tracking-tight border-b border-border/60 pb-3">
                  Your Gift Makes a Difference
                </h4>
                <div className="space-y-4">
                  {presetAmounts.map((preset) => {
                    const isActive = activeAmount === preset.value;
                    return (
                      <div
                        key={preset.value}
                        onClick={() => handlePresetSelect(preset.value)}
                        className={`flex gap-3 items-start p-3 rounded-xl border transition cursor-pointer ${isActive ? "border-primary bg-primary/5 text-primary shadow-sm" : "border-transparent hover:bg-secondary/40 text-foreground"}`}
                      >
                        <div className={`size-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5 ${isActive ? "bg-primary text-white" : "bg-muted text-muted-foreground"}`}>
                          ${preset.value >= 1000 ? `${preset.value / 1000}k` : preset.value}
                        </div>
                        <div>
                          <span className={`text-xs font-bold ${isActive ? "text-primary" : "text-foreground"}`}>
                            {preset.label} Impact
                          </span>
                          <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">
                            {preset.impact}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Monthly Supporter Program Callout Section */}
        <section className="bg-gradient-to-br from-[#FFFDF9] to-[#FDFBF7] border-y border-border/80 py-20">
          <div className="mx-auto max-w-5xl px-6 lg:px-10">
            <div className="bg-white/80 border-2 border-accent/25 rounded-[32px] p-8 md:p-12 shadow-elegant relative overflow-hidden flex flex-col md:flex-row items-center gap-8 md:gap-12">
              
              <div className="absolute -left-12 -top-12 size-[150px] rounded-full bg-accent/5 blur-2xl" />
              <div className="absolute right-[-5%] bottom-[-5%] size-[150px] rounded-full bg-primary/5 blur-2xl" />
              
              <div className="flex-1 space-y-5">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/5 px-4 py-1 text-xs font-bold uppercase tracking-widest text-accent-foreground">
                  <Sparkles className="size-3 text-accent" /> The SOAR Circle
                </span>
                <h3 className="font-display text-3xl font-extrabold text-primary-deep tracking-tight">
                  Become a Monthly Supporter
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Join our community of sustaining supporters who make recurring monthly gifts. Monthly giving provides reliable, predictable funding that allows us to plan and expand our programs with confidence.
                </p>
                <div className="grid gap-2">
                  {[
                    "Consistent, reliable support for our core programs",
                    "Reduced administrative costs allowing more funds to help women",
                    "Deepened connection to our mission and real-time updates",
                    "Exclusive updates and impact newsletters from our leadership",
                    "Special recognition in our annual report"
                  ].map((benefit, i) => (
                    <div key={i} className="flex gap-2 items-center text-xs text-foreground/80">
                      <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
                <div className="pt-2">
                  <a
                    href="#donation-builder"
                    onClick={() => {
                      setGiftType("monthly");
                      setFormStep(1);
                      toast.info("Frequency changed to Monthly. Select your amount below!");
                    }}
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent to-[#F2D27C] text-accent-foreground px-6 py-3 text-xs font-bold uppercase tracking-wider hover:scale-[1.02] active:scale-[0.98] transition shadow-soft cursor-pointer"
                  >
                    Join The SOAR Circle
                  </a>
                </div>
              </div>
              <div className="w-full md:w-[280px] shrink-0 bg-[#3A0A63] text-white rounded-2xl p-6 shadow-elegant text-center relative border border-primary-deep">
                <div className="size-12 rounded-full bg-accent/25 mx-auto flex items-center justify-center mb-4">
                  <Award className="size-6 text-[#D4AF37]" />
                </div>
                <h4 className="font-display text-base font-bold text-[#D4AF37]">Donor Circle Benefits</h4>
                <p className="text-[11px] text-white/70 leading-relaxed mt-2">
                  Sustaining donors are the backbone of our organization. By giving monthly, you help us map out housing acquisitions, budget curricula, and provide continuous secure pathways for the sisters we serve.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Donate Section */}
        <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Transparency
            </span>
            <h2 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-foreground md:text-5xl">
              Why Donate to <span className="text-gradient-brand">SOAR</span>?
            </h2>
            <p className="mt-4 text-base text-muted-foreground max-w-2xl mx-auto">
              At SOAR Global Foundation Inc., we are committed to transparency, accountability, and making every single dollar count.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-12 items-stretch">
            
            {/* Column 1: Core commitments */}
            <div className="lg:col-span-6 space-y-6">
              <h3 className="text-2xl font-bold text-foreground tracking-tight border-b border-border pb-3">
                Your Dollars at Work
              </h3>
              
              <div className="space-y-4">
                {[
                  { title: "Direct Program Support", desc: "100% of designated gifts go directly to the specified program. We align donations with their target areas." },
                  { title: "Independent Financial Audits", desc: "Annual independent audits ensure financial accountability, regulatory compliance, and integrity." },
                  { title: "Board Oversight", desc: "Our board of directors provides active oversight of all financial allocations and budget approvals." },
                  { title: "Low Administrative Costs", desc: "We prioritize direct action over overhead. Low administrative costs maximize funding directly for program delivery." },
                  { title: "Measurable Impact Reports", desc: "We track and report concrete metrics — hours of mentorship, workshops hosted, homes secured — regularly." }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-3">
                    <div className="size-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-xs shrink-0 mt-0.5">
                      ✓
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-foreground">{item.title}</h4>
                      <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Column 2: Financial Model */}
            <div className="lg:col-span-6 flex flex-col justify-between bg-white border border-border/80 rounded-3xl p-6 sm:p-8 shadow-soft">
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-foreground tracking-tight">Our Financial Model</h3>
                  <p className="text-xs text-muted-foreground mt-1">Your donations support a diversified, sustainable financial model:</p>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-border text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                        <th className="pb-3 pr-4">Revenue Source</th>
                        <th className="pb-3">Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border text-xs">
                      {[
                        { src: "Individual Donations", desc: "The foundational pillar of our donor support" },
                        { src: "Corporate Sponsorships", desc: "Sponsorships and partnerships with local companies" },
                        { src: "Grants", desc: "Foundation and government funding for social development" },
                        { src: "Program Fees", desc: "Sliding-scale token fees for specialized resources" },
                        { src: "Real Estate Partnerships", desc: "Collaborations with homebuilders and brokerage professionals" }
                      ].map((row, i) => (
                        <tr key={i}>
                          <td className="py-3 pr-4 font-bold text-foreground">{row.src}</td>
                          <td className="py-3 text-muted-foreground leading-relaxed">{row.desc}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-border bg-secondary/20 p-4 rounded-xl flex items-center gap-3">
                <Award className="size-5 text-accent shrink-0" />
                <p className="text-[10px] text-muted-foreground leading-relaxed">
                  We are tax-exempt under Section 501(c)(3) of the Internal Revenue Code. Upon receipt, a donation confirmation letter will be emailed to your records.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* Success Stories Section */}
        <section className="bg-gradient-to-r from-primary to-[#3A0A63] text-white py-20 relative overflow-hidden">
          <div className="absolute right-[-10%] top-[-25%] size-[300px] rounded-full bg-accent/15 blur-3xl" />
          <div className="max-w-6xl mx-auto px-6 lg:px-10 relative">
            <div className="text-center mb-12">
              <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">Lives Transformed</span>
              <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight mt-2 text-white">Donor-Funded Success Stories</h3>
              <p className="text-sm text-white/70 max-w-2xl mx-auto mt-3">
                Read about the direct impact your dollars have had on the lives of women in our programs.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {successStories.map((story, i) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6 relative flex flex-col justify-between shadow-lg">
                  <p className="text-xs italic text-white/90 leading-relaxed">
                    "{story.quote}"
                  </p>
                  <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-2">
                    <div className="size-1.5 rounded-full bg-[#D4AF37]" />
                    <div>
                      <span className="text-xs font-bold text-white block">{story.author}</span>
                      <span className="text-[10px] text-[#D4AF37] font-semibold">{story.tagline}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Other Ways to Give Section */}
        <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-accent-foreground">
              Additional Formats
            </span>
            <h2 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-foreground md:text-5xl">
              Other Ways to <span className="text-gradient-brand">Give</span>
            </h2>
            <p className="mt-4 text-base text-muted-foreground max-w-2xl mx-auto">
              If you prefer to give by mail, phone, or through other methods, we offer several convenient options.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 items-stretch">
            
            {/* Card 1: Mail check */}
            <div className="bg-white border border-border/85 rounded-3xl p-6 shadow-soft hover:border-primary/20 transition flex flex-col justify-between">
              <div className="space-y-4">
                <div className="size-10 rounded-xl bg-primary/5 text-primary flex items-center justify-center border border-primary/10">
                  <Mail className="size-5" />
                </div>
                <h4 className="text-lg font-bold text-foreground">Mail a Check</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Please make checks payable to:<br />
                  <strong>SOAR Global Foundation Inc.</strong>
                </p>
                <div className="bg-secondary/40 p-3.5 rounded-xl border border-border/40 text-xs">
                  <strong>Mailing Address:</strong><br />
                  Orlando, FL 32818
                </div>
                <p className="text-[10px] text-muted-foreground">
                  Please include a note indicating the program you wish to support, if any.
                </p>
              </div>
            </div>

            {/* Card 2: Phone */}
            <div className="bg-white border border-border/85 rounded-3xl p-6 shadow-soft hover:border-primary/20 transition flex flex-col justify-between">
              <div className="space-y-4">
                <div className="size-10 rounded-xl bg-primary/5 text-primary flex items-center justify-center border border-primary/10">
                  <Phone className="size-5" />
                </div>
                <h4 className="text-lg font-bold text-foreground">Donate by Phone</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Call us to make a secure donation over the phone. Our team is available Monday through Friday, 9:00 AM – 5:00 PM EST.
                </p>
                <div className="pt-2">
                  <a
                    href="tel:3217107145"
                    className="inline-flex items-center gap-2 text-xs font-bold text-primary hover:text-primary-deep"
                  >
                    📞 Call us at (321) 710-7145
                  </a>
                </div>
              </div>
            </div>

            {/* Card 3: Wire & Stock */}
            <div className="bg-white border border-border/85 rounded-3xl p-6 shadow-soft hover:border-primary/20 transition flex flex-col justify-between">
              <div className="space-y-4">
                <div className="size-10 rounded-xl bg-primary/5 text-primary flex items-center justify-center border border-primary/10">
                  <TrendingUp className="size-5" />
                </div>
                <h4 className="text-lg font-bold text-foreground">Wire Transfer & Stock</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  We accept wire transfers and stock gifts. Please contact us directly for account routing numbers and brokerage transfer instructions.
                </p>
                <div className="space-y-1 pt-1 text-xs">
                  <a href="mailto:sistersoar14@gmail.com" className="block text-primary hover:underline">
                    ✉️ sistersoar14@gmail.com
                  </a>
                  <a href="tel:3217107145" className="block text-primary hover:underline">
                    📞 (321) 710-7145
                  </a>
                </div>
              </div>
            </div>

            {/* Card 4: DAF */}
            <div className="bg-white border border-border/85 rounded-3xl p-6 shadow-soft hover:border-primary/20 transition flex flex-col justify-between">
              <div className="space-y-4">
                <div className="size-10 rounded-xl bg-primary/5 text-primary flex items-center justify-center border border-primary/10">
                  <Briefcase className="size-5" />
                </div>
                <h4 className="text-lg font-bold text-foreground">Donor Advised Funds (DAF)</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  If you hold a donor advised fund with Fidelity Charitable, Schwab Charitable, or others, you can recommend grants directly to SOAR. Our tax ID number is available upon request.
                </p>
              </div>
              <div className="pt-4">
                <Link
                  to="/contact"
                  className="w-full text-center inline-flex items-center justify-center rounded-full border border-border bg-secondary hover:bg-secondary/70 py-2.5 text-xs font-semibold text-foreground/80 transition"
                >
                  Contact for DAF Info
                </Link>
              </div>
            </div>

            {/* Card 5: QCD */}
            <div className="bg-white border border-border/85 rounded-3xl p-6 shadow-soft hover:border-primary/20 transition flex flex-col justify-between">
              <div className="space-y-4">
                <div className="size-10 rounded-xl bg-primary/5 text-primary flex items-center justify-center border border-primary/10">
                  <FileText className="size-5" />
                </div>
                <h4 className="text-lg font-bold text-foreground">Qualified Distributions (QCD)</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  If you are 70½ or older, you can make a tax-free gift directly from your Individual Retirement Account (IRA) to SOAR Global Foundation. Contact your custodian for instruction letters.
                </p>
              </div>
              <div className="pt-4">
                <Link
                  to="/contact"
                  className="w-full text-center inline-flex items-center justify-center rounded-full border border-border bg-secondary hover:bg-secondary/70 py-2.5 text-xs font-semibold text-foreground/80 transition"
                >
                  Contact for QCD Info
                </Link>
              </div>
            </div>

            {/* Card 6: Planned Giving */}
            <div className="bg-white border border-border/85 rounded-3xl p-6 shadow-soft hover:border-primary/20 transition flex flex-col justify-between">
              <div className="space-y-4">
                <div className="size-10 rounded-xl bg-primary/5 text-primary flex items-center justify-center border border-primary/10">
                  <Award className="size-5" />
                </div>
                <h4 className="text-lg font-bold text-foreground">Planned Giving</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Leave a lasting legacy by including SOAR Global Foundation Inc. in your estate plans. Bequests, annuities, retirement designations, or life insurance ensure future support.
                </p>
              </div>
              <div className="pt-4">
                <Link
                  to="/contact"
                  className="w-full text-center inline-flex items-center justify-center rounded-full border border-border bg-secondary hover:bg-secondary/70 py-2.5 text-xs font-semibold text-foreground/80 transition"
                >
                  Learn About Estate Giving
                </Link>
              </div>
            </div>

            {/* Card 7: In-kind Donations (Col-span wide on desktop) */}
            <div className="md:col-span-2 lg:col-span-3 bg-gradient-to-br from-[#FFFDF9] to-white border border-accent/25 rounded-3xl p-6 sm:p-8 shadow-soft flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="space-y-3 flex-1">
                <div className="size-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center border border-accent/20">
                  <Gift className="size-5" />
                </div>
                <h4 className="text-lg font-bold text-foreground">In-Kind Donations</h4>
                <p className="text-xs text-muted-foreground leading-relaxed max-w-xl">
                  We welcome physical goods and professional services that support our program participants and operations.
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  {[
                    "Office Supplies & Printers",
                    "Laptops & Tablets for classes",
                    "Workshop Space & Catering",
                    "Professional services (Legal, Marketing, CPA)"
                  ].map((item, idx) => (
                    <span key={idx} className="text-[10px] font-semibold bg-secondary text-foreground/75 px-3 py-1 rounded-full border border-border/50">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              <div className="shrink-0 w-full md:w-auto">
                <Link
                  to="/contact"
                  className="w-full md:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary to-primary-deep text-white px-6 py-3 text-xs font-bold uppercase tracking-wider hover:scale-[1.02] active:scale-[0.98] transition shadow-soft"
                >
                  Contact About In-Kind Items
                </Link>
              </div>
            </div>

          </div>
        </section>

        {/* Corporate Matching Section */}
        <section className="mx-auto max-w-5xl px-6 pb-24 lg:px-10">
          <div className="grid gap-6 md:grid-cols-2">
            
            {/* Matching */}
            <div className="bg-white border border-border/80 rounded-3xl p-6 sm:p-8 shadow-soft flex flex-col justify-between">
              <div className="space-y-4">
                <span className="text-[9px] uppercase font-bold tracking-widest text-primary">Double the Impact</span>
                <h4 className="text-xl font-bold text-foreground">Corporate Matching Gifts</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Many employers offer matching gift programs that double or triple your charitable contribution. Check with your HR department.
                </p>
                <ol className="text-xs text-muted-foreground space-y-1.5 list-decimal pl-4">
                  <li>Make your donation to SOAR Global Foundation Inc.</li>
                  <li>Request a matching gift form from your employer</li>
                  <li>Submit the completed verification form to SOAR</li>
                  <li>We verify and your employer sends the matching check</li>
                </ol>
              </div>
              <div className="pt-6">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-primary hover:bg-primary/5 transition"
                >
                  Check Matching Options
                </Link>
              </div>
            </div>

            {/* Workplace Giving & Fundraise */}
            <div className="bg-white border border-border/80 rounded-3xl p-6 sm:p-8 shadow-soft flex flex-col justify-between">
              <div className="space-y-4">
                <span className="text-[9px] uppercase font-bold tracking-widest text-primary">Community Driven</span>
                <h4 className="text-xl font-bold text-foreground">Fundraise for SOAR</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Create your own fundraiser! Whether it is a birthday campaign, workplace challenge, community garage sale, or virtual campaign, you can empower women directly.
                </p>
                <div className="flex flex-wrap gap-2 pt-1 text-[10px] text-muted-foreground font-semibold">
                  <span>✦ Birthday Social Campaigns</span>
                  <span>✦ Garage Sales</span>
                  <span>✦ Workplace Dedications</span>
                  <span>✦ House Parties</span>
                </div>
              </div>
              <div className="pt-6 flex flex-wrap gap-3">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-accent px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:scale-[1.02] transition"
                >
                  Start a Fundraiser
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-foreground hover:bg-secondary/80 transition"
                >
                  Workplace Payroll Donations
                </Link>
              </div>
            </div>

          </div>
        </section>

        {/* Donor Bill of Rights */}
        <section className="mx-auto max-w-4xl px-6 pb-20">
          <div className="bg-primary/5 border border-primary/10 rounded-[28px] p-6 sm:p-8 relative overflow-hidden">
            <div className="absolute right-[-10%] top-[-10%] size-[180px] rounded-full bg-accent/5 blur-xl" />
            <div className="relative space-y-4">
              <div className="flex items-center gap-2">
                <Shield className="size-5 text-primary" />
                <h4 className="font-display text-lg font-bold text-primary-deep">Donor Bill of Rights</h4>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                SOAR Global Foundation Inc. strictly adheres to the Donor Bill of Rights. We commit to transparency, respect, and integrity. You have the right to be informed of our mission, how donations are used, who governs our organization, and to have your privacy fully respected and protected.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Accordion Section */}
        <section className="mx-auto max-w-4xl px-6 pb-24">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-primary">
              <HelpCircle className="size-3.5" /> Support FAQs
            </span>
            <h3 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
              Frequently Asked Questions
            </h3>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div key={index} className="bg-white border border-border/80 rounded-2xl overflow-hidden transition-all duration-200 shadow-sm hover:border-primary/20">
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full flex items-center justify-between px-6 py-4.5 text-left text-sm font-bold text-foreground focus:outline-none"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`size-4 text-muted-foreground shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 text-xs leading-relaxed text-muted-foreground border-t border-border/40 animate-fade-up">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Bottom Call to Action Section */}
        <section className="bg-gradient-to-r from-[#3A0A63] to-primary py-24 text-white text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.08),transparent_70%)]" />
          <div className="max-w-4xl mx-auto px-6 relative space-y-6">
            <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Make Your Gift Today</h3>
            <p className="text-sm text-white/70 max-w-xl mx-auto leading-relaxed">
              Your support makes our work possible. Every gift — no matter the size — helps a woman find her dream of homeownership.
            </p>
            <div className="pt-4">
              <a
                href="#donation-builder"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent to-[#F2D27C] text-accent-foreground px-8 py-3.5 text-sm font-bold uppercase tracking-wider hover:scale-[1.02] active:scale-[0.98] transition shadow-elegant"
              >
                Donate Securely Now
              </a>
            </div>
            
            <div className="pt-12 border-t border-white/10 max-w-lg mx-auto flex flex-col items-center gap-2">
              <h4 className="font-display text-lg font-bold text-[#D4AF37]">SOAR Global Foundation Inc.</h4>
              <p className="text-[10px] uppercase font-bold tracking-widest text-white/50">Sisters Of Adversity Rise • Est. 2014</p>
              <div className="flex flex-wrap gap-4 text-xs text-white/60 mt-4">
                <a href="#donation-builder" className="hover:text-white transition">Donate Now</a>
                <span>|</span>
                <a href="#donation-builder" className="hover:text-white transition">Ways to Give</a>
                <span>|</span>
                <Link to="/volunteer" className="hover:text-white transition">Get Involved</Link>
                <span>|</span>
                <Link to="/contact" className="hover:text-white transition">Contact Us</Link>
              </div>
              <p className="text-sm text-[#F2D27C] font-display italic mt-6">
                "Let's build a bridge from survival to sovereignty — one woman, one home, one dream at a time."
              </p>
            </div>
          </div>
        </section>

        {/* Success Modal */}
        {showSuccessModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
            <div className="relative w-full max-w-lg bg-white rounded-[32px] p-6 sm:p-8 shadow-elegant text-center border border-accent/20 animate-fade-up">
              
              <div className="size-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center mb-6">
                <CheckCircle2 className="size-10" />
              </div>
              
              <h3 className="font-display text-2xl font-extrabold text-foreground">Thank You, {firstName}!</h3>
              <p className="text-sm text-muted-foreground mt-2">
                Your donation has been securely received and processed.
              </p>
              
              <div className="bg-secondary/40 rounded-2xl p-5 my-6 text-left border border-border/60 space-y-3.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-muted-foreground">Donor Name</span>
                  <span className="font-bold text-foreground">{firstName} {lastName}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-muted-foreground">Receipt Email</span>
                  <span className="font-bold text-foreground">{email}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-muted-foreground">Donation Type</span>
                  <span className="font-bold text-foreground capitalize">{giftType === "one-time" ? "One-Time" : "Monthly Recurring"}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-muted-foreground">Designation</span>
                  <span className="font-bold text-foreground">
                    {designations.find(d => d.id === designation)?.label || "Where needed most"}
                  </span>
                </div>
                <div className="h-px bg-border/80" />
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-foreground">Amount Charged</span>
                  <span className="text-lg font-extrabold text-primary">
                    ${totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
              </div>
              
              <div className="bg-[#FFFDF9] border border-accent/15 rounded-xl p-4 text-xs text-primary-deep text-left flex items-start gap-2.5">
                <Award className="size-4.5 text-accent shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-accent">Your Gift in Action</strong>
                  {currentImpact}
                </div>
              </div>
              
              <div className="mt-8 flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    toast.success("Receipt printed / downloaded successfully!");
                  }}
                  className="flex-1 rounded-full border border-border bg-secondary hover:bg-secondary/80 py-3 text-xs font-bold uppercase tracking-wider text-foreground transition"
                >
                  Print Receipt
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 rounded-full bg-gradient-to-r from-primary to-primary-deep text-white py-3 text-xs font-bold uppercase tracking-wider hover:scale-[1.02] transition shadow-soft"
                >
                  Close Window
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </SiteLayout>
  );
}
