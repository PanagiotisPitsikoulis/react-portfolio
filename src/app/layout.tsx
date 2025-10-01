import { Providers } from "@/components/providers";
import { Theme } from "@/components/theme";
import "@/lib/fontawesome";
import { Geist, Geist_Mono } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import { theme } from "@/components/chromaui/themes";

export { metadata } from "../../content/data";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden bg-background`}
        style={theme.primary}
      >
        <Suspense fallback={<></>}>
          <Providers>{children}</Providers>
        </Suspense>
      </body>
    </html>
  );
}
