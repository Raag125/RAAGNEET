import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SharedNavbar from "@/components/SharedNavbar";
import LenisProvider from "@/components/LenisProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
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
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="flex flex-col bg-[#010103]">
        <LenisProvider>
          <SharedNavbar />
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
