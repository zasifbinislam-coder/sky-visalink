import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

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

export const metadata: Metadata = {
  title: "SKY VISALink — Your Gateway to the World",
  description:
    "Premium visa processing, global tour packages, air ticketing, and hotel reservations. Trusted by travellers worldwide.",
  keywords: [
    "SKY VISALink",
    "visa processing",
    "tour packages",
    "air ticketing",
    "Bangladesh travel agency",
    "tourist visa",
    "student visa",
  ],
  openGraph: {
    title: "SKY VISALink — Your Gateway to the World",
    description:
      "Seamless visa processing, flight ticketing & unforgettable tour packages.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
