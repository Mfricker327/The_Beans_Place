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
import FeaturesSection from "./components/FeaturesSection";
import ProductShowcase from "./components/ProductShowcase";
import CtaSection from "./components/CtaSection";
import FooterSection from "./components/FooterSection";
import AboutSection from "./components/AboutSection";
import RibbonTicker from "./components/RibbonTicker";

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
      {/* Hero Section */}
      <section className="hero bg-hero">
        <div className="hero-grid">
          <HeroSection />
        </div>
      </section>

      {/* Features Section */}
      <section className="features bg-features" id="shop">
        <FeaturesSection />
      </section>
      {/* Product Showcase Section */}
      <section className="bg-cta">
        <ProductShowcase />
      </section>
      {/* Ribbon Ticker Section */}
      <RibbonTicker />
      {/* CTA Section */}
      <section className="bg-cta">
        <CtaSection />
      </section>
      {/* About Section */}
      <section className="bg-cta" id="about">
        <AboutSection />
      </section>
      {/* Contact Section */}
      <section className="bg-cta" id="contact">
        <ContactSection />
      </section>
      {/* Footer Section */}
      <section className="bg-footer">
        <FooterSection />
      </section>
    </div>
  );
}
