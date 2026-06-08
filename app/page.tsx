import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import LongFormSection from "@/components/LongFormSection";
import Navbar from "@/components/Navbar";
import ShortFormSection from "@/components/ShortFormSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ShortFormSection />
      <LongFormSection />
      <Footer />
    </div>
  );
}
