import type { Metadata } from "next";
import { Inter, Source_Serif_4 } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AccessibilityBar from "@/components/layout/AccessibilityBar";
import WhatsAppButton from "@/components/shared/WhatsAppButton";
import { SITE_URL } from "@/lib/constants";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Prefeitura Municipal de Capela de Santana",
    template: "%s | Prefeitura de Capela de Santana",
  },
  description:
    "Site institucional e Portal da Transparência da Prefeitura Municipal de Capela de Santana - RS.",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Prefeitura Municipal de Capela de Santana",
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
    <html lang="pt-BR" className={`${inter.variable} ${sourceSerif.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased bg-neutral-50 text-neutral-900">
        <a href="#conteudo-principal" className="skip-link">
          Ir para o conteúdo
        </a>
        <a href="#menu-principal" className="skip-link">
          Ir para o menu
        </a>
        <a href="#rodape" className="skip-link">
          Ir para o rodapé
        </a>

        <AccessibilityBar />
        <Header />
        <main id="conteudo-principal" className="flex-1">
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
