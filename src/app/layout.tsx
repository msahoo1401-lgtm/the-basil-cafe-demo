import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { CafeStateProvider } from "@/context/CafeStateContext";
import PageLoader from "@/components/layout/PageLoader";

const fraunces = Fraunces({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Basil Cafe & Restro | Pure Veg Cafe in Kalinganagar, Bhubaneswar",
  description:
    "100% pure vegetarian botanical cafe in Ghatikia, Kalinganagar, Bhubaneswar. Wood-fired pizzas, slow-simmered pastas, specialty coffee, board games, and weekend art workshops.",
  robots: "noindex, nofollow",
  icons: {
    icon: "/brand_icon.png",
    shortcut: "/brand_icon.png",
    apple: "/brand_icon.png",
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
      className={`${fraunces.variable} ${plusJakartaSans.variable}`}
    >
      <body className="min-h-screen bg-[#F6F3EC] text-[#222623] font-sans antialiased selection:bg-[#1B3B2B]/15 selection:text-[#1B3B2B]">
        <CafeStateProvider>
          <PageLoader />
          {children}
        </CafeStateProvider>
      </body>
    </html>
  );
}
