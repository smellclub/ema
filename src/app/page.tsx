import { JsonLd } from "@/components/JsonLd";
import { Preloader } from "@/components/motion/Preloader";
import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { Work } from "@/components/sections/Work";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";
import { Faq } from "@/components/sections/Faq";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <JsonLd />
      <Preloader />
      <Header />
      <main id="contenido">
        <Hero />
        <Marquee />
        <Work />
        <About />
        <Services />
        <Process />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
