"use client";

// Assignment 2: Product Card Component
// Requirements: product image, name, original price, sale price, discount badge, Add to Cart button
// Data from Shopify Storefront API

import { useState } from "react";
import { ProductCardData } from "@/types/product";
import { Mode } from "@/types/product";
import { cn } from "@/lib/utils";
import { ShoppingCart, Heart, Check } from "lucide-react";
import Image from "next/image";

interface ProductCardProps {
  product: ProductCardData;
  mode: Mode;
}

/**
 * ProductCard Component
 * 
 * Displays:
 * - Product image (from Shopify)
 * - Product name
 * - Sale price (current price)
 * - Original price (compare at price, strikethrough)
 * - Discount badge (calculated percentage)
 * - Add to Cart button (with click feedback)
 * - Wishlist button (hover)
 */
export function ProductCard({ product, mode }: ProductCardProps) {
  const discount = product.discount;
  const [added, setAdded] = useState(false);

  // Handle Add to Cart click
  const handleAddToCart = () => {
    setAdded(true);
    // Reset after 2 seconds
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl transition-all duration-300",
        mode === "couple"
          ? "bg-white shadow-lg shadow-gray-200/50 hover:shadow-xl hover:shadow-red-100/50"
          : "bg-gray-800 shadow-lg shadow-black/20 hover:shadow-xl hover:shadow-purple-900/20"
      )}
    >
      {/* Discount Badge */}
      {discount && discount > 0 && (
        <div
          className={cn(
            "absolute left-3 top-3 z-10 rounded-full px-3 py-1 text-xs font-bold",
            mode === "couple" ? "bg-red-500 text-white" : "bg-purple-500 text-white"
          )}
        >
          -{discount}%
        </div>
      )}

      {/* Wishlist Button (appears on hover) */}
      <button
        className={cn(
          "absolute right-3 top-3 z-10 rounded-full p-2.5 transition-all duration-300 opacity-0 group-hover:opacity-100",
          mode === "couple"
            ? "bg-white/90 text-gray-600 hover:bg-red-50 hover:text-red-500"
            : "bg-gray-700/90 text-gray-400 hover:bg-gray-600 hover:text-white"
        )}
        aria-label="Add to wishlist"
      >
        <Heart className="h-4 w-4" />
      </button>

      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* Hover overlay gradient */}
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-t opacity-0 transition-opacity duration-300 group-hover:opacity-100",
            mode === "couple" ? "from-red-900/20" : "from-black/40"
          )}
        />
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Product Name */}
        <h3
          className={cn(
            "font-semibold text-base leading-tight line-clamp-2 min-h-[2.5rem]",
            mode === "couple" ? "text-gray-900" : "text-white"
          )}
        >
          {product.title}
        </h3>

        {/* Price Section */}
        <div className="mt-2 flex items-center gap-2">
          {/* Sale Price */}
          <span
            className={cn(
              "text-lg font-bold",
              mode === "couple" ? "text-red-600" : "text-purple-400"
            )}
          >
            {product.price}
          </span>
          {/* Original Price (strikethrough) */}
          {product.originalPrice && (
            <span
              className={cn(
                "text-sm line-through",
                mode === "couple" ? "text-gray-400" : "text-gray-500"
              )}
            >
              {product.originalPrice}
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className={cn(
            "mt-4 flex w-full items-center justify-center gap-2 rounded-xl py-3 font-semibold transition-all duration-300 active:scale-95 cursor-pointer",
            mode === "couple"
              ? added
                ? "bg-green-600 text-white"
                : "bg-gray-900 text-white hover:bg-red-600"
              : added
                ? "bg-green-600 text-white"
                : "bg-gray-700 text-white hover:bg-purple-600"
          )}
          aria-label={`Add ${product.title} to cart`}
        >
          {added ? (
            <>
              <Check className="h-4 w-4" />
              <span>Added!</span>
            </>
          ) : (
            <>
              <ShoppingCart className="h-4 w-4" />
              <span>Add to Cart</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
