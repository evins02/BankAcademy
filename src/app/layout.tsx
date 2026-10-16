import type { Metadata } from "next";
import localFont from "next/font/local";
import { ClerkProvider } from "@clerk/nextjs";
import { LanguageProvider } from "@/context/LanguageContext";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://bankacademy.ch"),
  title: "BankAcademy – Digitales Praxistraining für Schweizer Banking",
  description: "BankAcademy macht realitätsnahe Banksituationen digital erlebbar. Interaktive Trainingsszenarien für Lernende, Praktikanten und Bankmitarbeitende in der Schweiz.",
  openGraph: {
    title: "BankAcademy – Digitales Praxistraining für Schweizer Banking",
    description: "BankAcademy macht realitätsnahe Banksituationen digital erlebbar. Interaktive Trainingsszenarien für Lernende und Bankmitarbeitende.",
    url: "https://bankacademy.ch",
    siteName: "BankAcademy",
    locale: "de_CH",
    type: "website",
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <LanguageProvider>
      <html lang="de">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[999] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
          >
            Zum Hauptinhalt springen
          </a>
          {children}
        </body>
      </html>
      </LanguageProvider>
    </ClerkProvider>
  );
}
