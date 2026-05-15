export type VisaType = "student" | "tourist" | "business" | "work";

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
    icon: "graduation" | "palm" | "briefcase" | "stamp";
  }
> = {
  student: {
    label: "Student Visa",
    title: "Student Visa Services",
    tagline: "Study abroad with confidence",
    description:
      "End-to-end student visa support — from university selection and SOP review to documentation, financial profile, and embassy interview prep.",
    accent: "from-indigo-500 to-violet-700",
    accentSoft: "bg-indigo-100 text-indigo-800",
    icon: "graduation",
  },
  tourist: {
    label: "Tourist Visa",
    title: "Tourist Visa Services",
    tagline: "Explore the world hassle-free",
    description:
      "Whether it's a family holiday, honeymoon, or solo escape — we handle visa documentation, appointments, and itinerary planning for 20+ destinations.",
    accent: "from-amber-400 to-orange-500",
    accentSoft: "bg-amber-100 text-amber-800",
    icon: "palm",
  },
  business: {
    label: "Business Visa",
    title: "Business Visa Services",
    tagline: "For meetings, conferences & trade",
    description:
      "Fast-track business visa processing for entrepreneurs, exporters, and corporate executives — with letter drafting and embassy liaison.",
    accent: "from-navy-800 to-slate-900",
    accentSoft: "bg-navy-100 text-navy-800",
    icon: "briefcase",
  },
  work: {
    label: "Work Permit",
    title: "Work Permit Services",
    tagline: "Build your career in Europe",
    description:
      "Work permits and employment visas for Romania, Poland, Hungary, Malta and 8 more European destinations — with job offer verification and embassy submission.",
    accent: "from-emerald-500 to-teal-700",
    accentSoft: "bg-emerald-100 text-emerald-800",
    icon: "stamp",
  },
};
