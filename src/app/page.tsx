import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StatsBar from "@/components/StatsBar";
import LayananSection from "@/components/LayananSection";
import KeunggulanSection from "@/components/KeunggulanSection";
import ArmadaSection from "@/components/ArmadaSection";
import TestimoniSection from "@/components/TestimoniSection";
import CTABanner from "@/components/CTABanner";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <Navbar />
      <HeroSection />
      <StatsBar />
      <LayananSection />
      <KeunggulanSection />
      <ArmadaSection />
      <TestimoniSection />
      <CTABanner />
      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}
