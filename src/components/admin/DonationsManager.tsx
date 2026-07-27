import { useState, useMemo } from "react";
import { useDonations, type DonationType } from "@/lib/cms";
import { Heart, Search, Filter, DollarSign, Users, Award, TrendingUp, Sparkles, CheckCircle2, FileText, ArrowUpRight, ShieldCheck, Mail, Calendar } from "lucide-react";

export function DonationsManager() {
  const { data: donations, isLoading } = useDonations();
  const [searchQuery, setSearchQuery] = useState("");
  const [giftTypeFilter, setGiftTypeFilter] = useState("All");
  const [fundFilter, setFundFilter] = useState("All");
  const [selectedDonation, setSelectedDonation] = useState<DonationType | null>(null);

  const filteredDonations = useMemo(() => {
    if (!donations) return [];
    return donations.filter((d) => {
      const matchesSearch =
        d.donorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.donorEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (d.stripePaymentId && d.stripePaymentId.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesType = giftTypeFilter === "All" || d.giftType.toLowerCase() === giftTypeFilter.toLowerCase();
      const matchesFund = fundFilter === "All" || d.fundCategory.toLowerCase() === fundFilter.toLowerCase();

      return matchesSearch && matchesType && matchesFund;
    });
  }, [donations, searchQuery, giftTypeFilter, fundFilter]);

  // Calculated Metrics
  const metrics = useMemo(() => {
    if (!donations || donations.length === 0) {
      return { totalRaised: 0, totalDonors: 0, avgGift: 0, monthlyTotal: 0, fundCounts: {} };
    }

    const totalRaised = donations.reduce((sum, d) => sum + (Number(d.amount) || 0), 0);
    const uniqueEmails = new Set(donations.map((d) => d.donorEmail.toLowerCase()));
    const totalDonors = uniqueEmails.size;
    const avgGift = totalRaised / (donations.length || 1);

    const monthlyTotal = donations
      .filter((d) => d.giftType.toLowerCase().includes("monthly"))
      .reduce((sum, d) => sum + (Number(d.amount) || 0), 0);

    const fundCounts: Record<string, number> = {};
    donations.forEach((d) => {
      const fund = d.fundCategory || "General Support";
      fundCounts[fund] = (fundCounts[fund] || 0) + (Number(d.amount) || 0);
    });

    return { totalRaised, totalDonors, avgGift, monthlyTotal, fundCounts };
  }, [donations]);

  return (
    <div className="space-y-8">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#D4AF37] flex items-center gap-1.5 mb-1">
            <Heart className="size-3.5 fill-[#D4AF37]" /> Foundation Philanthropy & Giving
          </span>
          <h2 className="font-display text-3xl font-extrabold text-white tracking-tight">Donations & Contributions</h2>
          <p className="text-xs text-white/60 mt-1">Real-time database records of all foundation donors, gift categories, and Stripe payment transactions.</p>
        </div>
      </div>

      {/* KPI Stat Cards (4 Cards Grid) */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        
        {/* Card 1: Total Raised */}
        <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-5 shadow-soft hover:border-[#D4AF37]/40 transition space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-white/60">Total Amount Raised</span>
            <div className="size-9 rounded-xl bg-amber-500/20 text-[#D4AF37] grid place-items-center">
              <DollarSign className="size-5" />
            </div>
          </div>
          <div className="text-2xl font-serif font-extrabold text-white">
            ${metrics.totalRaised.toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </div>
          <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
            <TrendingUp className="size-3" /> 100% Verified Stripe Database Sync
          </span>
        </div>

        {/* Card 2: Total Donors */}
        <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-5 shadow-soft hover:border-[#D4AF37]/40 transition space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-white/60">Total Donors</span>
            <div className="size-9 rounded-xl bg-purple-500/20 text-purple-400 grid place-items-center">
              <Users className="size-5" />
            </div>
          </div>
          <div className="text-2xl font-serif font-extrabold text-white">
            {metrics.totalDonors} <span className="text-xs font-sans text-white/50">Unique Supporters</span>
          </div>
          <span className="text-[10px] text-white/50">Active global community of givers</span>
        </div>

        {/* Card 3: Average Gift */}
        <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-5 shadow-soft hover:border-[#D4AF37]/40 transition space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-white/60">Average Contribution</span>
            <div className="size-9 rounded-xl bg-blue-500/20 text-blue-400 grid place-items-center">
              <Award className="size-5" />
            </div>
          </div>
          <div className="text-2xl font-serif font-extrabold text-white">
            ${metrics.avgGift.toFixed(2)}
          </div>
          <span className="text-[10px] text-white/50">Per donor transaction average</span>
        </div>

        {/* Card 4: Monthly Sustaining */}
        <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-5 shadow-soft hover:border-[#D4AF37]/40 transition space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-white/60">Monthly Sustaining</span>
            <div className="size-9 rounded-xl bg-emerald-500/20 text-emerald-400 grid place-items-center">
              <Sparkles className="size-5" />
            </div>
          </div>
          <div className="text-2xl font-serif font-extrabold text-white">
            ${metrics.monthlyTotal.toLocaleString("en-US", { minimumFractionDigits: 2 })}<span className="text-xs font-sans text-white/50">/mo</span>
          </div>
          <span className="text-[10px] text-emerald-400 font-semibold">Recurring monthly supporters</span>
        </div>

      </div>

      {/* Program Allocation Progress Breakdown */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-2">
          <Heart className="size-4 fill-[#D4AF37]" /> Program Fund Allocations
        </h3>

        <div className="grid gap-4 md:grid-cols-3">
          {Object.entries(metrics.fundCounts).length === 0 ? (
            <p className="text-xs text-white/50">No fund allocation data available yet.</p>
          ) : (
            Object.entries(metrics.fundCounts).map(([fund, total]) => {
              const pct = metrics.totalRaised > 0 ? Math.round((total / metrics.totalRaised) * 100) : 0;
              return (
                <div key={fund} className="p-4 rounded-xl bg-black/30 border border-white/10 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-white truncate">{fund}</span>
                    <span className="font-extrabold text-[#D4AF37]">${total.toLocaleString()} ({pct}%)</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                    <div className="bg-gradient-to-r from-[#D4AF37] to-[#F2D27C] h-full rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/10">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-3 size-4 text-white/40" />
          <input
            type="text"
            placeholder="Search by donor name, email, or Stripe ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-black/30 border border-white/10 rounded-xl text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-[#D4AF37]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2">
            <span className="text-xs text-white/60 font-semibold shrink-0">Gift Type:</span>
            <select
              value={giftTypeFilter}
              onChange={(e) => setGiftTypeFilter(e.target.value)}
              className="bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none cursor-pointer"
            >
              <option value="All">All Types</option>
              <option value="One-time">One-time</option>
              <option value="Monthly">Monthly Sustaining</option>
              <option value="Sponsor a Family">Sponsor a Family</option>
              <option value="Scholarship Fund">Scholarship Fund</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-white/60 font-semibold shrink-0">Program:</span>
            <select
              value={fundFilter}
              onChange={(e) => setFundFilter(e.target.value)}
              className="bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none cursor-pointer"
            >
              <option value="All">All Programs</option>
              <option value="Where needed most">Where needed most</option>
              <option value="Financial Literacy Workshops">Financial Literacy</option>
              <option value="Homeownership Education">Homeownership</option>
              <option value="Mentorship Program">Mentorship</option>
            </select>
          </div>
        </div>
      </div>

      {/* Donations Data Table */}
      <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden shadow-soft">
        {isLoading ? (
          <div className="p-8 text-center text-xs text-white/50">Loading live donations database...</div>
        ) : filteredDonations.length === 0 ? (
          <div className="p-12 text-center text-xs text-white/50 space-y-2">
            <Heart className="size-8 mx-auto text-white/20" />
            <p className="font-bold text-white">No donations found</p>
            <p>Donations recorded from the live /donate page will appear here immediately.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-white/10 bg-black/40 text-[10px] font-bold uppercase tracking-wider text-white/60">
                <tr>
                  <th className="px-5 py-3.5">Donor Name & Contact</th>
                  <th className="px-5 py-3.5">Contribution</th>
                  <th className="px-5 py-3.5">Gift Type</th>
                  <th className="px-5 py-3.5">Fund Designation</th>
                  <th className="px-5 py-3.5">Payment Method</th>
                  <th className="px-5 py-3.5">Date</th>
                  <th className="px-5 py-3.5 text-right">Receipt / Note</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-white/80">
                {filteredDonations.map((d) => (
                  <tr key={d.id} className="hover:bg-white/5 transition">
                    <td className="px-5 py-4">
                      <div className="font-bold text-white">{d.donorName}</div>
                      <div className="text-[11px] text-white/50">{d.donorEmail}</div>
                      {d.isTribute && (
                        <span className="text-[10px] text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-md mt-1 inline-block">
                          Tribute: {d.tributeName}
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-4 font-serif font-extrabold text-base text-emerald-400">
                      ${Number(d.amount).toFixed(2)}
                    </td>
                    <td className="px-5 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                        d.giftType.toLowerCase().includes("monthly")
                          ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                          : "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                      }`}>
                        {d.giftType}
                      </span>
                    </td>
                    <td className="px-5 py-4 font-medium text-white/90">
                      {d.fundCategory}
                    </td>
                    <td className="px-5 py-4 text-white/60">
                      <span className="flex items-center gap-1.5">
                        <ShieldCheck className="size-3.5 text-emerald-400 shrink-0" />
                        {d.paymentMethod}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-white/50 whitespace-nowrap">
                      {new Date(d.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <button
                        onClick={() => setSelectedDonation(d)}
                        className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-[#D4AF37] hover:text-[#0C1220] transition font-bold text-[11px] inline-flex items-center gap-1 cursor-pointer"
                      >
                        <FileText className="size-3.5" /> Receipt
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Donation Detail Modal */}
      {selectedDonation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn">
          <div className="bg-[#140C27] border border-white/20 rounded-3xl p-6 max-w-lg w-full space-y-6 shadow-2xl relative text-white">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2">
                <Heart className="size-5 text-[#D4AF37] fill-[#D4AF37]" /> Official Donation Receipt
              </h3>
              <button onClick={() => setSelectedDonation(null)} className="size-8 rounded-full bg-white/10 text-white/70 hover:text-white grid place-items-center">
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex justify-between items-center">
                <div>
                  <span className="text-[10px] text-white/60 uppercase tracking-widest block font-bold">Contribution Value</span>
                  <span className="font-serif text-3xl font-extrabold text-emerald-400">${Number(selectedDonation.amount).toFixed(2)} USD</span>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-[10px] uppercase">
                  {selectedDonation.paymentStatus}
                </span>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <span className="text-white/40 block font-semibold">Donor Name</span>
                  <span className="font-bold text-white text-sm">{selectedDonation.donorName}</span>
                </div>
                <div>
                  <span className="text-white/40 block font-semibold">Email Address</span>
                  <span className="font-bold text-white text-sm">{selectedDonation.donorEmail}</span>
                </div>
                <div>
                  <span className="text-white/40 block font-semibold">Gift Type</span>
                  <span className="font-bold text-[#D4AF37]">{selectedDonation.giftType}</span>
                </div>
                <div>
                  <span className="text-white/40 block font-semibold">Fund Allocation</span>
                  <span className="font-bold text-white">{selectedDonation.fundCategory}</span>
                </div>
                <div>
                  <span className="text-white/40 block font-semibold">Payment Gateway</span>
                  <span className="font-bold text-white">{selectedDonation.paymentMethod}</span>
                </div>
                <div>
                  <span className="text-white/40 block font-semibold">Stripe Ref ID</span>
                  <span className="font-mono text-white/60">{selectedDonation.stripePaymentId || "N/A"}</span>
                </div>
              </div>

              {selectedDonation.message && (
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-white/80 italic">
                  "{selectedDonation.message}"
                </div>
              )}
            </div>

            <button
              onClick={() => setSelectedDonation(null)}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F2D27C] text-[#0C1220] font-extrabold text-xs uppercase tracking-wider shadow-md hover:scale-[1.01] transition"
            >
              Close Receipt
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
