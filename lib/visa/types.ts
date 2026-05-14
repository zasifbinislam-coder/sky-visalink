export type VisaType = "student" | "tourist" | "business";

export type Region =
  | "South Asia"
  | "Southeast Asia"
  | "Middle East"
  | "East Asia"
  | "Europe"
  | "North America"
  | "Oceania";

export type ReqCategory =
  | "document"
  | "financial"
  | "photo"
  | "travel"
  | "medical"
  | "academic"
  | "business"
  | "other";

export type VisaRequirement = {
  category: ReqCategory;
  title: string;
  description: string;
  required: boolean;
};

export type VisaInfo = {
  processingTime: string;
  validity: string;
  stayDuration: string;
  entryType: string;
  feeRange: string;
  successRate?: string;
  requirements: VisaRequirement[];
  eligibility: string[];
  notes?: string[];
};

export type Country = {
  slug: string;
  name: string;
  flag: string;
  region: Region;
  image: string;
  capital: string;
  currency: string;
  shortDescription: string;
  popularFor: string[];
  visas: Partial<Record<VisaType, VisaInfo>>;
};

export const VISA_TYPE_META: Record<
  VisaType,
  {
    label: string;
    title: string;
    tagline: string;
    description: string;
    accent: string;
    accentSoft: string;
    icon: "graduation" | "palm" | "briefcase";
  }
> = {
  student: {
    label: "Student Visa",
    title: "Student Visa Services",
    tagline: "Study abroad with confidence",
    description:
      "End-to-end student visa support — from university selection and SOP review to documentation, financial profile, and embassy interview prep.",
    accent: "from-gold-500 to-navy-800",
    accentSoft: "bg-gold-50 text-gold-800",
    icon: "graduation",
  },
  tourist: {
    label: "Tourist Visa",
    title: "Tourist Visa Services",
    tagline: "Explore the world hassle-free",
    description:
      "Whether it's a family holiday, honeymoon, or solo escape — we handle visa documentation, appointments, and itinerary planning for 20+ destinations.",
    accent: "from-gold-400 to-gold-600",
    accentSoft: "bg-gold-100 text-gold-800",
    icon: "palm",
  },
  business: {
    label: "Business Visa",
    title: "Business Visa Services",
    tagline: "For meetings, conferences & trade",
    description:
      "Fast-track business visa processing for entrepreneurs, exporters, and corporate executives — with letter drafting and embassy liaison.",
    accent: "from-navy-800 to-gold-500",
    accentSoft: "bg-navy-50 text-navy-800",
    icon: "briefcase",
  },
};
