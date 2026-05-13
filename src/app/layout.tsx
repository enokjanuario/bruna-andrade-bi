import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import { Shell } from "../components/Shell";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["300", "400", "600", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Observatório ESG & Território · Bruna Andrade",
  description:
    "BI editorial de governança ambiental e social — auditoria ESG FORTRATEST e geografia do desmatamento no Rio de Janeiro.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
