import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["300", "400", "500", "600", "700"]
});

export const metadata: Metadata = {
  title: "Neural Archive | Mind-Blooms",
  description: "A premium scrollytelling thought-vault exploring the architecture of consciousness.",
  openGraph: {
    title: "Neural Archive | Mind-Blooms",
    description: "A premium scrollytelling thought-vault navigating the architecture of ideas.",
    url: "https://neural-archive.vercel.app",
    siteName: "Neural Archive",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Neural Archive - Visual thought exploration"
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Neural Archive | Mind-Blooms",
    description: "A premium scrollytelling thought-vault exploring consciousness.",
  },
  keywords: ["neural archive", "thought vault", "consciousness", "philosophy", "scrollytelling", "interactive experience"],
  authors: [{ name: "Neural Archive" }],
  creator: "Neural Archive",
  viewport: "width=device-width, initial-scale=1, maximum-scale=5",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={spaceGrotesk.variable}>
      <body className={spaceGrotesk.className}>{children}</body>
    </html>
  );
}
