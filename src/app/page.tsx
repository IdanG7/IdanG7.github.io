import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import BentoGrid from "@/components/BentoGrid";
import VentureShowcase from "@/components/VentureShowcase";
import Skills from "@/components/Skills";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import BehindCurtains from "@/components/BehindCurtains";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <BentoGrid />
        <VentureShowcase />
        <Skills />
        <Marquee />
        <About />
        <BehindCurtains />
      </main>
      <Footer />
    </>
  );
}
