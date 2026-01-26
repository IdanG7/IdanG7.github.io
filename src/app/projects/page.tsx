import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import ProjectsHero from "@/components/ProjectsHero";
import VentureShowcase from "@/components/VentureShowcase";

export default function ProjectsPage() {
  return (
    <>
      <Navigation />
      <main>
        <ProjectsHero />
        <VentureShowcase showHeading={false} />
        <Footer />
      </main>
    </>
  );
}
