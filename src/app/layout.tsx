import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "バイブCoding | プログラミング講座プラットフォーム",
  description: "YouTubeで人気のバイブCodingの動画を体系的に学べるオンライン講座プラットフォーム。Next.js、React、TypeScript、クラウド技術を実践的に習得できます。",
  keywords: ["プログラミング", "Next.js", "React", "TypeScript", "オンライン講座", "バイブCoding"],
  authors: [{ name: "バイブCoding" }],
  openGraph: {
    title: "バイブCoding | プログラミング講座プラットフォーム",
    description: "YouTubeで人気のバイブCodingの動画を体系的に学べるオンライン講座プラットフォーム",
    type: "website",
    locale: "ja_JP",
  },
  twitter: {
    card: "summary_large_image",
    title: "バイブCoding | プログラミング講座プラットフォーム",
    description: "YouTubeで人気のバイブCodingの動画を体系的に学べるオンライン講座プラットフォーム",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 text-gray-900`}
      >
        <div className="min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
