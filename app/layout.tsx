import type { Metadata, Viewport } from "next";
import { Boldonse, Inter, Manrope } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SITE } from "@/lib/site";
import { StickyCta } from "@/components/layout/StickyCta";
import Script from "next/script";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const boldonse = Boldonse({
  variable: "--font-boldonse",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "E-Queue | Know your turn. Own your time.",
    template: "%s | E-Queue",
  },
  description:
    "E-Queue is the digital queue and appointment system for clinics, dermatologists and salons in Pakistan. Patients wait anywhere and arrive just in time.",
  openGraph: {
    title: "E-Queue | Know your turn. Own your time.",
    description:
      "Digital queue and appointments for clinics and service businesses. Less waiting. More productive time.",
    siteName: "E-Queue",
    type: "website",
    locale: "en_PK",
  },
};

export const viewport: Viewport = {
  themeColor: "#49335D",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${inter.variable} ${boldonse.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-aubergine focus:px-4 focus:py-3 focus:text-white"
        >
          Skip to content
        </a>
        <Header />
        {process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN ? <Script defer data-domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN} src="https://plausible.io/js/script.js" strategy="afterInteractive" /> : null}
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <StickyCta />
      </body>
    </html>
  );
}
