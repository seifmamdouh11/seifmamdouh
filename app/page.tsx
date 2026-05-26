import Hero from "./components/MainLayout/Hero";
import About from "./components/MainLayout/About";
import Projects from "./components/MainLayout/Projects";
import Contact from "./components/MainLayout/Contact";

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

