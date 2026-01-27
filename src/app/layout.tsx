import type { Metadata, Viewport } from "next";
import Script from "next/script";
import localFont from "next/font/local";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import PageLoader from "@/components/PageLoader";
import PageTransition from "@/components/PageTransition";
import DisableRightClick from "@/components/DisableRightClick";

const helvetica = localFont({
  src: [
    { path: "../fonts/Helvetica.ttf", weight: "400", style: "normal" },
    { path: "../fonts/Helvetica_Bold.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-helvetica",
  display: "swap",
});

const outfit = localFont({
  src: [{ path: "../fonts/Outfit_VariableFont_wght.ttf", weight: "100 900", style: "normal" }],
  variable: "--font-outfit",
  display: "swap",
});

const fjallaOne = localFont({
  src: [{ path: "../fonts/FjallaOne_Regular.ttf", weight: "400", style: "normal" }],
  variable: "--font-fjalla",
  display: "swap",
});

const nyghtSerif = localFont({
  src: [
    { path: "../fonts/NyghtSerif_Regular.ttf", weight: "400", style: "normal" },
    { path: "../fonts/NyghtSerif_RegularItalic.ttf", weight: "400", style: "italic" },
    { path: "../fonts/NyghtSerif_BoldItalic.ttf", weight: "700", style: "italic" },
  ],
  variable: "--font-nyght",
  display: "swap",
});

const clashDisplay = localFont({
  src: [{ path: "../fonts/ClashDisplay_Variable.ttf", weight: "200 700", style: "normal" }],
  variable: "--font-clash",
  display: "swap",
});

const snellRoundhand = localFont({
  src: [{ path: "../fonts/SnellRoundhand_Black_Script.otf", weight: "900", style: "normal" }],
  variable: "--font-snell",
  display: "swap",
});

const elicitScript = localFont({
  src: [{ path: "../fonts/Elicit-Script-2.ttf", weight: "400", style: "normal" }],
  variable: "--font-elicit",
  display: "swap",
});

const autography = localFont({
  src: [{ path: "../fonts/Autography.otf", weight: "400", style: "normal" }],
  variable: "--font-autography",
  display: "swap",
});

const agile = localFont({
  src: [{ path: "../fonts/agile.ttf", weight: "400", style: "normal" }],
  variable: "--font-agile",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "Idan Gurevich - Backend Engineer & Firmware Whisperer",
  description:
    "Backend engineer specializing in C++ development, firmware engineering, and DevOps automation. Focused on reliable systems and real-time infrastructure.",
  keywords: [
    "Idan Gurevich",
    "Backend Engineer",
    "Firmware Engineer",
    "C++",
    "DevOps",
    "CI/CD",
    "Automation",
    "Distributed Systems",
    "Computer Vision",
    "Infrastructure",
  ],
  authors: [{ name: "Idan Gurevich", url: "https://github.com/IdanG7" }],
  creator: "Idan Gurevich",
  publisher: "Idan Gurevich",
  metadataBase: new URL("https://github.com/IdanG7"),
  alternates: {
    canonical: "https://github.com/IdanG7",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://github.com/IdanG7",
    title: "Idan Gurevich - Backend Engineer & Firmware Whisperer",
    description:
      "Backend engineer specializing in C++ development, firmware engineering, and DevOps automation. Focused on reliable systems and real-time infrastructure.",
    siteName: "Idan Gurevich",
    images: [
      {
        url: "https://github.com/idang7.png",
        width: 1200,
        height: 630,
        alt: "Idan Gurevich - Backend Engineer & Firmware Whisperer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Idan Gurevich - Backend Engineer & Firmware Whisperer",
    description:
      "Backend engineer specializing in C++ development, firmware engineering, and DevOps automation. Focused on reliable systems and real-time infrastructure.",
    creator: "@IdanG7",
    images: ["https://github.com/idang7.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning style={{ colorScheme: "dark" }}>
      <head>
        {/* DNS Prefetch for external resources */}
        <link rel="dns-prefetch" href="https://github.com" />
        <link rel="dns-prefetch" href="https://api.github.com" />
        <link rel="dns-prefetch" href="https://static.wixstatic.com" />

        {/* Preconnect for faster resource loading */}
        <link rel="preconnect" href="https://github.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://api.github.com" crossOrigin="anonymous" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body
        className={`${agile.variable} ${nyghtSerif.variable} ${outfit.variable} ${clashDisplay.variable} ${snellRoundhand.variable} ${fjallaOne.variable} ${helvetica.variable} ${elicitScript.variable} ${autography.variable} antialiased bg-neutral-50 dark:bg-black text-neutral-900 dark:text-[#ededed] font-outfit`}
      >
        <Script id="theme-init" strategy="beforeInteractive">
          {`(function() {
            var storedTheme = localStorage.getItem('theme');
            var theme = storedTheme || 'dark';
            document.documentElement.classList.toggle('dark', theme === 'dark');
            document.documentElement.style.colorScheme = theme;
          })();`}
        </Script>
        <DisableRightClick />
        <SmoothScroll>
          <PageLoader />
          <PageTransition>{children}</PageTransition>
        </SmoothScroll>
      </body>
    </html>
  );
}
