"use client";

// Assignment 2: Category Filter Tabs Component
// Couple Mode: Sleep, Travel, WFH, GYM
// Single Mode: Mom, Dad, BFF, Kids
// Dynamically filters products from Shopify via tags

import { Mode, Category, COUPLE_CATEGORIES, SINGLE_CATEGORIES } from "@/types/product";
import { cn } from "@/lib/utils";

interface CategoryTabsProps {
  mode: Mode;
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

/**
 * CategoryTabs Component
 * 
 * Features:
 * - Shows different categories based on mode (Couple vs Single)
 * - Active tab has animated background with pulse effect
 * - Smooth transitions between categories
 * - Dynamic product filtering via Shopify tag system
 */
export function CategoryTabs({ mode, activeCategory, onCategoryChange }: CategoryTabsProps) {
  const categories = mode === "couple" ? COUPLE_CATEGORIES : SINGLE_CATEGORIES;

  return (
    <div className="flex flex-wrap justify-center gap-3">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={cn(
            "relative rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300",
            mode === "couple"
              ? activeCategory === category.id
                ? "bg-red-500 text-white shadow-lg shadow-red-500/25"
                : "bg-white text-gray-700 shadow-md hover:bg-red-50 hover:text-red-600"
              : activeCategory === category.id
                ? "bg-purple-500 text-white shadow-lg shadow-purple-500/25"
                : "bg-gray-800 text-gray-300 shadow-md hover:bg-gray-700 hover:text-white"
          )}
          aria-pressed={activeCategory === category.id}
          aria-label={`Filter by ${category.label}`}
        >
          {category.label}
          
          {/* Animated pulse effect for active tab */}
          {activeCategory === category.id && (
            <span
              className={cn(
                "absolute inset-0 rounded-full animate-ping opacity-20",
                mode === "couple" ? "bg-red-400" : "bg-purple-400"
              )}
            />
          )}
        </button>
      ))}
    </div>
  );
}
