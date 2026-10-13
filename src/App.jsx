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
import RibbonTicker from "./components/RibbonTicker";
import ProductShowcase  from "./components/ProductShowcase";

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

      {/* Product Showcase */}
      <seciton className="bg-cta">
        <ProductShowcase products={productCatalog} addToCart={addToCart} />
      </seciton>

      {/* Ribbon Ticker Section */}
      <RibbonTicker />

      <section className="bg-cta" id="about">
        <div className="container" style={{ padding: "4rem 1.5rem" }}>
          <h2 style={{ margin: 0, fontSize: "2.5rem" }}>Fresh coffee, roasted with purpose.</h2>
          <p style={{ maxWidth: "48rem", margin: "1rem auto 0" }}>
            We source premium beans from trusted growers and roast in small batches to deliver
            vibrant flavor and a café-quality cup at home.
          </p>
        </div>
      </section>

      <section className="bg-footer" id="contact">
        <div className="container" style={{ padding: "4rem 1.5rem", textAlign: "center" }}>
          <h3 style={{ margin: 0 }}>Contact the roastery</h3>
          <p style={{ margin: "0.75rem 0 0" }}>hello@beansplace.com · (303) 555-0147</p>
        </div>
      </section>
      
    </div>
  );
}
