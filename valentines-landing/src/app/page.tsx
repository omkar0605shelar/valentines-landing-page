"use client";

// Assignment 2: Valentine's Day Landing Page
// Main page component assembling all sections
// Features: Couple/Single mode toggle, Shopify product integration, category filtering

import { useState } from "react";
import { Mode, COUPLE_CATEGORIES, SINGLE_CATEGORIES } from "@/types/product";
import { HeroSection } from "@/components/HeroSection";
import { ProductGrid } from "@/components/ProductGrid";
import { Footer } from "@/components/Footer";

export default function Home() {
  // State for mode toggle (couple/single)
  const [mode, setMode] = useState<Mode>("couple");

  // Get categories based on current mode
  const categories = mode === "couple" ? COUPLE_CATEGORIES : SINGLE_CATEGORIES;

  return (
    <main className="min-h-screen">
      {/* Hero Section with mode toggle and video banners */}
      <HeroSection mode={mode} onModeChange={setMode} />
      
      {/* Product Grid with category tabs and dynamic Shopify products */}
      <ProductGrid mode={mode} categories={categories} />
      
      {/* Footer */}
      <Footer mode={mode} />
    </main>
  );
}
