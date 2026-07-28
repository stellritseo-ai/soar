import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { HeroSection } from "@/components/site/landing/HeroSection";
import { AboutSection } from "@/components/site/landing/AboutSection";
import { ValuesSection } from "@/components/site/landing/ValuesSection";
import { ProgramsSection } from "@/components/site/landing/ProgramsSection";
import { EventsSection } from "@/components/site/landing/EventsSection";
import { ImpactSection } from "@/components/site/landing/ImpactSection";
import { StoriesSection } from "@/components/site/landing/StoriesSection";
import { TeamSection } from "@/components/site/landing/TeamSection";
import { DonateCTASection } from "@/components/site/landing/DonateCTASection";
import { ContactCTASection } from "@/components/site/landing/ContactCTASection";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SOAR Global Foundation Inc. — Empowering Women & Homeownership in Orlando, FL" },
      {
        name: "description",
        content:
          "SOAR Global Foundation Inc. empowers women to overcome adversity through education, mentorship, financial literacy workshops, and pathways to homeownership in Orlando, FL.",
      },
      {
        name: "keywords",
        content:
          "women empowerment non profit Orlando FL, 501c3 foundation Orlando, first-time homebuyer education women, financial literacy workshops, women mentorship Florida, purple hearts gala 2026, donate to women charity Orlando",
      },
      { property: "og:title", content: "SOAR Global Foundation Inc. — Helping Women Dream Again" },
      { property: "og:url", content: "https://soarglobalfoundation.org/" },
    ],
    links: [{ rel: "canonical", href: "https://soarglobalfoundation.org/" }],
  }),
  component: Home,
});

function Home() {
  return (
    <SiteLayout>
      <HeroSection />
      <AboutSection />
      <ValuesSection />
      <ProgramsSection />
      <EventsSection />
      <ImpactSection />
      <StoriesSection />
      <TeamSection />
      <DonateCTASection />
      <ContactCTASection />
    </SiteLayout>
  );
}


