// ============================================================
// APP.JSX — The Root Component (Day 2)
// ============================================================
// This is the MAIN file of your React application.
// It acts as the "layout manager" — it imports all section
// components and arranges them on the page.
//
// WHAT YOU WILL LEARN:
// - How to import components from other files
// - How to use export default to share a component
// - How to compose a page from smaller components
// - How JSX lets you use custom components like HTML tags
//
// ============================================================

// STEP 1: Import your section components
// Each component lives in its own file inside ./components/
// Use this syntax:  import ComponentName from "./components/ComponentName";
//
// Import the following components (in this order):
// - RibbonTicker
// - NavBar
// - HeroSection
// - CtaSection
// - FeaturesSection
// - ProductShowcase
// - FooterSection
// - AboutSection
// - ContactSection

import { useState } from "react";


import NavBar from "./components/NavBar";
import HeroSection from "./components/HeroSection";
import CtaSection from "./components/CtaSection";
import FeaturesSection from "./components/FeaturesSection";
import ProductShowcase from "./components/ProductShowcase";
import FooterSection from "./components/FooterSection";
import AboutSection from "./components/AboutSection";
import ContactSection from "./components/ContactSection";
import HeroSection from "./components/HeroSection";

export default function App() {
  const [theme, setTheme] = useState("light");
  const [cartCount, setCartCount] = useState(0);

  const toggleCart = () => setCartCount((current) => current + 1);

  return (
    <div className="app">
      <NavBar
        toggleCart={toggleCart}
        cartCount={cartCount}
        theme={theme}
        onToggleTheme={() =>
          setTheme((current) => (current === "light" ? "dark" : "light"))
        }
      />

      <section className="hero bg-hero">
        <div className="hero-grid">
          <HeroSection />
        </div>
      </section>


      <section className="features bg-features" id="shop">
        <FeaturesSection />
      </section>

      <section className="bg-cta">
        <ProductShowcase />
      </section>

      <RibbonTicker />

      <section className="bg-cta">
        <CtaSection />
      </section>

      <section className="bg-cta" id="about">
        <AboutSection />
      </section>

      <section className="bg-cta" id="contact">
        <ContactSection />
      </section>

      <section className="bg-footer">
        <FooterSection />
      </section>
    </div>
  );
}
