import type { Metadata } from "next";
import { Bodoni_Moda, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const bodoni = Bodoni_Moda({
  variable: "--font-bodoni-moda",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "PIOZZA — Artisanal Neapolitan Pizza",
  description:
    "900° wood-fired. 60 seconds. Centuries of devotion. Artisanal Neapolitan pizza from Naples, since 1962.",
};

import { CartProvider } from "@/lib/cart-context";
import { AuthProvider } from "@/lib/auth-context";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${bodoni.variable} ${inter.variable} ${mono.variable} h-full antialiased`}
    >
      <head>
        <link rel="preload" as="image" href="/frames/frame_0001.webp" />
      </head>
      <body className="min-h-full bg-bg text-ink font-sans">
        <AuthProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
