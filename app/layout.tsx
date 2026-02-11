import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Neural Archive | Mind-Blooms",
  description: "A premium scrollytelling thought-vault.",
  openGraph: {
    title: "Neural Archive | Mind-Blooms",
    description: "A premium scrollytelling thought-vault navigating the architecture of ideas.",
    url: "https://neural-archive.vercel.app", // Placeholder URL
    siteName: "Neural Archive",
    images: [
      {
        url: "/og-image.jpg", // Placeholder
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Neural Archive",
    description: "A premium scrollytelling thought-vault.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
