import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { siteTitle } from "@/lib/seo";
import { profile, siteUrl } from "@content/profile";

import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: `%s · ${profile.name}`,
  },
  description: profile.shortBio,
  applicationName: siteTitle,
  authors: [{ name: profile.name }],
  creator: profile.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: siteTitle,
    title: siteTitle,
    description: profile.shortBio,
    url: siteUrl,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: profile.shortBio,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#2a2e42",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className="bg-bg text-fg antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:rounded-pill focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-accent-ink"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
