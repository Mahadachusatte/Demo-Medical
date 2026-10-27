import type { Metadata } from "next";
import { Schibsted_Grotesk } from "next/font/google";
import "./globals.css";

const schibstedGrotesk = Schibsted_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-schibsted-grotesk",
});

export const metadata: Metadata = {
  title: "Ops Desk",
  description: "AI-assisted operations desk for UK healthcare umbrella companies",
  robots: "noindex, nofollow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${schibstedGrotesk.variable} font-sans antialiased`}>
        <div className="border-b border-hold border-3 bg-paper">
          <div className="max-w-7xl mx-auto px-4 py-2 text-meta text-ink">
            Demo: fictional data, no real messages or payments
          </div>
        </div>
        {children}
      </body>
    </html>
  );
}
