import Navbar from "@/components/Navbar";
import LightningEffect from "@/components/LightningEffect";
import HeroSection from "@/components/HeroSection";
import LogoCloud from "@/components/LogoCloud";
import FeatureGrid from "@/components/FeatureGrid";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="relative bg-background min-h-screen overflow-x-hidden">
      <Navbar />
      <LightningEffect />
      <HeroSection />
      <LogoCloud />
      <FeatureGrid />
      <Footer />
    </main>
  );
};

export default Index;
