import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/ui/ThemeProvider";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "OHealth — Oman Health Intelligence Platform | منصة عمان للذكاء الصحي",
  description:
    "AI-powered health intelligence platform for Oman. Built on open government data (OMHLTH2016, OMPOP2016) from NCSI. Explore hospital capacity, health equity, disease trends, and population indicators across all 11 governorates.",
  keywords: ["OHealth", "Oman", "health", "open data", "NCSI", "OMHLTH2016", "hospitals", "capacity", "equity"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased bg-[var(--background)] text-[var(--foreground)]`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange={false}>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
