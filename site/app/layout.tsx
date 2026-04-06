import type { Metadata } from "next";
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
  title: "Calvin Portfolio",
  description: "Personal portfolio website",
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
      </body>
    </html>
  );
}
