import { useState, useCallback } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Problem from "./components/Problem";
import Shift from "./components/Shift";
import Solution from "./components/Solution";
import Experience from "./components/Experience";
import ParentValue from "./components/ParentValue";
import Differentiation from "./components/Differentiation";
import Framework from "./components/Framework";
import BetaForm from "./components/BetaForm";
import FAQ from "./components/FAQ";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";

export default function App() {
  const [, setBump] = useState(0);

  const scrollToId = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 72;
    window.scrollTo({ top, behavior: "smooth" });
    setBump((n) => n + 1);
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-clip bg-cream-50 text-ink-800">
      <Header onCtaClick={() => scrollToId("beta")} onNavClick={scrollToId} />
      <main>
        <Hero
          onPrimary={() => scrollToId("beta")}
          onSecondary={() => scrollToId("experience")}
        />
        <Problem />
        <Shift />
        <Solution />
        <Experience />
        <ParentValue onCta={() => scrollToId("beta")} />
        <Differentiation />
        <Framework />
        <BetaForm />
        <FAQ />
        <FinalCTA onCta={() => scrollToId("beta")} />
      </main>
      <Footer />
    </div>
  );
}
