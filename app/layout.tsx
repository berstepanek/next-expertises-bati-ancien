import "./globals.css";
import type { Metadata } from "next";
import { Instrument_Serif, Urbanist } from "next/font/google";
import { ViewTransitions } from "next-view-transitions";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import IconSprite from "@/components/ui/icon-sprite";
import { site } from "@/lib/content";
import { getGlobalStylesheet } from "@/services/global-style";

const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-urbanist",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
});

export const metadata: Metadata = {
  title: `${site.name} — ${site.baseline}`,
  description: site.description,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Styles globaux WordPress, scopés à #cms-container (pages issues du CMS)
  const globalCss = await getGlobalStylesheet();

  return (
    <html lang="fr" className={`${urbanist.variable} ${instrumentSerif.variable}`}>
      <head>
        {globalCss && (
          <style
            href="wp-global-styles"
            precedence="high"
            dangerouslySetInnerHTML={{ __html: globalCss }}
          />
        )}
      </head>
      <body>
        <ViewTransitions>
          <IconSprite />
          <Header />
          <main>{children}</main>
          <Footer />
        </ViewTransitions>
      </body>
    </html>
  );
}
