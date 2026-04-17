"use client";

// Assignment 2: Product Grid Component
// Fetches products dynamically from Shopify Storefront API
// Uses Category Tabs for filtering

import { useEffect, useState } from "react";
import { Mode, Category, ProductCardData } from "@/types/product";
import { fetchProductsByTag } from "@/lib/shopify";
import { ProductCard } from "./ProductCard";
import { CategoryTabs } from "./CategoryTabs";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface ProductGridProps {
  mode: Mode;
  categories: Category[];
}

/**
 * ProductGrid Component
 * 
 * Features:
 * - Dynamic product fetching from Shopify Storefront API
 * - Category-based filtering via tags
 * - Loading states with spinner
 * - Empty state handling
 * - Responsive grid layout (1-4 columns based on screen size)
 */
export function ProductGrid({ mode, categories }: ProductGridProps) {
  const [activeCategory, setActiveCategory] = useState(categories[0]?.id || "");
  const [products, setProducts] = useState<ProductCardData[]>([]);
  const [loading, setLoading] = useState(true);

  // Reset to first category when mode changes
  useEffect(() => {
    setActiveCategory(categories[0]?.id || "");
  }, [mode, categories]);

  // Fetch products when category changes
  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      const category = categories.find((c) => c.id === activeCategory);
      if (category) {
        const fetchedProducts = await fetchProductsByTag(category.tag);
        setProducts(fetchedProducts);
      }
      setLoading(false);
    };

    loadProducts();
  }, [activeCategory, categories]);

  const activeCategoryData = categories.find((c) => c.id === activeCategory);

  return (
    <section
      id="products-section"
      className={cn(
        "py-20 transition-all duration-700",
        mode === "couple" ? "bg-white" : "bg-gray-900"
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2
            className={cn(
              "text-3xl font-bold transition-colors duration-500 sm:text-4xl",
              mode === "couple" ? "text-gray-900" : "text-white"
            )}
          >
            {mode === "couple" ? "Gift Collections" : "Treat Yourself"}
          </h2>
          <p
            className={cn(
              "mt-4 text-lg transition-colors duration-500",
              mode === "couple" ? "text-gray-600" : "text-gray-400"
            )}
          >
            {mode === "couple"
              ? "Curated comfort gifts for your special someone"
              : "Self-care essentials picked just for you"}
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="mb-10">
          <CategoryTabs
            mode={mode}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
        </div>

        {/* Active Category Label */}
        <div className="mb-8 text-center">
          <span
            className={cn(
              "inline-flex items-center rounded-full px-4 py-2 text-sm font-medium",
              mode === "couple"
                ? "bg-red-100 text-red-700"
                : "bg-purple-900/50 text-purple-300"
            )}
          >
            Showing: {activeCategoryData?.label || "All Products"}
          </span>
        </div>

        {/* Products Grid or Loading State */}
        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <Loader2
              className={cn(
                "h-10 w-10 animate-spin",
                mode === "couple" ? "text-red-500" : "text-purple-500"
              )}
            />
          </div>
        ) : products.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} mode={mode} />
            ))}
          </div>
        ) : (
          <div
            className={cn(
              "rounded-2xl py-16 text-center",
              mode === "couple" ? "bg-gray-50" : "bg-gray-800"
            )}
          >
            <p
              className={cn(
                "text-lg",
                mode === "couple" ? "text-gray-500" : "text-gray-400"
              )}
            >
              No products found in this category.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
