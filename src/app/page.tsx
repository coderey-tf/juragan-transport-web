import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StatsBar from "@/components/StatsBar";
import LayananSection from "@/components/LayananSection";
import KeunggulanSection from "@/components/KeunggulanSection";
import ArmadaSection from "@/components/ArmadaSection";
import TestimoniSection from "@/components/TestimoniSection";
import TiktokSection from "@/components/TiktokSection";
import CTABanner from "@/components/CTABanner";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import AnimatedSection from "@/components/AnimatedSection";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <Navbar />
      
      <AnimatedSection direction="none" delay={0}>
        <HeroSection />
      </AnimatedSection>

      <AnimatedSection direction="up" delay={0.3}>
        <StatsBar />
      </AnimatedSection>

      <AnimatedSection direction="up" delay={0.1}>
        <LayananSection />
      </AnimatedSection>

      <AnimatedSection direction="up" delay={0.1}>
        <KeunggulanSection />
      </AnimatedSection>

      <AnimatedSection direction="up" delay={0.1}>
        <ArmadaSection />
      </AnimatedSection>

      <AnimatedSection direction="up" delay={0.1}>
        <TestimoniSection />
      </AnimatedSection>

      <AnimatedSection direction="up" delay={0.1}>
        <TiktokSection />
      </AnimatedSection>

      <AnimatedSection direction="up" delay={0.1}>
        <CTABanner />
      </AnimatedSection>

      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}
