import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import VisaCategories from "@/components/VisaCategories";
import Packages from "@/components/Packages";
import AboutSection from "@/components/AboutSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import Gallery from "@/components/Gallery";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { getSettings } from "@/lib/store";

export const dynamic = "force-dynamic";

export default async function Home() {
  const settings = await getSettings();
  return (
    <main className="relative min-h-screen overflow-hidden bg-white">
      <Navbar />
      <Hero pricing={settings.pricing} />
      <Services />
      <VisaCategories />
      <Packages />
      <AboutSection />
      <WhyChooseUs />
      <Gallery />
      <Contact />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
