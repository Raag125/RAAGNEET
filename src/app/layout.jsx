import { Geist, Geist_Mono, Syne, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import SharedNavbar from "@/components/SharedNavbar";
import LenisProvider from "@/components/LenisProvider";
import { ThemeProvider } from "@/context/ThemeContext";
import FpsMeter from "@/components/FpsMeter";
import AudioPlayer from "@/components/AudioPlayer";
import Loader from "@/components/Loader";

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
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${syne.variable} ${bricolage.variable} antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                function lockScale() {
                  // Locks the scale strictly to 1.1 on all desktop screens.
                  // Does not use any ratio math, preventing cards from becoming huge on large displays.
                  if (window.innerWidth >= 1024) {
                    document.documentElement.style.zoom = 1.1;
                  } else {
                    document.documentElement.style.zoom = 1.0;
                  }
                }
                lockScale();
                window.addEventListener('resize', lockScale);
              })();
            `,
          }}
        />
      </head>
      <body className="flex flex-col bg-[#010103] relative min-h-screen">
        <ThemeProvider>
          <LenisProvider>
            <Loader />
            <SharedNavbar />
            <div className="relative z-10">{children}</div>
            <FpsMeter />
            <AudioPlayer />
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
