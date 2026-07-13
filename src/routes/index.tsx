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
      { title: "SOAR Global Foundation — Helping Women Dream Again" },
      {
        name: "description",
        content:
          "Empowering women through education, mentorship, financial literacy, and pathways to homeownership. Donate, volunteer, or partner with SOAR.",
      },
    ],
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


