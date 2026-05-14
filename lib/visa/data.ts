import type { Country, VisaRequirement, VisaType } from "./types";

// ──────────────────────────────────────────────────────────────────────────
// Shared requirement builders — keep country entries concise.
// Override per-country where specifics differ (photo size, validity, etc).
// ──────────────────────────────────────────────────────────────────────────

const passport = (months = 6): VisaRequirement => ({
  category: "document",
  title: "Valid Passport",
  description: `Minimum ${months} months validity beyond intended stay, with at least 2 blank pages. Old passports (if any) must also be submitted.`,
  required: true,
});

const photos = (
  spec = "Two recent passport-size photos (35×45 mm), white background, taken within the last 6 months.",
): VisaRequirement => ({
  category: "photo",
  title: "Passport-size Photographs",
  description: spec,
  required: true,
});

const applicationForm: VisaRequirement = {
  category: "document",
  title: "Visa Application Form",
  description:
    "Duly filled and signed visa application form (online or paper, depending on embassy).",
  required: true,
};

const coverLetter: VisaRequirement = {
  category: "document",
  title: "Cover Letter",
  description:
    "Personal cover letter explaining purpose of visit, travel dates, ties to home country, and intent to return.",
  required: true,
};

const nidBirth: VisaRequirement = {
  category: "document",
  title: "NID / Birth Certificate",
  description:
    "Photocopy of National ID card. Birth certificate may be required for minors or first-time applicants.",
  required: true,
};

const bankStatements = (months = 6): VisaRequirement => ({
  category: "financial",
  title: `Bank Statements (last ${months} months)`,
  description: `Official bank statements covering the last ${months} months, with sufficient balance and consistent activity. Statements must be on bank letterhead with stamp and signature.`,
  required: true,
});

const bankSolvency: VisaRequirement = {
  category: "financial",
  title: "Bank Solvency Certificate",
  description:
    "Solvency certificate issued by your bank confirming available balance and account standing.",
  required: true,
};

const incomeTax: VisaRequirement = {
  category: "financial",
  title: "Income Tax Return (TIN) Documents",
  description:
    "Latest 2–3 years of TIN certificate and tax returns acknowledgement.",
  required: false,
};

const salarySlips: VisaRequirement = {
  category: "financial",
  title: "Salary Slips",
  description:
    "Last 3–6 months of salary slips if employed (or equivalent income proof).",
  required: false,
};

const employmentNOC: VisaRequirement = {
  category: "document",
  title: "Employment NOC",
  description:
    "No Objection Certificate from employer on company letterhead, stating designation, salary, leave approval, and assurance of return.",
  required: true,
};

const businessDocs: VisaRequirement = {
  category: "business",
  title: "Business / Trade License",
  description:
    "Valid trade license (with English translation), TIN, VAT registration, and last 3 years of business bank statements (for business owners).",
  required: true,
};

const studentDocs: VisaRequirement = {
  category: "document",
  title: "Student ID / Institution Letter",
  description:
    "Student ID card and an official letter from current school/college/university confirming enrolment.",
  required: true,
};

const flightBooking: VisaRequirement = {
  category: "travel",
  title: "Flight Reservation",
  description:
    "Confirmed round-trip flight reservation (dummy booking accepted by most consulates; ticket purchased only after visa approval).",
  required: true,
};

const hotelBooking: VisaRequirement = {
  category: "travel",
  title: "Hotel Reservation",
  description:
    "Confirmed hotel booking for the entire duration of stay (refundable bookings recommended pre-approval).",
  required: true,
};

const itinerary: VisaRequirement = {
  category: "travel",
  title: "Day-by-Day Travel Itinerary",
  description:
    "Detailed itinerary covering cities, sightseeing plans, and accommodation for each day of the trip.",
  required: true,
};

const insurance = (coverage = "€30,000 / USD 50,000"): VisaRequirement => ({
  category: "medical",
  title: "Travel / Medical Insurance",
  description: `Travel insurance covering minimum ${coverage} for medical emergencies, hospitalisation, and repatriation, valid throughout the stay.`,
  required: true,
});

const acceptanceLetter = (
  name = "Acceptance / Offer Letter",
  detail = "Official acceptance letter from the recognised institution confirming admission, programme details, and tuition fee structure.",
): VisaRequirement => ({
  category: "academic",
  title: name,
  description: detail,
  required: true,
});

const academicDocs: VisaRequirement = {
  category: "academic",
  title: "Academic Transcripts & Certificates",
  description:
    "All academic certificates, transcripts, and mark sheets (SSC, HSC, Bachelor's, Master's as applicable). Attested copies usually required.",
  required: true,
};

const englishProof: VisaRequirement = {
  category: "academic",
  title: "English Language Proficiency",
  description:
    "IELTS / TOEFL / PTE / Duolingo score certificate meeting the institution's and embassy's minimum requirement.",
  required: true,
};

const sop: VisaRequirement = {
  category: "academic",
  title: "Statement of Purpose (SOP)",
  description:
    "Personal essay explaining academic background, why this course/country, future plans, and intent to return.",
  required: true,
};

const sponsorDocs: VisaRequirement = {
  category: "financial",
  title: "Sponsor's Financial Documents",
  description:
    "Sponsor's bank statements, income tax returns, salary certificate / business documents, plus signed affidavit of support.",
  required: true,
};

const policeClearance: VisaRequirement = {
  category: "document",
  title: "Police Clearance Certificate",
  description:
    "PCC issued by the Bangladesh Police or Special Branch confirming no criminal record.",
  required: true,
};

const medicalCert: VisaRequirement = {
  category: "medical",
  title: "Medical Examination Report",
  description:
    "Medical fitness report from an authorised panel physician (TB, HIV and general health screening).",
  required: true,
};

const invitationLetter = (
  context = "host company abroad",
): VisaRequirement => ({
  category: "business",
  title: "Invitation Letter",
  description: `Original invitation letter from the ${context} on company letterhead — including dates, purpose of visit, financial responsibility, and contact details.`,
  required: true,
});

const conferenceLetter: VisaRequirement = {
  category: "business",
  title: "Conference / Event Invitation",
  description:
    "Confirmation letter or registration for the conference, exhibition, or training programme (if applicable).",
  required: false,
};

// ──────────────────────────────────────────────────────────────────────────
// Country dataset (22 destinations)
// ──────────────────────────────────────────────────────────────────────────

export const countries: Country[] = [
  // ── SOUTH ASIA ────────────────────────────────────────────────────────
  {
    slug: "india",
    name: "India",
    flag: "🇮🇳",
    region: "South Asia",
    image:
      "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80",
    capital: "New Delhi",
    currency: "INR (₹)",
    shortDescription:
      "Taj Mahal, Kashmir, Kerala backwaters, Bollywood — India offers a lifetime in one country.",
    popularFor: ["Medical", "Tourism", "Education", "Pilgrimage"],
    visas: {
      tourist: {
        processingTime: "5–7 working days",
        validity: "1 year (Multiple entry)",
        stayDuration: "Up to 90 days per visit",
        entryType: "Multiple",
        feeRange: "BDT 800 – 1,800 (visa fee + service)",
        successRate: "Very High",
        requirements: [
          passport(),
          photos(
            "Two recent 2×2 inch (51×51 mm) photos, white background, full face.",
          ),
          applicationForm,
          coverLetter,
          nidBirth,
          bankStatements(6),
          { ...employmentNOC, required: false },
          flightBooking,
          hotelBooking,
          itinerary,
        ],
        eligibility: [
          "Bangladeshi citizens holding a valid MRP/e-Passport.",
          "Genuine intent to visit India for tourism, family, or short medical purposes.",
          "Sufficient funds for stay and clear travel plan.",
        ],
        notes: [
          "Apply online via IVAC (Indian Visa Application Centre) Dhaka, Chittagong, Sylhet, etc.",
          "Slot availability is the biggest delay factor — book early.",
        ],
      },
      student: {
        processingTime: "10–15 working days",
        validity: "Duration of course (up to 5 years)",
        stayDuration: "Course duration",
        entryType: "Multiple",
        feeRange: "BDT 5,500 – 7,000",
        requirements: [
          passport(12),
          photos(),
          applicationForm,
          coverLetter,
          acceptanceLetter(
            "Admission Letter from Indian Institution",
            "Original admission letter from a UGC/AICTE-recognised institution, confirming course, duration, and fee structure.",
          ),
          academicDocs,
          { ...englishProof, required: false },
          sponsorDocs,
          bankStatements(6),
          medicalCert,
        ],
        eligibility: [
          "Confirmed admission in a recognised Indian institution.",
          "Proven financial capability to cover tuition and living costs.",
          "No adverse immigration history.",
        ],
        notes: [
          "Apply through IVAC under the Student Visa category.",
          "Foreigner registration (FRRO) required within 14 days of arrival if course > 180 days.",
        ],
      },
      business: {
        processingTime: "7–10 working days",
        validity: "1 – 5 years (Multiple entry)",
        stayDuration: "Up to 180 days per visit",
        entryType: "Multiple",
        feeRange: "BDT 6,000 – 11,000",
        requirements: [
          passport(),
          photos(),
          applicationForm,
          coverLetter,
          invitationLetter("Indian business partner / company"),
          businessDocs,
          bankStatements(6),
          incomeTax,
          flightBooking,
          hotelBooking,
        ],
        eligibility: [
          "Genuine business purpose — meetings, trade fairs, contract negotiation, or industrial setup.",
          "Verifiable business background in Bangladesh.",
        ],
      },
    },
  },

  // ── SOUTHEAST ASIA ────────────────────────────────────────────────────
  {
    slug: "thailand",
    name: "Thailand",
    flag: "🇹🇭",
    region: "Southeast Asia",
    image:
      "https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=1200&q=80",
    capital: "Bangkok",
    currency: "THB (฿)",
    shortDescription:
      "Bangkok temples, Phuket beaches, Chiang Mai mountains — and the world's best street food.",
    popularFor: ["Beaches", "Honeymoon", "Shopping", "Wellness"],
    visas: {
      tourist: {
        processingTime: "5–10 working days",
        validity: "3 months from issue",
        stayDuration: "Up to 60 days",
        entryType: "Single / Multiple",
        feeRange: "BDT 4,500 – 5,500 (single entry)",
        successRate: "High",
        requirements: [
          passport(),
          photos("Two recent 4×6 cm photos, white background, no glasses."),
          applicationForm,
          coverLetter,
          bankStatements(6),
          { ...bankSolvency, description: "Minimum balance equivalent to THB 20,000 per person / THB 40,000 per family." },
          employmentNOC,
          flightBooking,
          hotelBooking,
          itinerary,
          insurance("THB 100,000 / USD 3,000"),
        ],
        eligibility: [
          "Genuine tourism intent with confirmed return ticket.",
          "Sufficient funds (THB 20,000+ per person).",
          "Clear travel and accommodation plan.",
        ],
        notes: [
          "Apply via VFS Global Bangkok visa centre in Dhaka.",
          "E-Visa portal also available for Bangladeshi passport holders.",
        ],
      },
      business: {
        processingTime: "7–10 working days",
        validity: "3 months – 1 year",
        stayDuration: "Up to 90 days per entry",
        entryType: "Single / Multiple",
        feeRange: "BDT 8,000 – 22,000",
        requirements: [
          passport(),
          photos(),
          applicationForm,
          coverLetter,
          invitationLetter("Thai company / business partner"),
          businessDocs,
          bankStatements(6),
          flightBooking,
          hotelBooking,
        ],
        eligibility: [
          "Verifiable business in Bangladesh and confirmed Thai counterpart.",
          "Purpose: meetings, trade, exhibitions, or consultation.",
        ],
      },
    },
  },
  {
    slug: "malaysia",
    name: "Malaysia",
    flag: "🇲🇾",
    region: "Southeast Asia",
    image:
      "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=1200&q=80",
    capital: "Kuala Lumpur",
    currency: "MYR (RM)",
    shortDescription:
      "Twin Towers, Langkawi beaches, Genting highlands — affordable luxury an hour from home.",
    popularFor: ["Family", "Education", "Shopping", "Honeymoon"],
    visas: {
      tourist: {
        processingTime: "3–5 working days (eVisa)",
        validity: "3 months",
        stayDuration: "Up to 30 days",
        entryType: "Single",
        feeRange: "BDT 3,500 – 4,500",
        successRate: "Very High",
        requirements: [
          passport(),
          photos("One recent 35×50 mm photo, white background."),
          applicationForm,
          bankStatements(3),
          flightBooking,
          hotelBooking,
          { ...employmentNOC, required: false },
        ],
        eligibility: [
          "Tourism, family visit, or short business meeting.",
          "Confirmed return ticket and accommodation.",
        ],
        notes: [
          "eVisa available online — fast and paperless.",
          "Visa-on-arrival not available; arrange before travel.",
        ],
      },
      student: {
        processingTime: "4–8 weeks",
        validity: "Course duration",
        stayDuration: "Course duration",
        entryType: "Multiple",
        feeRange: "BDT 25,000 – 40,000 (EMGS + visa)",
        requirements: [
          passport(12),
          photos(),
          applicationForm,
          acceptanceLetter(
            "EMGS Approval Letter",
            "Visa Approval Letter (VAL) issued by Education Malaysia Global Services after institution submits your application.",
          ),
          academicDocs,
          englishProof,
          sponsorDocs,
          bankStatements(6),
          medicalCert,
          insurance("EMGS-approved health insurance"),
        ],
        eligibility: [
          "Confirmed admission in MQA-recognised institution.",
          "Financial proof for tuition + ~MYR 12,000/year living costs.",
          "Health screening clearance.",
        ],
        notes: [
          "EMGS handles bulk of paperwork through your institution.",
          "Single Entry Visa stamped from Malaysian High Commission Dhaka after VAL.",
        ],
      },
      business: {
        processingTime: "5–7 working days",
        validity: "3 months",
        stayDuration: "Up to 30 days per entry",
        entryType: "Single / Multiple",
        feeRange: "BDT 4,000 – 8,000",
        requirements: [
          passport(),
          photos(),
          applicationForm,
          invitationLetter("Malaysian business partner / company"),
          businessDocs,
          bankStatements(6),
          flightBooking,
          hotelBooking,
        ],
        eligibility: [
          "Genuine business engagement with Malaysian entity.",
          "Trade license / company registration in Bangladesh.",
        ],
      },
    },
  },
  {
    slug: "singapore",
    name: "Singapore",
    flag: "🇸🇬",
    region: "Southeast Asia",
    image:
      "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1200&q=80",
    capital: "Singapore",
    currency: "SGD (S$)",
    shortDescription:
      "Marina Bay Sands, Sentosa, Universal Studios — the cleanest, slickest city-state in Asia.",
    popularFor: ["Family", "Medical", "Education", "Business"],
    visas: {
      tourist: {
        processingTime: "3–5 working days",
        validity: "Up to 2 years (Multiple entry, at discretion)",
        stayDuration: "Up to 30 days per visit",
        entryType: "Single / Multiple",
        feeRange: "BDT 3,500 – 5,000",
        successRate: "Moderate to High (strict)",
        requirements: [
          passport(),
          photos("Two recent 35×45 mm photos, white background."),
          applicationForm,
          coverLetter,
          bankStatements(6),
          { ...bankSolvency, description: "Healthy balance — typically SGD 3,000+ equivalent per traveller." },
          employmentNOC,
          flightBooking,
          hotelBooking,
          itinerary,
        ],
        eligibility: [
          "Visa applications submitted only through ICA-authorised local sponsors / agents.",
          "Strong financial profile and ties to home country.",
        ],
        notes: [
          "Singapore High Commission does not accept direct walk-in tourist visa applications — must go through authorised agent.",
        ],
      },
      student: {
        processingTime: "1–2 months",
        validity: "Duration of course",
        stayDuration: "Course duration",
        entryType: "Multiple",
        feeRange: "BDT 8,000 – 15,000",
        requirements: [
          passport(12),
          photos(),
          applicationForm,
          acceptanceLetter(
            "In-Principle Approval (IPA) from ICA",
            "IPA letter issued by Immigration & Checkpoints Authority after institution submits Student Pass application.",
          ),
          academicDocs,
          englishProof,
          sponsorDocs,
          bankStatements(6),
          medicalCert,
        ],
        eligibility: [
          "Admission to MOE-registered or autonomous university (NUS, NTU, SMU, etc.).",
          "Financial capability for tuition + ~SGD 1,500/month living costs.",
        ],
      },
      business: {
        processingTime: "3–5 working days",
        validity: "Up to 2 years",
        stayDuration: "Up to 30 days per entry",
        entryType: "Multiple",
        feeRange: "BDT 5,000 – 10,000",
        requirements: [
          passport(),
          photos(),
          applicationForm,
          invitationLetter("Singapore company"),
          businessDocs,
          bankStatements(6),
          flightBooking,
          hotelBooking,
        ],
        eligibility: [
          "Established business in Bangladesh and verifiable Singapore counterpart.",
        ],
      },
    },
  },
  {
    slug: "indonesia",
    name: "Indonesia",
    flag: "🇮🇩",
    region: "Southeast Asia",
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80",
    capital: "Jakarta",
    currency: "IDR (Rp)",
    shortDescription:
      "Bali rice terraces, Komodo dragons, Borobudur — 17,000 islands of adventure.",
    popularFor: ["Honeymoon", "Beaches", "Adventure", "Wellness"],
    visas: {
      tourist: {
        processingTime: "3–5 working days (e-VOA / B211A)",
        validity: "90 days from issue",
        stayDuration: "30 days (extendable to 60)",
        entryType: "Single",
        feeRange: "BDT 4,500 – 12,000",
        successRate: "High",
        requirements: [
          passport(),
          photos("Recent passport-size photo, red or white background."),
          applicationForm,
          bankStatements(3),
          { ...bankSolvency, description: "Minimum USD 2,000 balance per traveller." },
          flightBooking,
          hotelBooking,
          itinerary,
        ],
        eligibility: [
          "Tourism, family visit, or yoga / wellness retreat.",
          "Confirmed return / onward ticket.",
        ],
        notes: [
          "e-VOA (Visa on Arrival) available online for Bangladeshi nationals at major airports.",
          "B211A tourist visa preferred for longer stays — applied through agent.",
        ],
      },
      business: {
        processingTime: "5–10 working days",
        validity: "60 days",
        stayDuration: "Up to 60 days, extendable",
        entryType: "Single / Multiple",
        feeRange: "BDT 12,000 – 25,000",
        requirements: [
          passport(),
          photos(),
          applicationForm,
          invitationLetter("Indonesian company / sponsor"),
          businessDocs,
          bankStatements(6),
          flightBooking,
          hotelBooking,
        ],
        eligibility: [
          "Verifiable business purpose, non-employment.",
          "Indonesian sponsor company must apply for Telex Visa Approval.",
        ],
      },
    },
  },
  {
    slug: "vietnam",
    name: "Vietnam",
    flag: "🇻🇳",
    region: "Southeast Asia",
    image:
      "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80",
    capital: "Hanoi",
    currency: "VND (₫)",
    shortDescription:
      "Ha Long Bay cruises, Hoi An lanterns, pho on every corner — Southeast Asia's rising star.",
    popularFor: ["Adventure", "Culture", "Food", "Honeymoon"],
    visas: {
      tourist: {
        processingTime: "3–5 working days (e-Visa)",
        validity: "90 days",
        stayDuration: "Up to 90 days",
        entryType: "Single / Multiple",
        feeRange: "BDT 3,500 – 6,500",
        successRate: "Very High",
        requirements: [
          passport(),
          photos("4×6 cm photo, white background, no glasses."),
          applicationForm,
          bankStatements(3),
          flightBooking,
          hotelBooking,
        ],
        eligibility: [
          "Standard tourism intent.",
          "Confirmed accommodation and onward ticket.",
        ],
        notes: [
          "Convenient e-Visa available online (evisa.xuatnhapcanh.gov.vn).",
        ],
      },
      business: {
        processingTime: "5–7 working days",
        validity: "1 – 3 months",
        stayDuration: "Up to 90 days",
        entryType: "Single / Multiple",
        feeRange: "BDT 6,000 – 15,000",
        requirements: [
          passport(),
          photos(),
          applicationForm,
          invitationLetter("Vietnamese company"),
          businessDocs,
          bankStatements(6),
          flightBooking,
          hotelBooking,
        ],
        eligibility: [
          "Genuine business or trade purpose.",
          "Vietnamese inviting company must obtain approval letter from Vietnam Immigration.",
        ],
      },
    },
  },

  // ── MIDDLE EAST ───────────────────────────────────────────────────────
  {
    slug: "uae",
    name: "United Arab Emirates",
    flag: "🇦🇪",
    region: "Middle East",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80",
    capital: "Abu Dhabi",
    currency: "AED (د.إ)",
    shortDescription:
      "Burj Khalifa, desert safaris, Yas Island — the Middle East's most cosmopolitan playground.",
    popularFor: ["Family", "Shopping", "Business", "Stopovers"],
    visas: {
      tourist: {
        processingTime: "3–5 working days",
        validity: "60 days from issue",
        stayDuration: "30 / 60 / 90 days",
        entryType: "Single / Multiple",
        feeRange: "BDT 8,000 – 28,000",
        successRate: "High",
        requirements: [
          passport(),
          photos("White background, 4.3×5.5 cm, no glasses, ears visible."),
          applicationForm,
          bankStatements(6),
          { ...bankSolvency, description: "Minimum balance equivalent to AED 5,000–10,000 per traveller." },
          employmentNOC,
          flightBooking,
          hotelBooking,
          insurance("AED 100,000 medical cover"),
        ],
        eligibility: [
          "Sponsored visa via airline (Emirates / Etihad / flydubai) or licensed UAE-based travel agency.",
          "Sufficient funds and confirmed accommodation.",
        ],
        notes: [
          "Most applications routed through Emirates/Etihad e-visa platforms once flight is booked.",
          "Multiple-entry 5-year tourist visa now also available for eligible travellers.",
        ],
      },
      business: {
        processingTime: "3–5 working days",
        validity: "60 days",
        stayDuration: "14 / 30 / 90 days",
        entryType: "Single / Multiple",
        feeRange: "BDT 15,000 – 45,000",
        requirements: [
          passport(),
          photos(),
          applicationForm,
          invitationLetter("UAE-licensed company / free zone entity"),
          businessDocs,
          bankStatements(6),
          flightBooking,
          hotelBooking,
        ],
        eligibility: [
          "UAE-licensed sponsor (LLC / free zone company) required.",
          "Verifiable business activity in Bangladesh.",
        ],
      },
    },
  },
  {
    slug: "saudi-arabia",
    name: "Saudi Arabia",
    flag: "🇸🇦",
    region: "Middle East",
    image:
      "https://images.unsplash.com/photo-1586724237569-f3d0c1dee8c6?auto=format&fit=crop&w=1200&q=80",
    capital: "Riyadh",
    currency: "SAR (﷼)",
    shortDescription:
      "Umrah, AlUla rock formations, Red Sea reefs — the Kingdom is now open for tourism.",
    popularFor: ["Pilgrimage", "Culture", "Business", "Adventure"],
    visas: {
      tourist: {
        processingTime: "2–5 working days (e-Visa)",
        validity: "1 year",
        stayDuration: "90 days per visit, 180 days/year total",
        entryType: "Multiple",
        feeRange: "BDT 14,000 – 16,000 (visa + insurance)",
        successRate: "Very High",
        requirements: [
          passport(),
          photos("White background, 6×6 cm preferred."),
          applicationForm,
          bankStatements(3),
          flightBooking,
          hotelBooking,
          { ...insurance("Mandatory health insurance issued with visa"), required: true },
        ],
        eligibility: [
          "Open to Bangladeshi passport holders via the Saudi e-Visa portal.",
          "Tourism, family visit, or attending events — not for Hajj/Umrah (separate process).",
        ],
        notes: [
          "Apply at visa.visitsaudi.com.",
          "Umrah requires a separate Umrah visa via authorised agents.",
        ],
      },
      business: {
        processingTime: "5–10 working days",
        validity: "1 year",
        stayDuration: "Up to 90 days per entry",
        entryType: "Single / Multiple",
        feeRange: "BDT 20,000 – 35,000",
        requirements: [
          passport(),
          photos(),
          applicationForm,
          invitationLetter("Saudi company (must include Chamber of Commerce attestation)"),
          businessDocs,
          bankStatements(6),
          flightBooking,
        ],
        eligibility: [
          "Saudi inviting company must obtain Enjaz visa invitation from Ministry of Foreign Affairs.",
        ],
      },
    },
  },
  {
    slug: "qatar",
    name: "Qatar",
    flag: "🇶🇦",
    region: "Middle East",
    image:
      "https://images.unsplash.com/photo-1572252009286-268acec5ca0a?auto=format&fit=crop&w=1200&q=80",
    capital: "Doha",
    currency: "QAR (﷼)",
    shortDescription:
      "Doha's futuristic skyline, Museum of Islamic Art, desert dunes — and post-World Cup glow.",
    popularFor: ["Stopovers", "Business", "Sports", "Shopping"],
    visas: {
      tourist: {
        processingTime: "3–5 working days",
        validity: "30 days from issue",
        stayDuration: "30 days (extendable)",
        entryType: "Single",
        feeRange: "BDT 8,000 – 12,000",
        successRate: "High",
        requirements: [
          passport(),
          photos(),
          applicationForm,
          bankStatements(3),
          flightBooking,
          hotelBooking,
          insurance("QAR 150,000 cover"),
        ],
        eligibility: [
          "Apply via Qatar Visa Service (online) or through Qatar Airways for ticket holders.",
          "Sufficient funds and confirmed return.",
        ],
        notes: [
          "Hayya Card replaced traditional tourist visas during World Cup — current tourist visa via QVS portal.",
        ],
      },
      business: {
        processingTime: "5–7 working days",
        validity: "30 days",
        stayDuration: "Up to 30 days",
        entryType: "Single",
        feeRange: "BDT 12,000 – 22,000",
        requirements: [
          passport(),
          photos(),
          applicationForm,
          invitationLetter("Qatari company"),
          businessDocs,
          bankStatements(6),
          flightBooking,
          hotelBooking,
        ],
        eligibility: [
          "Qatari sponsor company must apply via Ministry of Interior MoI portal.",
        ],
      },
    },
  },
  {
    slug: "turkiye",
    name: "Türkiye",
    flag: "🇹🇷",
    region: "Middle East",
    image:
      "https://images.unsplash.com/photo-1538970272646-f61fabb3a8a2?auto=format&fit=crop&w=1200&q=80",
    capital: "Ankara",
    currency: "TRY (₺)",
    shortDescription:
      "Istanbul's Bosphorus, Cappadocia balloons, Pamukkale terraces — where two continents meet.",
    popularFor: ["Culture", "Honeymoon", "Education", "Medical"],
    visas: {
      tourist: {
        processingTime: "10–15 working days",
        validity: "180 days from issue",
        stayDuration: "Up to 30 days",
        entryType: "Single",
        feeRange: "BDT 6,500 – 9,500",
        successRate: "Moderate to High",
        requirements: [
          passport(),
          photos("Two recent 5×6 cm biometric photos, white background."),
          applicationForm,
          coverLetter,
          bankStatements(6),
          { ...bankSolvency, description: "Minimum balance equivalent to USD 50/day of stay." },
          employmentNOC,
          flightBooking,
          hotelBooking,
          itinerary,
          insurance("EUR 30,000 cover"),
        ],
        eligibility: [
          "Tourism, family visit, or short cultural trip.",
          "Strong ties to home country required.",
        ],
        notes: [
          "Applications via Türkiye Visa Application Centre (Gerry's / VFS) in Dhaka.",
          "e-Visa available for those holding valid Schengen / US / UK / Ireland visa or residence permit.",
        ],
      },
      student: {
        processingTime: "4–8 weeks",
        validity: "Up to 1 year (renewable)",
        stayDuration: "Course duration",
        entryType: "Single (extend to residence permit on arrival)",
        feeRange: "BDT 12,000 – 18,000",
        requirements: [
          passport(12),
          photos(),
          applicationForm,
          acceptanceLetter(),
          academicDocs,
          { ...englishProof, required: false, description: "Required if course is taught in English; Turkish proficiency may be required otherwise." },
          sponsorDocs,
          bankStatements(6),
          medicalCert,
          insurance("Mandatory student health insurance"),
        ],
        eligibility: [
          "Confirmed admission in YÖK-recognised Turkish university.",
          "Financial proof: USD 7,500/year approx.",
        ],
      },
      business: {
        processingTime: "10–15 working days",
        validity: "180 days",
        stayDuration: "Up to 30 days per entry",
        entryType: "Single / Multiple",
        feeRange: "BDT 9,500 – 18,000",
        requirements: [
          passport(),
          photos(),
          applicationForm,
          invitationLetter("Turkish company"),
          businessDocs,
          bankStatements(6),
          flightBooking,
          hotelBooking,
        ],
        eligibility: [
          "Verifiable Bangladeshi business and confirmed Turkish counterpart.",
        ],
      },
    },
  },

  // ── EAST ASIA ─────────────────────────────────────────────────────────
  {
    slug: "japan",
    name: "Japan",
    flag: "🇯🇵",
    region: "East Asia",
    image:
      "https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=1200&q=80",
    capital: "Tokyo",
    currency: "JPY (¥)",
    shortDescription:
      "Cherry blossoms, bullet trains, Mt. Fuji, sushi capitals — precision and poetry in equal measure.",
    popularFor: ["Culture", "Honeymoon", "Education", "Technology"],
    visas: {
      tourist: {
        processingTime: "5–7 working days",
        validity: "90 days from issue",
        stayDuration: "Up to 15 / 30 days",
        entryType: "Single",
        feeRange: "BDT 3,500 – 5,500",
        successRate: "Moderate (strict documentation)",
        requirements: [
          passport(),
          photos("4.5×4.5 cm photo, white background, taken within 6 months."),
          applicationForm,
          coverLetter,
          bankStatements(6),
          { ...bankSolvency, description: "Minimum BDT 3,00,000+ balance recommended per traveller." },
          incomeTax,
          employmentNOC,
          flightBooking,
          hotelBooking,
          itinerary,
        ],
        eligibility: [
          "Strong financial profile and stable employment.",
          "Detailed day-by-day itinerary required.",
          "Applications via Japan Embassy Dhaka through designated agents.",
        ],
      },
      student: {
        processingTime: "1–3 months (after CoE issued)",
        validity: "Course duration",
        stayDuration: "Course duration",
        entryType: "Multiple",
        feeRange: "BDT 3,500 – 4,500 (after CoE)",
        requirements: [
          passport(12),
          photos(),
          applicationForm,
          acceptanceLetter(
            "Certificate of Eligibility (CoE)",
            "CoE issued by Japan Immigration via the sponsoring institution before visa application.",
          ),
          academicDocs,
          {
            ...englishProof,
            required: false,
            description: "English or Japanese (JLPT N5 or higher) proficiency depending on course language.",
          },
          sponsorDocs,
          bankStatements(6),
          medicalCert,
        ],
        eligibility: [
          "Confirmed admission in MEXT-recognised institution.",
          "Sponsor must demonstrate ~JPY 1.5 million/year coverage.",
        ],
      },
      business: {
        processingTime: "5–7 working days",
        validity: "90 days",
        stayDuration: "Up to 90 days per entry",
        entryType: "Single / Multiple",
        feeRange: "BDT 5,500 – 10,000",
        requirements: [
          passport(),
          photos(),
          applicationForm,
          invitationLetter("Japanese company"),
          {
            category: "business",
            title: "Letter of Guarantee (Mibun-hosho-sho)",
            description:
              "Guarantee letter from Japanese host company confirming financial and behavioural responsibility.",
            required: true,
          },
          businessDocs,
          bankStatements(6),
          flightBooking,
          hotelBooking,
        ],
        eligibility: [
          "Verifiable Bangladeshi business and Japanese sponsor required.",
        ],
      },
    },
  },
  {
    slug: "south-korea",
    name: "South Korea",
    flag: "🇰🇷",
    region: "East Asia",
    image:
      "https://images.unsplash.com/photo-1538485399081-7c8970e21ab7?auto=format&fit=crop&w=1200&q=80",
    capital: "Seoul",
    currency: "KRW (₩)",
    shortDescription:
      "Seoul nightlife, Jeju Island, K-pop, kimchi — the cultural powerhouse of Asia.",
    popularFor: ["Culture", "Education", "Shopping", "Honeymoon"],
    visas: {
      tourist: {
        processingTime: "10–15 working days",
        validity: "90 days from issue",
        stayDuration: "Up to 30 / 90 days",
        entryType: "Single / Multiple",
        feeRange: "BDT 4,500 – 9,500",
        successRate: "Moderate",
        requirements: [
          passport(),
          photos("3.5×4.5 cm photo, white background."),
          applicationForm,
          coverLetter,
          bankStatements(6),
          { ...bankSolvency, description: "Minimum balance equivalent to USD 3,000+." },
          employmentNOC,
          flightBooking,
          hotelBooking,
          itinerary,
        ],
        eligibility: [
          "Strong financial profile and clear ties to Bangladesh.",
          "Detailed itinerary and accommodation proof.",
        ],
        notes: [
          "Apply via Korean Embassy Dhaka or KVAC visa centre.",
          "Repeat travellers to OECD countries get easier approvals.",
        ],
      },
      student: {
        processingTime: "4–8 weeks",
        validity: "Course duration",
        stayDuration: "Course duration",
        entryType: "Multiple",
        feeRange: "BDT 7,000 – 12,000",
        requirements: [
          passport(12),
          photos(),
          applicationForm,
          acceptanceLetter(
            "Standard Admission Letter + Certificate of Admission",
            "Original admission letter from Korean university approved by Ministry of Education.",
          ),
          academicDocs,
          {
            ...englishProof,
            description: "TOPIK Level 3+ for Korean-taught programmes, or IELTS/TOEFL for English programmes.",
          },
          sponsorDocs,
          bankStatements(6),
          { ...bankSolvency, description: "USD 20,000+ in sponsor / applicant account (D-2 visa requirement)." },
          medicalCert,
        ],
        eligibility: [
          "Confirmed admission to Korean university (D-2 visa).",
          "Financial proof of USD 20,000+.",
        ],
      },
      business: {
        processingTime: "10–15 working days",
        validity: "90 days",
        stayDuration: "Up to 90 days per entry",
        entryType: "Single / Multiple",
        feeRange: "BDT 6,500 – 13,000",
        requirements: [
          passport(),
          photos(),
          applicationForm,
          invitationLetter("Korean company"),
          businessDocs,
          bankStatements(6),
          flightBooking,
          hotelBooking,
        ],
        eligibility: [
          "Verifiable Bangladeshi business with confirmed Korean partner.",
        ],
      },
    },
  },
  {
    slug: "china",
    name: "China",
    flag: "🇨🇳",
    region: "East Asia",
    image:
      "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=1200&q=80",
    capital: "Beijing",
    currency: "CNY (¥)",
    shortDescription:
      "Great Wall, Forbidden City, Shanghai skyline, Guilin landscapes — 5,000 years in one trip.",
    popularFor: ["Business", "Education", "Trade", "Tourism"],
    visas: {
      tourist: {
        processingTime: "4–7 working days",
        validity: "3 / 6 months",
        stayDuration: "30 days per entry",
        entryType: "Single / Double / Multiple",
        feeRange: "BDT 8,500 – 17,000",
        successRate: "High",
        requirements: [
          passport(),
          photos("48×33 mm photo, light background, full face."),
          applicationForm,
          coverLetter,
          bankStatements(6),
          employmentNOC,
          flightBooking,
          hotelBooking,
          itinerary,
        ],
        eligibility: [
          "Tourism, family visit, or short personal trip (L visa).",
          "Strong return ties recommended.",
        ],
        notes: [
          "Apply via Chinese Visa Application Service Centre (CVASC) Dhaka.",
        ],
      },
      student: {
        processingTime: "10–15 working days (after JW202 / JW201)",
        validity: "Course duration (Residence permit on arrival)",
        stayDuration: "Course duration",
        entryType: "Single (X1) / Multiple (X2)",
        feeRange: "BDT 8,500 – 17,000",
        requirements: [
          passport(12),
          photos(),
          applicationForm,
          acceptanceLetter(
            "Admission Notice + JW202 / JW201 Form",
            "Original admission notice from Chinese institution and JW202 (for courses > 6 months) or JW201 (CSC-funded) form.",
          ),
          academicDocs,
          {
            ...englishProof,
            required: false,
            description: "HSK Level 3+ for Chinese-taught programmes, or IELTS/TOEFL for English programmes.",
          },
          sponsorDocs,
          medicalCert,
          policeClearance,
        ],
        eligibility: [
          "Confirmed admission in Chinese Ministry of Education recognised institution.",
        ],
      },
      business: {
        processingTime: "4–7 working days",
        validity: "3 / 6 / 12 months",
        stayDuration: "30 / 60 / 90 days per entry",
        entryType: "Single / Multiple",
        feeRange: "BDT 12,000 – 25,000",
        requirements: [
          passport(),
          photos(),
          applicationForm,
          {
            ...invitationLetter("Chinese host company"),
            description:
              "Invitation Letter from Chinese host OR Invitation Confirmation Letter issued by authorised Chinese authority — including duration and purpose.",
          },
          businessDocs,
          bankStatements(6),
          flightBooking,
          hotelBooking,
        ],
        eligibility: [
          "Genuine M visa purpose: trade, contract, exhibition, factory visit.",
        ],
      },
    },
  },

  // ── EUROPE ────────────────────────────────────────────────────────────
  {
    slug: "united-kingdom",
    name: "United Kingdom",
    flag: "🇬🇧",
    region: "Europe",
    image:
      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&q=80",
    capital: "London",
    currency: "GBP (£)",
    shortDescription:
      "Big Ben, Edinburgh castles, Lake District — and world-leading universities.",
    popularFor: ["Education", "Business", "Family Visit", "Medical"],
    visas: {
      tourist: {
        processingTime: "3 weeks standard (5 working days priority)",
        validity: "6 months / 2 / 5 / 10 years (Multiple entry)",
        stayDuration: "Up to 6 months per visit",
        entryType: "Multiple",
        feeRange: "BDT 14,000 – 1,30,000 (depending on duration)",
        successRate: "Moderate (depends on profile)",
        requirements: [
          passport(),
          photos("Digital photo uploaded during online application (45×35 mm specs)."),
          applicationForm,
          coverLetter,
          bankStatements(6),
          {
            ...bankSolvency,
            description:
              "Sufficient balance to cover entire trip; UKVI looks at last 6 months activity and source of funds.",
          },
          incomeTax,
          salarySlips,
          employmentNOC,
          businessDocs,
          flightBooking,
          hotelBooking,
          itinerary,
        ],
        eligibility: [
          "Genuine visitor with strong economic, family, and social ties to Bangladesh.",
          "Demonstrated source of funds, not just balance.",
        ],
        notes: [
          "Apply at gov.uk/standard-visitor and submit biometrics at VFS UK in Dhaka.",
          "Refusal risk is highest for first-time travellers — strong supporting docs essential.",
        ],
      },
      student: {
        processingTime: "3 weeks standard",
        validity: "Course duration + 4 months",
        stayDuration: "Course duration",
        entryType: "Multiple",
        feeRange: "BDT 60,000+ (visa fee + IHS)",
        requirements: [
          passport(12),
          photos(),
          applicationForm,
          acceptanceLetter(
            "CAS Letter (Confirmation of Acceptance for Studies)",
            "Unconditional CAS issued by a UK Tier 4 licensed sponsor (university), valid within 6 months of application.",
          ),
          academicDocs,
          englishProof,
          sponsorDocs,
          bankStatements(),
          {
            ...bankSolvency,
            description:
              "Funds for tuition + £1,334/month (London) or £1,023/month (outside London) for up to 9 months — held for 28 consecutive days.",
          },
          {
            category: "medical",
            title: "Tuberculosis (TB) Test",
            description:
              "TB test certificate from IOM-approved clinic in Bangladesh (e.g., IOM Dhaka).",
            required: true,
          },
          {
            category: "other",
            title: "IHS (Immigration Health Surcharge) Payment",
            description:
              "£776/year IHS payment confirmation receipt — pre-paid during online application.",
            required: true,
          },
        ],
        eligibility: [
          "Genuine student with valid CAS from licensed UK sponsor.",
          "Meets English proficiency at CEFR B2 (typically IELTS 6.0–6.5+).",
          "Maintained financial requirement for 28 consecutive days.",
        ],
      },
      business: {
        processingTime: "3 weeks standard",
        validity: "6 months / 2 / 5 / 10 years",
        stayDuration: "Up to 6 months per visit",
        entryType: "Multiple",
        feeRange: "BDT 14,000 – 1,30,000",
        requirements: [
          passport(),
          photos(),
          applicationForm,
          invitationLetter("UK business partner / company"),
          businessDocs,
          bankStatements(6),
          incomeTax,
          flightBooking,
          hotelBooking,
        ],
        eligibility: [
          "Permitted activities only: meetings, negotiations, conferences, training (not paid work).",
        ],
      },
    },
  },
  {
    slug: "germany",
    name: "Germany",
    flag: "🇩🇪",
    region: "Europe",
    image:
      "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1200&q=80",
    capital: "Berlin",
    currency: "EUR (€)",
    shortDescription:
      "Berlin's history, Munich's beer halls, Bavarian Alps — Europe's largest economy and top study destination.",
    popularFor: ["Education", "Business", "Tourism", "Engineering Jobs"],
    visas: {
      tourist: {
        processingTime: "15 working days (Schengen)",
        validity: "Up to 90 days within 180-day period",
        stayDuration: "Maximum 90 days",
        entryType: "Single / Multiple",
        feeRange: "BDT 12,000 – 15,000 (€90)",
        successRate: "Moderate",
        requirements: [
          passport(),
          photos("Two recent 35×45 mm biometric photos, white background."),
          applicationForm,
          coverLetter,
          bankStatements(6),
          {
            ...bankSolvency,
            description:
              "Approximately €45/day of stay (~BDT 5,500/day) plus accommodation and travel costs.",
          },
          employmentNOC,
          incomeTax,
          flightBooking,
          hotelBooking,
          itinerary,
          insurance("Schengen-compliant: minimum €30,000 medical cover"),
        ],
        eligibility: [
          "Genuine Schengen visitor — tourism, family visit, or short cultural trip.",
          "Strong ties to home country (employment, property, family).",
        ],
        notes: [
          "Apply at VFS Global Germany visa centre in Dhaka.",
          "Appointment slots can be limited — book 4–8 weeks in advance.",
        ],
      },
      student: {
        processingTime: "6–12 weeks",
        validity: "3–6 months (convert to Residence Permit on arrival)",
        stayDuration: "Course duration",
        entryType: "Multiple",
        feeRange: "BDT 9,500 (€75)",
        requirements: [
          passport(12),
          photos(),
          applicationForm,
          acceptanceLetter(
            "Admission Letter (Zulassungsbescheid)",
            "Original admission letter from a recognised German university confirming full admission.",
          ),
          academicDocs,
          englishProof,
          {
            category: "academic",
            title: "German Language Proficiency",
            description:
              "TestDaF / DSH / Goethe certificate (typically B1–B2) for German-taught programmes.",
            required: false,
          },
          sponsorDocs,
          {
            category: "financial",
            title: "Blocked Account (Sperrkonto)",
            description:
              "Blocked account with minimum €11,904 (current requirement) deposited via approved providers (Fintiba / Expatrio).",
            required: true,
          },
          medicalCert,
          insurance("Mandatory German health insurance (TK / Mawista student plan)"),
        ],
        eligibility: [
          "Confirmed admission to recognised German higher education institution.",
          "Proof of funds via Blocked Account (Sperrkonto).",
        ],
      },
      business: {
        processingTime: "10–15 working days",
        validity: "Up to 90 days within 180 days",
        stayDuration: "Up to 90 days",
        entryType: "Single / Multiple",
        feeRange: "BDT 12,000 (€90)",
        requirements: [
          passport(),
          photos(),
          applicationForm,
          invitationLetter("German business partner / inviting company"),
          businessDocs,
          bankStatements(6),
          flightBooking,
          hotelBooking,
          insurance("€30,000 Schengen medical cover"),
        ],
        eligibility: [
          "Permitted activities: meetings, contract signing, training, conferences.",
        ],
      },
    },
  },
  {
    slug: "france",
    name: "France",
    flag: "🇫🇷",
    region: "Europe",
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80",
    capital: "Paris",
    currency: "EUR (€)",
    shortDescription:
      "Eiffel Tower, French Riviera, Loire Valley wines — the most-visited country on Earth.",
    popularFor: ["Honeymoon", "Culture", "Luxury", "Education"],
    visas: {
      tourist: {
        processingTime: "10–15 working days (Schengen)",
        validity: "Up to 90 days within 180 days",
        stayDuration: "Maximum 90 days",
        entryType: "Single / Multiple",
        feeRange: "BDT 12,000 – 15,000 (€90)",
        successRate: "Moderate",
        requirements: [
          passport(),
          photos("35×45 mm biometric photo, white background."),
          applicationForm,
          coverLetter,
          bankStatements(6),
          {
            ...bankSolvency,
            description: "Approximately €65/day of stay (with prepaid hotel) or €120/day without.",
          },
          employmentNOC,
          flightBooking,
          hotelBooking,
          itinerary,
          insurance("Schengen-compliant: minimum €30,000 medical cover"),
        ],
        eligibility: [
          "Genuine tourist intent with confirmed travel plan.",
          "Sufficient funds and proof of return.",
        ],
        notes: [
          "Apply through VFS Global France in Dhaka.",
          "Visa-on-arrival not available; Schengen rules apply.",
        ],
      },
      student: {
        processingTime: "2–4 weeks (after Campus France approval)",
        validity: "3 months (then OFII residence permit)",
        stayDuration: "Course duration",
        entryType: "Multiple",
        feeRange: "BDT 13,000 (€99)",
        requirements: [
          passport(12),
          photos(),
          applicationForm,
          {
            category: "academic",
            title: "Campus France Approval (Études en France)",
            description:
              "Mandatory clearance via Campus France Bangladesh portal before visa application.",
            required: true,
          },
          acceptanceLetter(),
          academicDocs,
          englishProof,
          {
            category: "academic",
            title: "French Language Proficiency",
            description:
              "DELF / DALF / TCF certificate (B1+) for French-taught programmes.",
            required: false,
          },
          sponsorDocs,
          {
            category: "financial",
            title: "Proof of Funds",
            description: "Minimum €615/month (~€7,380/year) for living expenses.",
            required: true,
          },
          medicalCert,
        ],
        eligibility: [
          "Campus France approval mandatory for higher education applicants.",
          "Confirmed admission to French institution.",
        ],
      },
      business: {
        processingTime: "10–15 working days",
        validity: "Up to 90 days within 180 days",
        stayDuration: "Up to 90 days",
        entryType: "Single / Multiple",
        feeRange: "BDT 12,000 (€90)",
        requirements: [
          passport(),
          photos(),
          applicationForm,
          invitationLetter("French company"),
          businessDocs,
          bankStatements(6),
          flightBooking,
          hotelBooking,
          insurance("Schengen-compliant cover"),
        ],
        eligibility: [
          "Meetings, conferences, trade — no paid employment permitted.",
        ],
      },
    },
  },
  {
    slug: "italy",
    name: "Italy",
    flag: "🇮🇹",
    region: "Europe",
    image:
      "https://images.unsplash.com/photo-1525874684015-58379d421a52?auto=format&fit=crop&w=1200&q=80",
    capital: "Rome",
    currency: "EUR (€)",
    shortDescription:
      "Rome's ruins, Venice canals, Amalfi coast, Tuscany vineyards — la dolce vita.",
    popularFor: ["Honeymoon", "Culture", "Food", "Luxury"],
    visas: {
      tourist: {
        processingTime: "15 working days (Schengen)",
        validity: "Up to 90 days within 180-day period",
        stayDuration: "Maximum 90 days",
        entryType: "Single / Multiple",
        feeRange: "BDT 12,000 – 15,000 (€90)",
        successRate: "Moderate",
        requirements: [
          passport(),
          photos("35×45 mm biometric photo, white background."),
          applicationForm,
          coverLetter,
          bankStatements(6),
          {
            ...bankSolvency,
            description: "Approximately €45/day for groups, €30/day for individuals + proof of accommodation.",
          },
          employmentNOC,
          flightBooking,
          hotelBooking,
          itinerary,
          insurance("Schengen-compliant: €30,000 medical cover"),
        ],
        eligibility: [
          "Genuine tourist intent and confirmed return ticket.",
        ],
        notes: [
          "Apply via VFS Global Italy in Dhaka.",
          "Schengen rules apply for all member states (90/180 rule).",
        ],
      },
      student: {
        processingTime: "1–3 months",
        validity: "Course duration",
        stayDuration: "Course duration",
        entryType: "Multiple",
        feeRange: "BDT 6,500 (€50)",
        requirements: [
          passport(12),
          photos(),
          applicationForm,
          acceptanceLetter(
            "Letter of Acceptance from Italian University",
            "Original admission letter / pre-enrolment confirmation (via Universitaly portal).",
          ),
          academicDocs,
          englishProof,
          {
            category: "academic",
            title: "Italian Language Proficiency",
            description: "CILS / CELI / PLIDA (B1–B2) for Italian-taught programmes.",
            required: false,
          },
          sponsorDocs,
          {
            category: "financial",
            title: "Proof of Funds",
            description: "Minimum €6,000+/year for living expenses (DSU / NoBel statement preferred).",
            required: true,
          },
          insurance("Mandatory Italian health insurance"),
        ],
        eligibility: [
          "Pre-enrolment via Universitaly + acceptance from Italian institution.",
        ],
      },
      business: {
        processingTime: "15 working days",
        validity: "Up to 90 days within 180 days",
        stayDuration: "Up to 90 days",
        entryType: "Single / Multiple",
        feeRange: "BDT 12,000 (€90)",
        requirements: [
          passport(),
          photos(),
          applicationForm,
          invitationLetter("Italian company"),
          businessDocs,
          bankStatements(6),
          flightBooking,
          hotelBooking,
          insurance("Schengen-compliant cover"),
        ],
        eligibility: [
          "Permitted activities only: meetings, training, trade fairs.",
        ],
      },
    },
  },
  {
    slug: "netherlands",
    name: "Netherlands",
    flag: "🇳🇱",
    region: "Europe",
    image:
      "https://images.unsplash.com/photo-1534351590666-13e3e96c5017?auto=format&fit=crop&w=1200&q=80",
    capital: "Amsterdam",
    currency: "EUR (€)",
    shortDescription:
      "Amsterdam canals, tulip fields, Van Gogh, world-class English-taught universities.",
    popularFor: ["Education", "Tourism", "Tech Jobs", "Business"],
    visas: {
      tourist: {
        processingTime: "15 working days (Schengen)",
        validity: "Up to 90 days within 180 days",
        stayDuration: "Maximum 90 days",
        entryType: "Single / Multiple",
        feeRange: "BDT 12,000 – 15,000 (€90)",
        successRate: "Moderate to High",
        requirements: [
          passport(),
          photos("35×45 mm biometric photo, white background."),
          applicationForm,
          coverLetter,
          bankStatements(6),
          {
            ...bankSolvency,
            description: "Minimum €55/day of stay + accommodation.",
          },
          employmentNOC,
          flightBooking,
          hotelBooking,
          itinerary,
          insurance("Schengen-compliant: €30,000 medical cover"),
        ],
        eligibility: [
          "Genuine tourist intent, confirmed return.",
        ],
        notes: [
          "Apply via VFS Global Netherlands in Dhaka.",
        ],
      },
      student: {
        processingTime: "2–4 weeks (after Nuffic NESO clearance)",
        validity: "Course duration",
        stayDuration: "Course duration",
        entryType: "Multiple",
        feeRange: "BDT 25,000 (€207 — MVV + residence)",
        requirements: [
          passport(12),
          photos(),
          applicationForm,
          acceptanceLetter(
            "Admission Letter + Nuffic / NUFFIC NESO clearance",
            "Admission letter from Dutch institution; institution applies for MVV + residence permit on student's behalf via IND.",
          ),
          academicDocs,
          englishProof,
          sponsorDocs,
          {
            category: "financial",
            title: "Proof of Funds",
            description: "Minimum €13,500+/year (~€1,125/month) deposited as institution-mediated proof.",
            required: true,
          },
          medicalCert,
          insurance("Dutch health insurance mandatory"),
        ],
        eligibility: [
          "Confirmed admission to Dutch recognised institution.",
          "Institution acts as visa sponsor (MVV/VVR combined).",
        ],
      },
      business: {
        processingTime: "15 working days",
        validity: "Up to 90 days within 180 days",
        stayDuration: "Up to 90 days",
        entryType: "Single / Multiple",
        feeRange: "BDT 12,000 (€90)",
        requirements: [
          passport(),
          photos(),
          applicationForm,
          invitationLetter("Dutch company"),
          businessDocs,
          bankStatements(6),
          flightBooking,
          hotelBooking,
          insurance("Schengen-compliant cover"),
        ],
        eligibility: [
          "Meetings, conferences, training only — no paid employment.",
        ],
      },
    },
  },

  // ── NORTH AMERICA ─────────────────────────────────────────────────────
  {
    slug: "usa",
    name: "United States of America",
    flag: "🇺🇸",
    region: "North America",
    image:
      "https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?auto=format&fit=crop&w=1200&q=80",
    capital: "Washington, D.C.",
    currency: "USD ($)",
    shortDescription:
      "New York, California beaches, Grand Canyon, Disney — and the world's top universities.",
    popularFor: ["Education", "Business", "Family Visit", "Tourism"],
    visas: {
      tourist: {
        processingTime: "Interview wait + 5–10 days (visa wait varies — currently months)",
        validity: "10 years (Multiple entry) typical",
        stayDuration: "Up to 6 months per visit (CBP discretion)",
        entryType: "Multiple",
        feeRange: "USD 185 (~BDT 22,000) MRV fee",
        successRate: "Moderate (depends on profile / interview)",
        requirements: [
          passport(),
          photos("5×5 cm (2×2 inch), white background, taken within 6 months. Uploaded with DS-160."),
          {
            category: "document",
            title: "DS-160 Confirmation Page",
            description: "Online non-immigrant visa application (DS-160) — barcoded confirmation printed.",
            required: true,
          },
          {
            category: "document",
            title: "MRV Fee Receipt + Interview Appointment Letter",
            description: "USD 185 fee paid via designated bank; interview booked at US Embassy Dhaka.",
            required: true,
          },
          coverLetter,
          bankStatements(6),
          incomeTax,
          salarySlips,
          employmentNOC,
          businessDocs,
          {
            category: "document",
            title: "Strong Ties Documentation",
            description: "Property deeds, family ties, business ownership, return airline tickets — anything proving intent to return.",
            required: true,
          },
        ],
        eligibility: [
          "B1/B2 visitor visa — tourism, family visit, short business meetings, medical treatment.",
          "Demonstrate strong economic, social and family ties to Bangladesh (Section 214(b) burden).",
          "Successful in-person interview at US Embassy Dhaka.",
        ],
        notes: [
          "Interview wait times currently long (often 6+ months) — book early via ustraveldocs.com/bd.",
          "Refusal under 214(b) is common for first-time / weak-profile applicants.",
        ],
      },
      student: {
        processingTime: "Interview wait + 5–10 days for issuance",
        validity: "Duration of programme (D/S — Duration of Status)",
        stayDuration: "Course duration",
        entryType: "Multiple",
        feeRange: "USD 185 MRV + USD 350 SEVIS I-901 (~BDT 65,000+)",
        requirements: [
          passport(12),
          photos(),
          {
            category: "document",
            title: "DS-160 Confirmation Page",
            description: "Online non-immigrant visa application form (DS-160).",
            required: true,
          },
          acceptanceLetter(
            "Form I-20 from SEVP-approved institution",
            "Original I-20 signed by you and the institution's Designated School Official (DSO).",
          ),
          {
            category: "academic",
            title: "SEVIS Fee Receipt (I-901)",
            description: "USD 350 SEVIS I-901 fee payment receipt.",
            required: true,
          },
          academicDocs,
          englishProof,
          sponsorDocs,
          bankStatements(),
          {
            category: "financial",
            title: "Proof of Funds (Full I-20 amount)",
            description: "Liquid funds covering at least one year of tuition + living expenses (USD 30,000–80,000 typical).",
            required: true,
          },
          sop,
        ],
        eligibility: [
          "Admission and I-20 from SEVP-approved US institution.",
          "Sufficient funds for first year + clear plan for subsequent years.",
          "Demonstrate non-immigrant intent at interview.",
        ],
      },
      business: {
        processingTime: "Interview wait + 5–10 days",
        validity: "Up to 10 years (Multiple entry)",
        stayDuration: "Up to 6 months per visit (CBP discretion)",
        entryType: "Multiple",
        feeRange: "USD 185 MRV fee",
        requirements: [
          passport(),
          photos(),
          {
            category: "document",
            title: "DS-160 Confirmation Page",
            description: "Completed DS-160 online form.",
            required: true,
          },
          coverLetter,
          invitationLetter("US-based company or business partner"),
          businessDocs,
          bankStatements(6),
          incomeTax,
          conferenceLetter,
          flightBooking,
        ],
        eligibility: [
          "B-1 visa permits: meetings, negotiations, conferences, training — no productive work / salary.",
        ],
      },
    },
  },
  {
    slug: "canada",
    name: "Canada",
    flag: "🇨🇦",
    region: "North America",
    image:
      "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&w=1200&q=80",
    capital: "Ottawa",
    currency: "CAD (C$)",
    shortDescription:
      "Niagara Falls, Banff Rockies, multicultural cities, and the most welcoming study destination.",
    popularFor: ["Education", "Immigration Pathway", "Tourism", "Business"],
    visas: {
      tourist: {
        processingTime: "4–8 weeks (visitor visa)",
        validity: "Up to 10 years (Multiple entry)",
        stayDuration: "Up to 6 months per visit",
        entryType: "Multiple",
        feeRange: "CAD 100 + biometrics CAD 85 (~BDT 17,000)",
        successRate: "Moderate to High (depends on profile)",
        requirements: [
          passport(),
          photos("35×45 mm photo, white background, head 31–36 mm tall."),
          applicationForm,
          coverLetter,
          bankStatements(6),
          incomeTax,
          employmentNOC,
          businessDocs,
          flightBooking,
          hotelBooking,
          itinerary,
        ],
        eligibility: [
          "Genuine visitor with strong ties to Bangladesh.",
          "Sufficient funds for the trip.",
          "Clear travel history (Schengen / US / UK visas significantly help).",
        ],
        notes: [
          "Apply online at IRCC portal; biometrics at VFS Canada Dhaka.",
          "Many applications denied for weak ties or insufficient travel history.",
        ],
      },
      student: {
        processingTime: "8–16 weeks (Study Permit)",
        validity: "Course duration + 90 days",
        stayDuration: "Course duration",
        entryType: "Multiple",
        feeRange: "CAD 150 study permit + CAD 85 biometrics (~BDT 20,000)",
        requirements: [
          passport(12),
          photos(),
          applicationForm,
          acceptanceLetter(
            "LOA from DLI (Designated Learning Institution)",
            "Letter of Acceptance from a Canadian Designated Learning Institution.",
          ),
          academicDocs,
          englishProof,
          sop,
          sponsorDocs,
          bankStatements(),
          {
            category: "financial",
            title: "GIC (Guaranteed Investment Certificate)",
            description:
              "CAD 20,635 GIC purchased from approved Canadian bank (Scotiabank, ICICI, CIBC etc.) — covers first year living costs.",
            required: true,
          },
          {
            category: "financial",
            title: "Tuition Fee Payment Proof",
            description: "Receipt of first year tuition paid to institution.",
            required: true,
          },
          medicalCert,
          policeClearance,
        ],
        eligibility: [
          "SDS (Student Direct Stream) preferred — faster processing if eligible.",
          "GIC + first year tuition + IELTS 6.0+ overall (or equivalent).",
        ],
      },
      business: {
        processingTime: "4–8 weeks",
        validity: "Up to 10 years",
        stayDuration: "Up to 6 months per visit",
        entryType: "Multiple",
        feeRange: "CAD 100 + biometrics",
        requirements: [
          passport(),
          photos(),
          applicationForm,
          invitationLetter("Canadian business partner / company"),
          businessDocs,
          bankStatements(6),
          flightBooking,
          hotelBooking,
        ],
        eligibility: [
          "Meetings, conferences, trade — no employment.",
        ],
      },
    },
  },

  // ── OCEANIA ───────────────────────────────────────────────────────────
  {
    slug: "australia",
    name: "Australia",
    flag: "🇦🇺",
    region: "Oceania",
    image:
      "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=1200&q=80",
    capital: "Canberra",
    currency: "AUD (A$)",
    shortDescription:
      "Sydney Opera House, Great Barrier Reef, Outback adventures, and world-class universities.",
    popularFor: ["Education", "Immigration Pathway", "Tourism", "Skilled Migration"],
    visas: {
      tourist: {
        processingTime: "2–4 weeks (eVisitor / Visitor visa 600)",
        validity: "1 year (Multiple entry)",
        stayDuration: "Up to 3 months per visit",
        entryType: "Multiple",
        feeRange: "AUD 190 (~BDT 14,000)",
        successRate: "Moderate to High",
        requirements: [
          passport(),
          photos("Recent digital photo for upload."),
          applicationForm,
          coverLetter,
          bankStatements(6),
          employmentNOC,
          incomeTax,
          businessDocs,
          flightBooking,
          hotelBooking,
          itinerary,
          {
            category: "medical",
            title: "Health Examination",
            description: "May be required depending on health declaration and length of stay.",
            required: false,
          },
        ],
        eligibility: [
          "Subclass 600 Visitor visa: tourism, family, or business stream.",
          "Strong ties to home country, genuine temporary intent.",
        ],
        notes: [
          "Apply online via ImmiAccount.",
          "Document checklist depends on assessment level (currently Level 2 for Bangladesh).",
        ],
      },
      student: {
        processingTime: "4–8 weeks (Subclass 500)",
        validity: "Course duration + 1–4 months",
        stayDuration: "Course duration",
        entryType: "Multiple",
        feeRange: "AUD 1,600 (~BDT 1,15,000)",
        requirements: [
          passport(12),
          photos(),
          applicationForm,
          acceptanceLetter(
            "Confirmation of Enrolment (CoE)",
            "Electronic CoE issued by CRICOS-registered Australian institution after tuition deposit.",
          ),
          academicDocs,
          englishProof,
          {
            category: "academic",
            title: "Genuine Student (GS) Statement",
            description:
              "Statement (replacing former GTE) explaining academic intent, course choice and post-study plans.",
            required: true,
          },
          sponsorDocs,
          bankStatements(),
          {
            category: "financial",
            title: "Proof of Funds",
            description:
              "Funds covering AUD 29,710/year living costs + tuition + travel, demonstrated for 3+ months.",
            required: true,
          },
          {
            category: "medical",
            title: "Health Examination (BUPA / IOM)",
            description: "Medical examination at panel physician (IOM Dhaka). HAP ID required.",
            required: true,
          },
          {
            category: "medical",
            title: "OSHC (Overseas Student Health Cover)",
            description: "Mandatory OSHC insurance for entire course duration.",
            required: true,
          },
          policeClearance,
        ],
        eligibility: [
          "CRICOS-registered course + CoE.",
          "Meet Genuine Student requirement and financial capacity.",
          "IELTS 6.0+ (or equivalent) for most degrees.",
        ],
      },
      business: {
        processingTime: "2–6 weeks",
        validity: "Up to 3 years (Multiple entry for Business stream)",
        stayDuration: "Up to 3 months per visit",
        entryType: "Multiple",
        feeRange: "AUD 190 – 1,000+",
        requirements: [
          passport(),
          photos(),
          applicationForm,
          invitationLetter("Australian business partner"),
          businessDocs,
          bankStatements(6),
          flightBooking,
          hotelBooking,
        ],
        eligibility: [
          "Subclass 600 — Business Visitor stream.",
          "Meetings, negotiations, conferences — no productive work.",
        ],
      },
    },
  },
  {
    slug: "new-zealand",
    name: "New Zealand",
    flag: "🇳🇿",
    region: "Oceania",
    image:
      "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?auto=format&fit=crop&w=1200&q=80",
    capital: "Wellington",
    currency: "NZD (NZ$)",
    shortDescription:
      "Milford Sound fjords, Queenstown adventures, Hobbiton — the world's most cinematic country.",
    popularFor: ["Education", "Adventure", "Honeymoon", "Skilled Migration"],
    visas: {
      tourist: {
        processingTime: "3–6 weeks",
        validity: "Up to 9 months (Multiple entry possible)",
        stayDuration: "Up to 9 months",
        entryType: "Single / Multiple",
        feeRange: "NZD 341 + IVL NZD 100 (~BDT 32,000)",
        successRate: "Moderate to High",
        requirements: [
          passport(),
          photos("35×45 mm photo, neutral background."),
          applicationForm,
          coverLetter,
          bankStatements(6),
          employmentNOC,
          incomeTax,
          flightBooking,
          hotelBooking,
          itinerary,
        ],
        eligibility: [
          "Genuine visitor — tourism, family visit, or short business.",
          "Sufficient funds: NZD 1,000/month or NZD 400/month if accommodation pre-paid.",
        ],
        notes: [
          "Apply online via Immigration New Zealand portal.",
          "Visa-free entry not available for Bangladeshi passports.",
        ],
      },
      student: {
        processingTime: "6–10 weeks",
        validity: "Course duration",
        stayDuration: "Course duration",
        entryType: "Multiple",
        feeRange: "NZD 750 (~BDT 53,000)",
        requirements: [
          passport(12),
          photos(),
          applicationForm,
          acceptanceLetter(
            "Offer of Place Letter",
            "Letter from NZ Qualifications Authority (NZQA) approved institution confirming admission.",
          ),
          academicDocs,
          englishProof,
          sop,
          sponsorDocs,
          bankStatements(),
          {
            category: "financial",
            title: "Proof of Funds",
            description:
              "Minimum NZD 20,000/year for living costs + tuition + return airfare.",
            required: true,
          },
          medicalCert,
          policeClearance,
        ],
        eligibility: [
          "Admission to NZQA-approved education provider.",
          "Genuine intent and financial capacity.",
        ],
      },
      business: {
        processingTime: "3–6 weeks",
        validity: "Up to 1 year",
        stayDuration: "Up to 3 months",
        entryType: "Single / Multiple",
        feeRange: "NZD 341 + IVL",
        requirements: [
          passport(),
          photos(),
          applicationForm,
          invitationLetter("New Zealand business partner"),
          businessDocs,
          bankStatements(6),
          flightBooking,
          hotelBooking,
        ],
        eligibility: [
          "Business Visitor visa — meetings, conferences, training only.",
        ],
      },
    },
  },
];

// ──────────────────────────────────────────────────────────────────────────
// Helpers
// ──────────────────────────────────────────────────────────────────────────

export const REQ_CATEGORY_META: Record<
  VisaRequirement["category"],
  { label: string; color: string }
> = {
  document: { label: "Document", color: "bg-sky-100 text-sky-700 ring-sky-200" },
  financial: { label: "Financial", color: "bg-emerald-100 text-emerald-700 ring-emerald-200" },
  photo: { label: "Photo", color: "bg-violet-100 text-violet-700 ring-violet-200" },
  travel: { label: "Travel", color: "bg-amber-100 text-amber-700 ring-amber-200" },
  medical: { label: "Medical", color: "bg-rose-100 text-rose-700 ring-rose-200" },
  academic: { label: "Academic", color: "bg-indigo-100 text-indigo-700 ring-indigo-200" },
  business: { label: "Business", color: "bg-navy-100 text-navy-800 ring-navy-200" },
  other: { label: "Other", color: "bg-slate-100 text-slate-700 ring-slate-200" },
};

export function getCountriesForVisaType(type: VisaType): Country[] {
  return countries.filter((c) => c.visas[type]);
}

export function getCountry(slug: string): Country | undefined {
  return countries.find((c) => c.slug === slug);
}

export const VISA_TYPES: VisaType[] = ["student", "tourist", "business"];

export function isValidVisaType(s: string): s is VisaType {
  return (VISA_TYPES as string[]).includes(s);
}
