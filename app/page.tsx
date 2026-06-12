import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import LongFormSection from "@/components/LongFormSection";
import Navbar from "@/components/Navbar";
import ShortFormSection from "@/components/ShortFormSection";
import ShowcaseSection from "@/components/ShowcaseSection";
import ShowreelSection from "@/components/ShowreelSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <ShowreelSection />
      <ShowcaseSection />
      <AboutSection />
      <ShortFormSection />
      <LongFormSection />
      <Footer />
    </div>
  );
}
