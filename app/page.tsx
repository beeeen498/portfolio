import Hero from "@/components/homepage/Hero/Hero";
import About from "@/components/homepage/About/About";
import Contact from "@/components/homepage/Contact/Contact";

export default function Home() {
  return (
    <main>
      {/* hero */}
      <section id="home">
        <Hero />
      </section>

      {/* about */}
      <section id="about">
        <About />
      </section>

      {/* projects */}
      <section id="projects">
      </section>

      {/* contact */}
      <section id="contact">
        <Contact />
      </section>
    </main>
  );
}