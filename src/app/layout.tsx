import { Providers } from "@/components/providers";
import { Theme } from "@/components/theme";
import { Geist, Geist_Mono } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";

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
      >
        <Theme name="monochrome">
          <Suspense fallback={<></>}>
            <Providers>{children}</Providers>
          </Suspense>
        </Theme>
      </body>
    </html>
  );
}
