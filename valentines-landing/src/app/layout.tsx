import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "ComfortValley | Valentine's Gift Shop",
    template: "%s | ComfortValley",
  },
  description: "Find the perfect Valentine's gifts for your loved ones or treat yourself. Shop our curated collection of comfort essentials with Couple & Single modes.",
  keywords: ["Valentine's Day", "Gift Shop", "ComfortValley", "Couple Gifts", "Self Care", "Comfort Gifts"],
  authors: [{ name: "ComfortValley" }],
  creator: "ComfortValley",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://comfortvalley.com",
    title: "ComfortValley | Valentine's Gift Shop",
    description: "Gift Comfort to your loved ones or Be Your Own Bae. Shop comfort essentials for Valentine's Day.",
    siteName: "ComfortValley",
  },
  twitter: {
    card: "summary_large_image",
    title: "ComfortValley | Valentine's Gift Shop",
    description: "Gift Comfort or Be Your Own Bae. Shop comfort essentials.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
