"use client";

// Assignment 2: Mode Toggle Component
// Smooth animated toggle inspired by Blinkit, Zepto, Swiggy Instamart
// Switches between Couple Mode (red/warm) and Single Mode (dark/black)

import { Mode } from "@/types/product";
import { cn } from "@/lib/utils";
import { Heart, User } from "lucide-react";

interface ModeToggleProps {
  mode: Mode;
  onModeChange: (mode: Mode) => void;
}

/**
 * ModeToggle Component
 * 
 * Features:
 * - Smooth sliding pill animation (500ms cubic-bezier for snappy feel)
 * - Color transitions between red (couple) and dark gray (single)
 * - Scale animations on active icons
 * - Quick-commerce app style (Blinkit, Zepto, Swiggy Instamart inspired)
 */
export function ModeToggle({ mode, onModeChange }: ModeToggleProps) {
  return (
    <div className="relative flex items-center justify-center">
      {/* Toggle Container */}
      <div
        className={cn(
          "relative flex items-center rounded-full p-1.5 transition-all duration-500",
          // Easing: cubic-bezier(0.34, 1.56, 0.64, 1) creates bouncy/snappy effect like quick-commerce apps
          "ease-[cubic-bezier(0.34,1.56,0.64,1)]",
          mode === "couple" ? "bg-red-100" : "bg-gray-800"
        )}
      >
        {/* Animated Sliding Background Pill */}
        <div
          className={cn(
            "absolute h-[calc(100%-12px)] w-[calc(50%-6px)] rounded-full transition-all duration-500",
            "ease-[cubic-bezier(0.34,1.56,0.64,1)]", // Same bouncy easing for pill movement
            mode === "couple"
              ? "left-[6px] bg-gradient-to-r from-red-500 to-rose-500"
              : "left-[calc(50%)] bg-gradient-to-r from-gray-600 to-gray-700"
          )}
        />

        {/* Couple Mode Button */}
        <button
          onClick={() => onModeChange("couple")}
          className={cn(
            "relative z-10 flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold",
            "transition-all duration-300",
            mode === "couple"
              ? "text-white"
              : "text-gray-400 hover:text-gray-300"
          )}
          aria-pressed={mode === "couple"}
          aria-label="Switch to Couple Mode"
        >
          <Heart
            className={cn(
              "h-4 w-4 transition-transform duration-300",
              mode === "couple" && "scale-110 fill-current"
            )}
          />
          <span>Couple</span>
        </button>

        {/* Single Mode Button */}
        <button
          onClick={() => onModeChange("single")}
          className={cn(
            "relative z-10 flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold",
            "transition-all duration-300",
            mode === "single"
              ? "text-white"
              : "text-gray-500 hover:text-gray-400"
          )}
          aria-pressed={mode === "single"}
          aria-label="Switch to Single Mode"
        >
          <User
            className={cn(
              "h-4 w-4 transition-transform duration-300",
              mode === "single" && "scale-110"
            )}
          />
          <span>Single</span>
        </button>
      </div>
    </div>
  );
}
