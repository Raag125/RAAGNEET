import { Geist, Geist_Mono, Syne, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import SharedNavbar from "@/components/SharedNavbar";
import LenisProvider from "@/components/LenisProvider";
import { ThemeProvider } from "@/context/ThemeContext";
import FpsMeter from "@/components/FpsMeter";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

export const metadata = {
  title: "NeetWeb | Premium Digital Agency & Web Development",
  description: "We engineer high-end, immersive digital environments that convert. Upgrade your business with our physics-based web experiences and modern UI/UX design.",
  keywords: "web development agency, high-end web design, 3D web experiences, conversion optimization",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${syne.variable} ${bricolage.variable} antialiased`}
    >
      <body className="flex flex-col bg-[#010103] relative min-h-screen">
        <ThemeProvider>
          <LenisProvider>
            <SharedNavbar />
            <div className="relative z-10">{children}</div>
            <FpsMeter />
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
