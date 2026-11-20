import Hero from "@/components/home/hero";
import Pillars from "@/components/home/pillars";
import KeyFigures from "@/components/home/key-figures";
import Situations from "@/components/home/situations";
import Method from "@/components/home/method";
import Expert from "@/components/home/expert";
import Report from "@/components/home/report";
import Testimonials from "@/components/home/testimonials";
import Faq from "@/components/home/faq";
import Contact from "@/components/home/contact";
import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <Hero />
      <Pillars />
      <KeyFigures />
      <Situations />
      <Method />
      <Expert />
      <Report />
      <Testimonials />
      <Faq />
      <Contact />
    </>
  );
}
