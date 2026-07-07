import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import JsonLd from "@/components/JsonLd";
import { site } from "@/lib/site";
import "./globals.css";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Car Servicing & Repair in Tutong, Brunei`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "car workshop Tutong",
    "car repair Brunei",
    "car servicing Brunei",
    "engine repair Tutong",
    "fleet maintenance Brunei",
    "brake service Tutong",
  ],
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} — Car Servicing & Repair in Tutong, Brunei`,
    description: site.description,
    url: site.url,
    images: [{ url: "/images/hero/hero-1.jpg", width: 1200, height: 630, alt: `${site.name} workshop` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Car Servicing & Repair in Tutong, Brunei`,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${manrope.variable} ${inter.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-bold"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
        <WhatsAppFloat />
        <JsonLd />
      </body>
    </html>
  );
}
