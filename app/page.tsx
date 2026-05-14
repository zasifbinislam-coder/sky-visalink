import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import VisaCategories from "@/components/VisaCategories";
import Packages from "@/components/Packages";
import WhyChooseUs from "@/components/WhyChooseUs";
import Gallery from "@/components/Gallery";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-white">
      <Navbar />
      <Hero />
      <Services />
      <VisaCategories />
      <Packages />
      <WhyChooseUs />
      <Gallery />
      <Contact />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
