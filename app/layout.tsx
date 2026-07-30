import type { Metadata } from "next";
import { Teko, Russo_One, Abel, Syncopate } from "next/font/google";
import { LoaderProvider } from "@/context/LoaderContext";
import Loader from "@/components/shared/Loader/Loader";
import Header from "@/components/shared/Header/Header";
import Footer from "@/components/shared/Footer/Footer";
import "@/app/main.scss";

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
  description: "Front End Developer portfolio showcasing projects and skills",
  keywords: [
    "Front End Developer",
    "React",
    "Next.js",
    "Portfolio",
    "Ben Kedem",
  ],
  authors: [{ name: "Ben Kedem" }],
  openGraph: {
    title: "Ben Kedem | Front End Developer",
    description: "Front End Developer portfolio showcasing projects and skills",
    type: "website",
    locale: "en_US",
    url: "https://benkedem.co",
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
      className={`${teko.variable} ${russoOne.variable} ${abel.variable} ${syncopate.variable}`}
    >
      <body>
        <LoaderProvider>
          <Loader />
          <Header />
          {children}
          <Footer />
        </LoaderProvider>
      </body>
    </html>
  );
}
