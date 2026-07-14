import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { PageHeader } from "@/components/site/PageHeader";
import { Sparkles, BookOpen, Users, Heart, Shield, ArrowRight, ArrowLeft } from "lucide-react";
import programMentorImg from "@/assets/program-mentor.jpg";
import founderMyrtleImg from "@/assets/team/Myrtle Dixon (Founder).jpeg";
import presTerryImg from "@/assets/team/Terry-Ann Taylor-Beckford (president).jpg";
import vpBettyImg from "@/assets/team/Betty Arhelo (vice president ).jpg";
import secretaryBettyImg from "@/assets/team/Arhelo Betty ( Secretary ).png";
import dirTamaraImg from "@/assets/team/Tamara Girly (director).JPG";
import dirTamarImg from "@/assets/team/Tamar Raby (director).png";
import { useTeam } from "@/lib/cms";

export const Route = createFileRoute("/meet-our-team")({
  head: () => ({
    meta: [
      { title: "Meet Our Team — SOAR Global Foundation" },
      { name: "description", content: "Meet the Board of Directors and leaders driving the mission of SOAR Global Foundation." },
      { property: "og:title", content: "Meet Our Team — SOAR Global Foundation" },
      { property: "og:url", content: "/meet-our-team" },
    ],
    links: [{ rel: "canonical", href: "/meet-our-team" }],
  }),
  component: MeetOurTeam,
});

const fallbackLeaders = [
  {
    name: "Myrtle Dixon",
    role: "Founder",
    bio: "Myrtle Dixon is a visionary leader with over 20 years of experience championing women's empowerment and community development. As Founder of SOAR Global Foundation Inc., she provides strategic direction and ensures the organization remains steadfast in its mission to help women find their dreams through homeownership.\n\nWith a deep understanding of the challenges women face in accessing stable housing, Myrtle has dedicated her career to creating innovative programs that address systemic barriers. Her leadership is characterized by compassion, resilience, and an unshakeable belief in the power of community.",
    img: founderMyrtleImg,
    focus: ["Strategic Vision", "Community Empowerment", "Organizational Leadership"],
  },
  {
    name: "Terry-Ann Taylor-Beckford",
    role: "President",
    bio: "Terry-Ann Taylor-Beckford is the architect behind SOAR's mentorship and financial literacy curriculum. As President, she directs the organization's strategic expansion and oversees programs and initiatives that equip women with practical skills for lifelong success.\n\nTerry-Ann is passionate about financial sovereignty and has developed educational frameworks that empower women to master budgeting, credit building, and wealth creation. Her work ensures that every woman who walks through SOAR's doors leaves with not just hope, but a tangible plan for her future.",
    img: presTerryImg,
    focus: ["Program Development", "Financial Literacy", "Mentorship Tracks"],
  },
  {
    name: "Betty Arhelo",
    role: "Vice President",
    bio: "Betty Arhelo is the Vice President of SOAR Global Foundation Inc., where she coordinates community outreach initiatives and builds strategic partnerships to advance the organization's mission.\n\nBetty has a background in social services and is committed to fostering supportive environments where women can thrive. She believes that stable housing is the foundation of individual and family well-being, and she works tirelessly to ensure that SOAR's programs are accessible and impactful.",
    img: vpBettyImg,
    focus: ["Outreach Initiatives", "Community Care", "Volunteer Networks"],
  },
  {
    name: "Arhelo Betty",
    role: "Secretary",
    bio: "Arhelo Betty serves as the Secretary, maintaining administrative excellence, records, and coordinating operations across SOAR's programs to ensure smooth outreach execution.\n\nHer dedication ensures that all resources are optimally utilized and communication flows transparently across volunteers, branches, and stakeholders. Betty's attention to administrative detail ensures SOAR meets all local and federal regulations while coordinating community workshops.",
    img: secretaryBettyImg,
    focus: ["Board Governance", "Records Compliance", "Sisterhood Care"],
  },
  {
    name: "Tamara Girly",
    role: "Director",
    bio: "Tamara Girly is a strategic relationship builder who cultivates sponsors and partners to advance SOAR's mission. As a Director, she works tirelessly to secure the resources needed to expand programs and reach more women in need.\n\nTamara's expertise in partnership development has been instrumental in growing SOAR's network of community allies, corporate sponsors, and philanthropic supporters. Her ability to connect people and organizations around a shared purpose strengthens the Foundation's capacity to create lasting impact.",
    img: dirTamaraImg,
    focus: ["Sponsorships", "Strategic Partnerships", "Resource Mobilization"],
  },
  {
    name: "Tamar Raby",
    role: "Director",
    bio: "Tamar Raby serves as a Director, bringing deep expertise in community relations and public outreach to strengthen SOAR's localized impact.\n\nHer dedication to women's causes drives our sponsor programs and localized community partnerships, unlocking resources to expand our homeownership tracks.",
    img: dirTamarImg,
    focus: ["Community Relations", "Outreach Programs", "Local Sponsorships"],
  },
];

const values = [
  { icon: Sparkles, title: "Empowerment", copy: "Unlocking confidence and lasting personal power" },
  { icon: BookOpen, title: "Education", copy: "Providing practical knowledge for economic independence" },
  { icon: Users, title: "Community", copy: "Fostering a supportive sisterhood that rises together" },
  { icon: Heart, title: "Dignity", copy: "Honoring every woman's journey with respect" },
  { icon: Shield, title: "Sustainability", copy: "Building solutions that create generational change" },
];

function MeetOurTeam() {
  const { data: dbTeam } = useTeam();
  const leaders = dbTeam && dbTeam.length > 0
    ? dbTeam.map(member => {
      const fb = fallbackLeaders.find(t => t.name === member.name);
      return {
        name: member.name,
        role: member.role,
        bio: member.bio || fb?.bio || "",
        img: member.image_url || fb?.img || "",
        focus: fb?.focus || ["Strategic Vision", "Community Support"]
      };
    })
    : fallbackLeaders;

  return (
    <SiteLayout>
      <div className="bg-gradient-to-b from-background via-[#FDFBF7] to-[#F3F0F8]/40 min-h-screen">
        <PageHeader
          eyebrow="Meet Our Team"
          title={<>The Leaders Behind the <span className="text-gradient-brand italic font-extrabold">Mission</span>.</>}
          subtitle="At SOAR Global Foundation Inc., our work is driven by a passionate and dedicated team of leaders who share a common vision: a world where every woman has access to stable housing, opportunity, and the resources to thrive."
          bgImage={programMentorImg}
        />

        {/* Board of Directors Bio Cards */}
        <section className="mx-auto max-w-[95%] px-6 pb-24 lg:px-10 mt-[50px] space-y-12 relative">
          <div className="absolute top-1/4 left-10 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

          <div className="border-b border-border pb-6 mb-12">
            <h2 className="font-display text-3xl font-extrabold text-foreground tracking-tight">Board of Directors</h2>
            <p className="text-sm text-muted-foreground mt-2 max-w-xl">
              Our Board of Directors provides strategic direction, governance, and oversight for the Foundation, ensuring pathways to homeownership remain ethical and accessible.
            </p>
          </div>

          <div className="space-y-10 relative z-10">
            {leaders.map((leader, index) => (
              <div
                key={index}
                className="w-full glass rounded-[32px] p-6 md:p-8 shadow-soft border border-white/60 hover:border-primary/20 hover:shadow-elegant transition-all duration-300 grid gap-8 md:grid-cols-[200px_1fr] items-start"
              >
                {/* Leader Photo Deck */}
                <div className="flex flex-col items-center">
                  <div className="size-44 rounded-2xl overflow-hidden border border-border shadow-md shrink-0 bg-gradient-to-tr from-primary/5 to-accent/5">
                    {leader.img ? (
                      <img src={leader.img} alt={leader.name} className="size-full object-cover" />
                    ) : (
                      <div className="size-full flex items-center justify-center text-primary text-3xl font-bold">
                        {leader.name.split(" ").map(n => n[0]).join("")}
                      </div>
                    )}
                  </div>
                  <h3 className="font-display text-lg font-extrabold text-foreground mt-4 text-center">{leader.name}</h3>
                  <span className="inline-block mt-1 text-xs font-extrabold uppercase tracking-wider text-primary">{leader.role}</span>
                </div>

                {/* Leader Bio Copy Deck */}
                <div className="space-y-4 flex flex-col justify-between h-full">
                  <div className="space-y-3">
                    {leader.bio.split("\n\n").map((para, pIdx) => (
                      <p key={pIdx} className="text-sm leading-relaxed text-muted-foreground">
                        {para}
                      </p>
                    ))}
                  </div>

                  {/* Areas of Focus Tags */}
                  <div className="pt-4 border-t border-border/40 mt-2">
                    <span className="text-[10px] uppercase tracking-[0.15em] text-[#D4AF37] font-extrabold">Areas of Focus:</span>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {leader.focus.map((f, fIdx) => (
                        <span
                          key={fIdx}
                          className="inline-block px-3 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-xs font-semibold text-primary"
                        >
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Commitment to Leadership Section */}
        <section className="mx-auto max-w-5xl px-6 pb-28 lg:px-10">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Core Alignment
            </span>
            <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
              Our Commitment to <span className="text-gradient-brand">Leadership</span>
            </h2>
            <p className="mt-4 text-sm text-muted-foreground max-w-2xl mx-auto">
              Our Board of Directors operates with a shared commitment to the values that define SOAR Global Foundation Inc.:
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto">
            {values.map((v, index) => (
              <div key={index} className="glass rounded-[22px] p-6 border border-white/50 shadow-soft hover:-translate-y-0.5 transition duration-300">
                <div className="size-11 rounded-xl bg-primary/5 text-primary flex items-center justify-center border border-primary/10 mb-4">
                  <v.icon className="size-5" />
                </div>
                <h4 className="text-base font-extrabold text-foreground tracking-tight">{v.title}</h4>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{v.copy}</p>
              </div>
            ))}
          </div>

          <p className="text-center text-xs text-muted-foreground mt-12 max-w-2xl mx-auto leading-relaxed">
            Together, our leadership team ensures that SOAR remains a trusted, transparent, and impactful organization serving women across communities.
          </p>
        </section>

        {/* Join Our Team Section */}
        <section className="mx-auto max-w-5xl px-6 pb-24 lg:px-10 text-center">
          <div className="glass rounded-[32px] p-8 md:p-12 shadow-elegant border border-[#D4AF37]/20 relative overflow-hidden">
            <div className="absolute right-[-10%] top-[-30%] w-[300px] h-[300px] rounded-full bg-accent/5 blur-[80px]" />
            <h3 className="text-2xl md:text-3xl font-extrabold text-foreground tracking-tight">Join Our Team</h3>
            <p className="mt-4 text-sm md:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              We are always looking for passionate individuals to join our mission. Whether you are interested in volunteering, serving on a committee, or exploring career opportunities, we would love to hear from you.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                to="/volunteer"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-accent px-6 py-3 text-xs font-bold uppercase tracking-wider text-white hover:scale-[1.03] active:scale-[0.98] transition shadow-soft cursor-pointer"
              >
                Learn About Volunteer Opportunities <ArrowRight className="size-3.5" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-6 py-3 text-xs font-bold uppercase tracking-wider text-foreground hover:bg-slate-50 transition shadow-sm"
              >
                Contact Us
              </Link>
            </div>

            <div className="mt-12 pt-6 border-t border-border/40">
              <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">
                The SOAR Global Foundation Inc. Board of Directors is committed to transparency, integrity, and the relentless pursuit of a world where every woman can find her dreams — and her home.
              </p>
            </div>
          </div>

          {/* Quick Footer Links Deck */}
          <div className="mt-16 flex flex-wrap justify-center items-center gap-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">
            <Link to="/about" className="inline-flex items-center gap-1.5 hover:text-primary transition">
              <ArrowLeft className="size-3" /> Back to About Us
            </Link>
            <span className="hidden sm:inline text-border">|</span>
            <Link to="/our-story" className="hover:text-primary transition">Our Story</Link>
            <span className="hidden sm:inline text-border">|</span>
            <Link to="/programs" className="hover:text-primary transition">Our Programs</Link>
            <span className="hidden sm:inline text-border">|</span>
            <Link to="/contact" className="hover:text-primary transition">Contact Us</Link>
          </div>
        </section>
      </div>
    </SiteLayout>
  );
}
