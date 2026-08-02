import Hero from "@/components/homepage/Hero/Hero";
import About from "@/components/homepage/About/About";
import Projects from "@/components/homepage/Projects/Projects";
import Contact from "@/components/homepage/Contact/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Projects />
      <Contact />
    </main>
  );
}
