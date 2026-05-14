import {
  FileCheck,
  Plane,
  Globe2,
  Hotel,
  Clock,
  Headphones,
  Award,
  TrendingUp,
} from "lucide-react";

export const services = [
  {
    icon: FileCheck,
    title: "Tourist & Student Visa",
    description:
      "End-to-end visa processing for tourist, student, work, and family visas with high success rates.",
  },
  {
    icon: Globe2,
    title: "Global Tour Packages",
    description:
      "Hand-crafted itineraries across Asia, Europe, and the Middle East — from solo to group escapes.",
  },
  {
    icon: Plane,
    title: "Air Ticketing",
    description:
      "Best-fare flights with leading airlines, flexible options and dedicated booking support.",
  },
  {
    icon: Hotel,
    title: "Hotel Reservations",
    description:
      "Curated stays from boutique to luxury, with negotiated rates and instant confirmation.",
  },
];

export const packages = [
  {
    id: 1,
    image: "/photos/photo-1.jpg",
    destination: "Dubai, UAE",
    duration: "4 Days / 3 Nights",
    price: 65000,
    tag: "Bestseller",
    highlights: ["Desert Safari", "Burj Khalifa", "Marina Cruise"],
  },
  {
    id: 2,
    image: "/photos/photo-2.jpg",
    destination: "Bali, Indonesia",
    duration: "5 Days / 4 Nights",
    price: 78000,
    tag: "Honeymoon",
    highlights: ["Ubud Villas", "Nusa Penida", "Sunset Dinner"],
  },
  {
    id: 3,
    image: "/photos/photo-3.jpg",
    destination: "Kuala Lumpur, Malaysia",
    duration: "4 Days / 3 Nights",
    price: 55000,
    tag: "Family Friendly",
    highlights: ["Twin Towers", "Genting Highlands", "Batu Caves"],
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=1200&q=80",
    destination: "Tokyo, Japan",
    duration: "7 Days / 6 Nights",
    price: 165000,
    tag: "Premium",
    highlights: ["Shibuya", "Mt. Fuji Day Trip", "Kyoto Bullet Train"],
  },
  {
    id: 5,
    image:
      "https://images.unsplash.com/photo-1538970272646-f61fabb3a8a2?auto=format&fit=crop&w=1200&q=80",
    destination: "Istanbul, Türkiye",
    duration: "5 Days / 4 Nights",
    price: 92000,
    tag: "Cultural",
    highlights: ["Hagia Sophia", "Bosphorus Cruise", "Cappadocia Add-on"],
  },
  {
    id: 6,
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80",
    destination: "Paris, France",
    duration: "6 Days / 5 Nights",
    price: 185000,
    tag: "Luxury",
    highlights: ["Eiffel Tower", "Louvre Museum", "Seine Dinner Cruise"],
  },
];

export const whyChooseUs = [
  {
    icon: Clock,
    title: "Fast Visa Processing",
    description:
      "Streamlined documentation and embassy liaison so your visa moves on the fast track.",
  },
  {
    icon: Headphones,
    title: "24/7 Customer Support",
    description:
      "Speak to a real consultant — day or night — wherever you are in the world.",
  },
  {
    icon: Award,
    title: "Expert Consultants",
    description:
      "A team with deep embassy relationships and years of cross-border travel expertise.",
  },
  {
    icon: TrendingUp,
    title: "High Success Rate",
    description:
      "A proven track record of approved visas and delighted travellers across every continent.",
  },
];

export const galleryImages = [
  { src: "/photos/photo-1.jpg", alt: "SKY VISALink success moment" },
  { src: "/photos/photo-2.jpg", alt: "SKY VISALink team and clients" },
  { src: "/photos/photo-3.jpg", alt: "SKY VISALink visa handover" },
  {
    src: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1000&q=80",
    alt: "Traveller with passport",
  },
  {
    src: "https://images.unsplash.com/photo-1530521954074-e64f6810b32d?auto=format&fit=crop&w=1000&q=80",
    alt: "Airport departures",
  },
  {
    src: "https://images.unsplash.com/photo-1517760444937-f6397edcbbcd?auto=format&fit=crop&w=1000&q=80",
    alt: "Mountain getaway",
  },
  {
    src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80",
    alt: "Tropical beach",
  },
  {
    src: "https://images.unsplash.com/photo-1500835556837-99ac94a94552?auto=format&fit=crop&w=1000&q=80",
    alt: "Holiday luggage",
  },
];

export const navLinks = [
  { href: "/#home", label: "Home" },
  { href: "/#services", label: "Services" },
  { href: "/#packages", label: "Packages" },
  { href: "/#gallery", label: "Gallery" },
  { href: "/#contact", label: "Contact" },
];

export const businessInfo = {
  name: "SKY VISALink",
  tagline: "Your Gateway to the World",
  phone: "+60 11-6912 9162",
  whatsapp: "601169129162",
  email: "skyvisalink@gmail.com",
  address: "Malaysia",
  facebook: "https://www.facebook.com/profile.php?id=61589069131768",
};
