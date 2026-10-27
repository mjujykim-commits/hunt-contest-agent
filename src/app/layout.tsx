import type { Metadata } from "next";
import { IBM_Plex_Sans_KR, Syne } from "next/font/google";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const plex = IBM_Plex_Sans_KR({
  variable: "--font-plex",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "HUNT — 공모전 사냥꾼 에이전트",
  description:
    "분산된 공모전 데이터를 모아 기대값·적합도·마감으로 순위를 매기고, 왜 그 공모전인지 근거와 함께 다음 행동을 제시하는 에이전트.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body className={`${syne.variable} ${plex.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
