import type { Metadata } from "next";
import {
  Teko,
  Russo_One,
  Abel,
  Syncopate,
  Karantina,
  Heebo,
} from "next/font/google";
import { LanguageProvider } from "@/context/LanguageContext";
import { LoaderProvider } from "@/context/LoaderContext";
import Loader from "@/components/shared/Loader/Loader";
import Header from "@/components/shared/Header/Header";
import Footer from "@/components/shared/Footer/Footer";
import Script from "next/script";
import "@/app/main.scss";

/* ========================
   FONTS
======================== */
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

const karantina = Karantina({
  variable: "--font-karantina",
  subsets: ["hebrew"],
  weight: ["400", "700"],
});

const heebo = Heebo({
  variable: "--font-heebo",
  subsets: ["hebrew"],
  weight: ["300", "400", "700"],
});

/* ========================
   METADATA
======================== */
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
    images: [
      {
        url: "https://benkedem.co/preview.png",
        width: 1200,
        height: 630,
      },
    ],
  },
};

/* ========================
   ROOT LAYOUT
======================== */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${teko.variable} ${russoOne.variable} ${abel.variable} ${syncopate.variable} ${karantina.variable} ${heebo.variable}`}
    >
      <body>
        {/* ========================
            PRE-LOADER — grey screen that covers the page
            until the Loader component mounts and takes over.
            hidden via JS once the loader has played.
        ======================== */}
        <div
          id="pre-loader"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100vh",
            backgroundColor: "#656565",
            zIndex: 998,
          }}
        />

        <LanguageProvider>
          <LoaderProvider>
            <Loader />
            <Header />
            {children}
            <Footer />
          </LoaderProvider>
        </LanguageProvider>

        {/* ========================
            ACCESSIBILITY WIDGET
        ======================== */}
        <Script
          src="https://negishot.co.il/cdn/widget.php?code=NGS_914747EA86CD"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
