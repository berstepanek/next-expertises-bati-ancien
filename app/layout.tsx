import "./globals.css";
import type { Metadata } from "next";
import { Instrument_Serif, Urbanist } from "next/font/google";
import { ViewTransitions } from "next-view-transitions";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import IconSprite from "@/components/ui/icon-sprite";
import { site } from "@/lib/content";
import { getGlobalStylesheet } from "@/services/global-style";
import { organizationJsonLd, SITE_URL } from "@/lib/seo";
import JsonLd from "@/components/seo/json-ld";

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
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${site.name} — ${site.baseline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.expertName }],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: site.name,
    url: "/",
    title: `${site.name} — ${site.baseline}`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.baseline}`,
    description: site.description,
  },
  formatDetection: { telephone: false, email: false, address: false },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Styles globaux WordPress, scopés à .cms-content (contenu HTML issu du CMS)
  const globalCss = await getGlobalStylesheet();

  return (
    <html
      lang="fr"
      className={`${urbanist.variable} ${instrumentSerif.variable}`}
    >
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
        <JsonLd data={organizationJsonLd()} />
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
