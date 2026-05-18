import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { WhatsAppButton } from "@/components/whatsapp-button";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://sky-visalink.vercel.app";
const SITE_TITLE = "SKY VISALink — Your Gateway to the World";
const SITE_DESC =
  "Premium visa processing, global tour packages, air ticketing, and hotel reservations. Trusted by travellers worldwide.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_TITLE, template: "%s · SKY VISALink" },
  description: SITE_DESC,
  keywords: [
    "SKY VISALink",
    "visa processing Bangladesh",
    "tour packages",
    "air ticketing",
    "Bangladesh travel agency",
    "tourist visa Bangladesh",
    "student visa Bangladesh",
    "work permit visa",
    "ভিসা প্রসেসিং",
  ],
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "SKY VISALink",
    title: SITE_TITLE,
    description:
      "Seamless visa processing, flight ticketing & unforgettable tour packages.",
    locale: "en_US",
    alternateLocale: ["bn_BD"],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description:
      "Seamless visa processing, flight ticketing & unforgettable tour packages.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "travel",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
