import About from "@/components/About";
import AboutHero from "@/components/AboutHero";
import BehindCurtains from "@/components/BehindCurtains";
import ExperienceTimeline from "@/components/ExperienceTimeline";

import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";


export default function AboutPage() {
  return (
    <>
      <Navigation />
      <main>
        <AboutHero />
        <About variant="about" />
        <ExperienceTimeline />

        <BehindCurtains />
      </main>
      <Footer />
    </>
  );
}
