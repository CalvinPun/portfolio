import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import localFont from "next/font/local";
import "./globals.css";

const dmSans = localFont({
  src: "./fonts/DMSans-VariableFont_opsz,wght.ttf",
  variable: "--font-dm-sans",
});

const caveat = localFont({
  src: "./fonts/Caveat-VariableFont_wght.ttf",
  variable: "--font-caveat",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://calvinpun.com"),
  title: {
    default: "Calvin Pun",
    template: "%s | Calvin Pun",
  },
  description: "CS + Math @ NYU",
  applicationName: "Calvin Pun",
  authors: [{ name: "Calvin Pun", url: "https://calvinpun.com" }],
  creator: "Calvin Pun",
  publisher: "Calvin Pun",
  keywords: [
    "Calvin Pun",
    "portfolio",
    "software engineer",
    "frontend developer",
    "Next.js",
    "React",
    "NYU",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "https://calvinpun.com",
    title: "Calvin Pun",
    description: "CS + Math @ NYU",
    siteName: "Calvin Pun",
  },
  twitter: {
    card: "summary",
    title: "Calvin Pun",
    description: "CS + Math @ NYU",
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${caveat.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
