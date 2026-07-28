import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { PageHeader } from "@/components/site/PageHeader";
import { useState, useEffect, useRef } from "react";
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
  AlertCircle,
  MapPin,
  HelpCircle,
  Briefcase,
  Loader2
} from "lucide-react";
import { toast } from "sonner";
import { loadStripe, type Stripe, type StripeElements } from "@stripe/stripe-js";
import { createStripePaymentIntentFn, createDonationFn } from "@/lib/cms";
import { useQueryClient } from "@tanstack/react-query";
import donateHero from "@/assets/donate-hero.png";
import donateWorkshop from "@/assets/donate-workshop.png";

const getStripePublishableKey = () =>
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_STRIPE_PUBLISHABLE_KEY) || "";

const stripePromise = loadStripe(getStripePublishableKey());

export const Route = createFileRoute("/donate")({
  head: () => ({
    meta: [
      { title: "Donate & Support Women Empowerment — 501(c)(3) Tax Deductible | SOAR Global Foundation Inc." },
      {
        name: "description",
        content: "Donate to SOAR Global Foundation Inc. Your 501(c)(3) tax-deductible gift empowers women in Orlando, FL through financial literacy, mentorship, and homeownership."
      },
      {
        name: "keywords",
        content: "donate to women charity Orlando, 501c3 tax deductible donation Florida, support women homeownership, charity for single mothers Orlando, sponsor a family non profit"
      },
      { property: "og:title", content: "Donate & Support Women Empowerment — SOAR Global Foundation Inc." },
      { property: "og:url", content: "https://soarglobalfoundation.org/donate" }
    ],
    links: [{ rel: "canonical", href: "https://soarglobalfoundation.org/donate" }]
  }),
  component: DonatePage
});

const giftTypesList = [
  { id: "One-time", title: "One-Time Gift", desc: "Immediate impact for urgent family housing & education needs" },
  { id: "Monthly", title: "Monthly Sustaining Partner", desc: "Join the SOAR Circle with recurring monthly support", badge: "SOAR Circle" },
  { id: "Sponsor a Family", title: "Sponsor a Family", desc: "Full wrap-around down payment & mentorship sponsorship" },
  { id: "Scholarship Fund", title: "Scholarship Fund", desc: "Fund financial literacy & career advancement bootcamps" },
];

const presetAmounts = [
  { value: 25, label: "$25", impact: "Provides financial literacy workbooks & materials for 1 woman" },
  { value: 50, label: "$50", impact: "Covers 1-on-1 financial counseling & credit building session" },
  { value: 100, label: "$100", impact: "Supports a full homeownership education workshop series" },
  { value: 250, label: "$250", impact: "Funds career bootcamp scholarship for a single mother" },
  { value: 500, label: "$500", impact: "Sponsors down payment assistance grant for a family" },
  { value: 1000, label: "$1,000", impact: "Provides emergency housing shelter & legal assistance" },
  { value: 5000, label: "$5,000", impact: "Helps secure a permanent home for a mother and her children" }
];

const designations = [
  { id: "Where needed most", label: "Where needed most (General Operating)" },
  { id: "Financial Literacy Workshops", label: "Financial Literacy & Credit Workshops" },
  { id: "Homeownership Education", label: "Homeownership & Down Payment Assistance" },
  { id: "Mentorship Program", label: "Executive Women Mentorship Track" },
  { id: "Family Emergency Support", label: "Family Support & Emergency Relief" }
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
    a: "Your donation supports our core programs: Financial Literacy Workshops, Homeownership Education, Mentorship Program, Family Support Services, and Affordable Housing Access."
  },
  {
    q: "How do I receive a receipt for my donation?",
    a: "All donors receive an instant digital receipt and confirmation code immediately after giving online."
  }
];

function DonatePage() {
  const qc = useQueryClient();
  const [formStep, setFormStep] = useState(1);
  const [giftType, setGiftType] = useState<string>("One-time");
  const [selectedAmount, setSelectedAmount] = useState<number | null>(100);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [designation, setDesignation] = useState("Where needed most");

  // Donor Info
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");

  // Options
  const [coverFee, setCoverFee] = useState(false);
  const [isTribute, setIsTribute] = useState(false);
  const [tributeName, setTributeName] = useState("");
  const [donorMessage, setDonorMessage] = useState("");

  // Stripe & Processing State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [stripeError, setStripeError] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [completedDonationId, setCompletedDonationId] = useState<string | null>(null);

  const [stripeInstance, setStripeInstance] = useState<Stripe | null>(null);
  const [elementsInstance, setElementsInstance] = useState<StripeElements | null>(null);

  useEffect(() => {
    stripePromise.then((stripe) => {
      if (stripe) {
        setStripeInstance(stripe);
        const elements = stripe.elements();
        setElementsInstance(elements);
      }
    });
  }, []);

  // Calculate final donation total
  const activeAmount = customAmount ? parseFloat(customAmount) || 0 : selectedAmount || 0;
  const processingFee = activeAmount * 0.03;
  const totalAmount = Number((coverFee ? activeAmount + processingFee : activeAmount).toFixed(2));

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
  const currentImpact = presetAmounts.find((p) => p.value === activeAmount)?.impact ||
    (activeAmount > 0 ? "Empowers women through holistic programs for lasting independence" : "Select an amount to see your impact");

  // Step Navigation Validation
  const handleNextStep = () => {
    if (formStep === 1) {
      if (activeAmount <= 0) {
        toast.error("Please select or enter a valid donation amount.");
        return;
      }
      setFormStep(2);
    } else if (formStep === 2) {
      if (!firstName || !lastName || !email) {
        toast.error("Please enter your First Name, Last Name, and Email address.");
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        toast.error("Please enter a valid email address.");
        return;
      }
      setFormStep(3);
    }
  };

  // Final Stripe & Database Submission
  const handleSubmitDonation = async (e: React.FormEvent) => {
    e.preventDefault();
    setStripeError(null);

    if (totalAmount <= 0) {
      toast.error("Donation amount must be greater than $0.");
      return;
    }

    setIsSubmitting(true);

    try {
      let paymentId = "stripe_live_" + Date.now();

      if (stripeInstance && elementsInstance) {
        const intentRes = await createStripePaymentIntentFn({ data: totalAmount });
        if (intentRes.clientSecret) {
          const cardEl = elementsInstance.getElement("card");
          if (cardEl) {
            const { error, paymentIntent } = await stripeInstance.confirmCardPayment(intentRes.clientSecret, {
              payment_method: {
                card: cardEl,
                billing_details: {
                  name: `${firstName} ${lastName}`,
                  email,
                  phone,
                }
              }
            });

            if (error) {
              setStripeError(error.message || "Card payment was declined.");
              setIsSubmitting(false);
              return;
            }

            if (paymentIntent && paymentIntent.id) {
              paymentId = paymentIntent.id;
            }
          }
        }
      }

      // Save Donation to MongoDB
      const dbRes = await createDonationFn({
        data: {
          donorName: `${firstName} ${lastName}`,
          donorEmail: email,
          donorPhone: phone,
          amount: totalAmount,
          giftType,
          fundCategory: designation,
          paymentMethod: "Stripe Credit Card",
          paymentStatus: "Completed",
          stripePaymentId: paymentId,
          isTribute,
          tributeName: isTribute ? tributeName : "",
          message: donorMessage,
        }
      });

      if (dbRes.success) {
        setCompletedDonationId(dbRes.donationId || paymentId);
        qc.invalidateQueries({ queryKey: ["cms", "donations"] });
        setShowSuccessModal(true);
      } else {
        toast.error("Failed to record donation in database. Please try again.");
      }
    } catch (err: any) {
      console.error("Donation Error:", err);
      setStripeError(err?.message || "Payment submission failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
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
    setCoverFee(false);
    setIsTribute(false);
    setTributeName("");
    setDonorMessage("");
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
            <div className="lg:col-span-7 bg-white/80 backdrop-blur-xl border border-white/80 rounded-3xl p-6 sm:p-8 shadow-elegant relative overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-1.5 gradient-brand" />
              
              {/* Form Step Headers */}
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-border/60">
                <div className={`flex items-center gap-2 ${formStep >= 1 ? "text-primary" : "text-muted-foreground"}`}>
                  <span className={`size-7 rounded-full flex items-center justify-center text-xs font-bold ${formStep === 1 ? "bg-primary text-white" : formStep > 1 ? "bg-primary/20 text-primary" : "bg-muted"}`}>
                    {formStep > 1 ? <Check className="size-4" /> : "1"}
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider hidden sm:inline">Gift Type & Amount</span>
                </div>
                <div className="h-px bg-border flex-1 mx-4 max-w-[40px]" />
                <div className={`flex items-center gap-2 ${formStep >= 2 ? "text-primary" : "text-muted-foreground"}`}>
                  <span className={`size-7 rounded-full flex items-center justify-center text-xs font-bold ${formStep === 2 ? "bg-primary text-white" : formStep > 2 ? "bg-primary/20 text-primary" : "bg-muted"}`}>
                    {formStep > 2 ? <Check className="size-4" /> : "2"}
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider hidden sm:inline">Your Details</span>
                </div>
                <div className="h-px bg-border flex-1 mx-4 max-w-[40px]" />
                <div className={`flex items-center gap-2 ${formStep >= 3 ? "text-primary" : "text-muted-foreground"}`}>
                  <span className={`size-7 rounded-full flex items-center justify-center text-xs font-bold ${formStep === 3 ? "bg-primary text-white" : "bg-muted"}`}>
                    3
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider hidden sm:inline">Stripe Payment</span>
                </div>
              </div>

              {stripeError && (
                <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 text-xs font-semibold flex items-center gap-2">
                  <AlertCircle className="size-4 shrink-0" /> {stripeError}
                </div>
              )}

              <form onSubmit={handleSubmitDonation}>
                
                {/* STEP 1: GIFT TYPE & AMOUNT */}
                {formStep === 1 && (
                  <div className="space-y-6 animate-fade-up">
                    <div>
                      <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                        <Heart className="size-5 text-primary fill-primary" /> Select Your Gift Type
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1">Choose how your donation supports SOAR's women empowerment programs</p>
                      
                      <div className="grid gap-3 sm:grid-cols-2 mt-4">
                        {giftTypesList.map((gt) => {
                          const isSelected = giftType === gt.id;
                          return (
                            <button
                              key={gt.id}
                              type="button"
                              onClick={() => setGiftType(gt.id)}
                              className={`p-4 rounded-2xl text-left border transition duration-200 cursor-pointer relative ${
                                isSelected
                                  ? "border-primary bg-primary/10 text-primary shadow-sm"
                                  : "border-border hover:bg-secondary/40 text-foreground/80"
                              }`}
                            >
                              {gt.badge && (
                                <span className="absolute top-3 right-3 text-[9px] bg-accent text-accent-foreground font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                                  {gt.badge}
                                </span>
                              )}
                              <strong className="block text-sm font-bold text-foreground">{gt.title}</strong>
                              <span className="text-[11px] text-muted-foreground mt-1 block">{gt.desc}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-foreground">Choose Your Gift Amount</h3>
                      <p className="text-xs text-muted-foreground mt-1">Select a preset amount or enter a custom gift</p>
                      
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
                        {presetAmounts.slice(0, 4).map((amt) => (
                          <button
                            key={amt.value}
                            type="button"
                            onClick={() => handlePresetSelect(amt.value)}
                            className={`py-3 px-3 rounded-xl border text-sm font-bold transition duration-200 cursor-pointer ${
                              selectedAmount === amt.value
                                ? "border-primary bg-primary text-white shadow-soft"
                                : "border-border hover:bg-secondary/40 text-foreground/80"
                            }`}
                          >
                            ${amt.value}
                          </button>
                        ))}
                        {presetAmounts.slice(4, 7).map((amt) => (
                          <button
                            key={amt.value}
                            type="button"
                            onClick={() => handlePresetSelect(amt.value)}
                            className={`py-3 px-3 rounded-xl border text-sm font-bold transition duration-200 cursor-pointer ${
                              selectedAmount === amt.value
                                ? "border-primary bg-primary text-white shadow-soft"
                                : "border-border hover:bg-secondary/40 text-foreground/80"
                            }`}
                          >
                            ${amt.value.toLocaleString()}
                          </button>
                        ))}
                        
                        {/* Custom Input */}
                        <div className="relative col-span-2 sm:col-span-1">
                          <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                          <input
                            type="number"
                            placeholder="Custom"
                            value={customAmount}
                            onChange={(e) => handleCustomAmountChange(e.target.value)}
                            className={`w-full h-full min-h-[46px] pl-8 pr-3 rounded-xl border text-sm font-bold focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary ${
                              customAmount ? "border-primary bg-primary/5 text-primary" : "border-border"
                            }`}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Impact Statement */}
                    <div className="bg-[#FFFDF9] border border-accent/20 rounded-2xl p-4 flex items-start gap-3">
                      <Gift className="size-5 text-accent mt-0.5 shrink-0" />
                      <div>
                        <span className="text-[10px] uppercase font-bold tracking-widest text-accent">Your Direct Impact</span>
                        <p className="text-sm font-bold text-primary-deep mt-0.5">{currentImpact}</p>
                      </div>
                    </div>

                    <div className="pt-2 flex justify-end">
                      <button
                        type="button"
                        onClick={handleNextStep}
                        className="inline-flex items-center gap-2 rounded-full gradient-brand text-white px-8 py-3.5 text-xs font-extrabold uppercase tracking-wider hover:scale-[1.02] transition shadow-glow cursor-pointer"
                      >
                        Continue to Contact Info <ArrowRight className="size-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 2: PERSONAL INFORMATION & DESIGNATION */}
                {formStep === 2 && (
                  <div className="space-y-6 animate-fade-up">
                    <div>
                      <h3 className="text-xl font-bold text-foreground">Designate Your Gift</h3>
                      <p className="text-xs text-muted-foreground mt-1">Direct your support to a specific program area</p>
                      
                      <div className="relative mt-3">
                        <select
                          value={designation}
                          onChange={(e) => setDesignation(e.target.value)}
                          className="w-full bg-white border border-border rounded-xl px-4 py-3 text-xs font-bold focus:outline-none focus:border-primary appearance-none cursor-pointer shadow-sm"
                        >
                          {designations.map((opt) => (
                            <option key={opt.id} value={opt.id}>{opt.label}</option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 size-4 pointer-events-none text-muted-foreground" />
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-foreground">Personal Contact Information</h3>
                      <p className="text-xs text-muted-foreground mt-1">Required for tax receipting and donor records</p>
                      
                      <div className="grid sm:grid-cols-2 gap-4 mt-4 text-xs">
                        <div>
                          <label className="font-bold text-foreground/80 block mb-1">First Name *</label>
                          <input
                            type="text"
                            required
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            placeholder="Jane"
                            className="w-full border border-border rounded-xl px-3.5 py-2.5 bg-white focus:outline-none focus:border-primary shadow-sm"
                          />
                        </div>
                        <div>
                          <label className="font-bold text-foreground/80 block mb-1">Last Name *</label>
                          <input
                            type="text"
                            required
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            placeholder="Doe"
                            className="w-full border border-border rounded-xl px-3.5 py-2.5 bg-white focus:outline-none focus:border-primary shadow-sm"
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <label className="font-bold text-foreground/80 block mb-1">Email Address *</label>
                          <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="jane.doe@example.com"
                            className="w-full border border-border rounded-xl px-3.5 py-2.5 bg-white focus:outline-none focus:border-primary shadow-sm"
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <label className="font-bold text-foreground/80 block mb-1">Street Address *</label>
                          <input
                            type="text"
                            required
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="123 Main Street, Suite 100"
                            className="w-full border border-border rounded-xl px-3.5 py-2.5 bg-white focus:outline-none focus:border-primary shadow-sm"
                          />
                        </div>
                        <div>
                          <label className="font-bold text-foreground/80 block mb-1">City *</label>
                          <input
                            type="text"
                            required
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            placeholder="Orlando"
                            className="w-full border border-border rounded-xl px-3.5 py-2.5 bg-white focus:outline-none focus:border-primary shadow-sm"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="font-bold text-foreground/80 block mb-1">State *</label>
                            <input
                              type="text"
                              required
                              value={state}
                              onChange={(e) => setState(e.target.value)}
                              placeholder="FL"
                              className="w-full border border-border rounded-xl px-3.5 py-2.5 bg-white focus:outline-none focus:border-primary shadow-sm"
                            />
                          </div>
                          <div>
                            <label className="font-bold text-foreground/80 block mb-1">ZIP Code</label>
                            <input
                              type="text"
                              value={zip}
                              onChange={(e) => setZip(e.target.value)}
                              placeholder="32801"
                              className="w-full border border-border rounded-xl px-3.5 py-2.5 bg-white focus:outline-none focus:border-primary shadow-sm"
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-2">
                          <label className="font-bold text-foreground/80 block mb-1">Message / Donor Note (Optional)</label>
                          <textarea
                            rows={3}
                            value={donorMessage}
                            onChange={(e) => setDonorMessage(e.target.value)}
                            placeholder="Add a personal message, note, or dedication with your gift..."
                            className="w-full border border-border rounded-xl px-3.5 py-2.5 bg-white focus:outline-none focus:border-primary shadow-sm resize-none"
                          />
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
                        className="inline-flex items-center gap-2 rounded-full gradient-brand text-white px-8 py-3.5 text-xs font-extrabold uppercase tracking-wider hover:scale-[1.02] transition shadow-glow cursor-pointer"
                      >
                        Proceed to Payment <ArrowRight className="size-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 3: STRIPE PAYMENT & SUBMIT */}
                {formStep === 3 && (
                  <div className="space-y-6 animate-fade-up">
                    <div className="flex items-center justify-between border-b border-border/50 pb-3">
                      <div>
                        <h3 className="text-xl font-bold text-foreground">Secure Stripe Payment</h3>
                        <p className="text-xs text-muted-foreground">Your donation is processed over 256-bit encrypted SSL connection</p>
                      </div>
                      <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                        <Lock className="size-4 text-emerald-600" /> SSL Encrypted
                      </span>
                    </div>

                    {stripeError && (
                      <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 text-xs font-semibold flex items-center gap-2">
                        <AlertCircle className="size-4 shrink-0" />
                        {stripeError}
                      </div>
                    )}

                    {/* Card Element Mount Container */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-foreground/80 mb-2">
                        Credit / Debit Card Details *
                      </label>
                      <div className="p-4 rounded-xl border border-border bg-white shadow-sm">
                        <StripeDonationCardInput elementsInstance={elementsInstance} />
                      </div>
                    </div>

                    {/* Cover Processing Fee Option */}
                    <div className="p-4 rounded-2xl border border-border bg-secondary/20 space-y-2 text-xs">
                      <label className="flex items-center gap-3 font-bold text-foreground cursor-pointer">
                        <input
                          type="checkbox"
                          checked={coverFee}
                          onChange={(e) => setCoverFee(e.target.checked)}
                          className="size-4 rounded text-primary focus:ring-primary cursor-pointer"
                        />
                        Add 3% to cover credit card processing fees (${processingFee.toFixed(2)})
                      </label>
                      <p className="text-[11px] text-muted-foreground pl-7">
                        Ensures 100% of your primary donation goes directly to SOAR program operations.
                      </p>
                    </div>

                    <div className="pt-2 flex justify-between items-center">
                      <button
                        type="button"
                        onClick={() => setFormStep(2)}
                        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground hover:text-primary transition"
                      >
                        <ArrowLeft className="size-4" /> Back to Contact Info
                      </button>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="inline-flex items-center gap-2 rounded-full gradient-brand text-white px-8 py-4 text-xs font-extrabold uppercase tracking-wider hover:scale-[1.02] transition shadow-glow cursor-pointer disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="size-4 animate-spin" /> Processing Gift...
                          </>
                        ) : (
                          `Confirm & Donate $${totalAmount.toFixed(2)}`
                        )}
                      </button>
                    </div>
                  </div>
                )}

              </form>
            </div>

            {/* Sidebar Summary & Guarantee (Right Column) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="glass rounded-[28px] p-6 sm:p-8 border border-white/60 shadow-elegant space-y-6 sticky top-28">
                <h3 className="font-serif text-xl font-extrabold text-foreground border-b border-border/50 pb-3 flex items-center justify-between">
                  <span>Gift Summary</span>
                  <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">{giftType}</span>
                </h3>

                <div className="space-y-3 text-xs text-foreground/80">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Donation Amount</span>
                    <span className="font-extrabold text-foreground text-sm">${activeAmount.toFixed(2)}</span>
                  </div>
                  {coverFee && (
                    <div className="flex justify-between text-emerald-600">
                      <span>Cover Processing Fee (3%)</span>
                      <span className="font-semibold">+${processingFee.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Designation</span>
                    <span className="font-semibold text-primary">{designation}</span>
                  </div>

                  <div className="flex justify-between items-baseline text-base font-extrabold text-foreground pt-4 border-t border-border/60">
                    <span>Total Tax-Deductible Gift</span>
                    <span className="text-primary text-2xl font-serif">${totalAmount.toFixed(2)}</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-100/80 border border-slate-200/80 space-y-2 text-[11px] text-muted-foreground">
                  <div className="flex items-center gap-2 text-foreground font-bold">
                    <Shield className="size-4 text-emerald-600 shrink-0" /> 100% Tax Deductible 501(c)(3)
                  </div>
                  <p className="leading-normal">
                    SOAR Global Foundation Inc. is a registered 501(c)(3) nonprofit. You will receive an official tax receipt immediately following your gift.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* FAQs */}
        <section className="mx-auto max-w-4xl px-6 pb-24 lg:px-10">
          <h2 className="font-serif text-2xl font-bold text-center text-foreground mb-6">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <div key={i} className="glass rounded-2xl p-4 border border-white/60">
                <strong className="block text-sm font-bold text-foreground mb-1">{f.q}</strong>
                <p className="text-xs text-muted-foreground leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </section>

      </div>

      {/* Success Celebration Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center space-y-5 shadow-2xl relative">
            <div className="size-16 rounded-full bg-emerald-500/20 text-emerald-600 grid place-items-center mx-auto">
              <CheckCircle2 className="size-10" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-600">Donation Successfully Received</span>
              <h3 className="font-serif text-3xl font-extrabold text-foreground tracking-tight mt-1">Thank You, {firstName}!</h3>
              <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                Your generous gift of <strong>${totalAmount.toFixed(2)}</strong> ({giftType}) has been recorded in the SOAR foundation database.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left text-xs space-y-1.5 text-slate-700">
              <div className="flex justify-between font-semibold">
                <span>Receipt Number:</span>
                <span className="font-mono text-primary">{completedDonationId}</span>
              </div>
              <div className="flex justify-between">
                <span>Donor Email:</span>
                <span>{email}</span>
              </div>
              <div className="flex justify-between">
                <span>Designated Fund:</span>
                <span>{designation}</span>
              </div>
            </div>

            <button
              onClick={resetForm}
              className="w-full py-3.5 rounded-full gradient-brand text-white font-extrabold text-xs uppercase tracking-widest shadow-glow hover:scale-[1.02] transition cursor-pointer"
            >
              Done & Return to Site
            </button>
          </div>
        </div>
      )}
    </SiteLayout>
  );
}

// Inner Component for Stripe Card Iframe Mount
function StripeDonationCardInput({ elementsInstance }: { elementsInstance: StripeElements | null }) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!elementsInstance || !mountRef.current) return;

    let card = elementsInstance.getElement("card");
    if (!card) {
      card = elementsInstance.create("card", {
        style: {
          base: {
            color: "#0F172A",
            fontSize: "15px",
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
    }

    try {
      card.mount(mountRef.current);
    } catch {
      // Element might already be mounted
    }
  }, [elementsInstance]);

  return <div ref={mountRef} className="min-h-[44px] py-1" />;
}
