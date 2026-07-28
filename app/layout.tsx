import type { Metadata } from "next";
import { Teko, Russo_One, Abel, Syncopate } from "next/font/google";
import "@/styles/main.scss";

// fonts
const teko = Teko({
  variable: "--font-teko",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const russoOne = Russo_One({
  variable: "--font-russo",
  subsets: ["latin"],
  weight: "400",
});

const abel = Abel({
  variable: "--font-abel",
  subsets: ["latin"],
  weight: "400",
});

const syncopate = Syncopate({
  variable: "--font-syncopate",
  subsets: ["latin"],
  weight: ["400", "700"],
});

// metadata
export const metadata: Metadata = {
  title: "Ben Kedem | Front End Developer",
  description: "Front End Developer portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${teko.variable} ${russoOne.variable} ${abel.variable} ${syncopate.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}