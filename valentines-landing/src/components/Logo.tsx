"use client";

// Logo Component for Valentine's Gift Shop
// Adapts colors based on Couple/Single mode

import { Mode } from "@/types/product";
import { cn } from "@/lib/utils";
import { Heart, Gift } from "lucide-react";

interface LogoProps {
  mode: Mode;
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

/**
 * Logo Component
 * 
 * Features:
 * - Animated heart icon with gift box
 * - Mode-adaptive colors (red for couple, purple for single)
 * - Optional text display
 * - Three size variants
 */
export function Logo({ mode, size = "md", showText = true }: LogoProps) {
  const sizeClasses = {
    sm: {
      container: "gap-1.5",
      icon: "h-6 w-6",
      text: "text-lg",
    },
    md: {
      container: "gap-2",
      icon: "h-8 w-8",
      text: "text-xl",
    },
    lg: {
      container: "gap-3",
      icon: "h-10 w-10",
      text: "text-2xl",
    },
  };

  const classes = sizeClasses[size];

  return (
    <div className={cn("flex items-center", classes.container)}>
      {/* Logo Icon Container */}
      <div
        className={cn(
          "relative flex items-center justify-center rounded-xl transition-all duration-500",
          mode === "couple"
            ? "bg-gradient-to-br from-red-500 to-rose-500"
            : "bg-gradient-to-br from-purple-500 to-pink-500",
          size === "sm" ? "p-1.5" : size === "md" ? "p-2" : "p-2.5"
        )}
      >
        {/* Heart Icon */}
        <Heart
          className={cn(
            classes.icon,
            "text-white fill-current animate-pulse"
          )}
        />
        
        {/* Small gift indicator */}
        <div
          className={cn(
            "absolute -bottom-1 -right-1 rounded-full bg-white shadow-md",
            size === "sm" ? "p-0.5" : "p-1"
          )}
        >
          <Gift
            className={cn(
              size === "sm" ? "h-2.5 w-2.5" : "h-3 w-3",
              mode === "couple" ? "text-red-500" : "text-purple-500"
            )}
          />
        </div>
      </div>

      {/* Logo Text */}
      {showText && (
        <div className="flex flex-col">
          <span
            className={cn(
              "font-bold tracking-tight transition-colors duration-500",
              classes.text,
              mode === "couple" ? "text-gray-900" : "text-white"
            )}
          >
            ComfortValley
          </span>
          <span
            className={cn(
              "text-xs font-medium transition-colors duration-500",
              mode === "couple" ? "text-red-500" : "text-purple-400"
            )}
          >
            {mode === "couple" ? "Gift Comfort" : "Be Your Own Bae"}
          </span>
        </div>
      )}
    </div>
  );
}

/**
 * Simple Logo Icon only (for favicon-style usage)
 */
export function LogoIcon({ mode, className }: { mode: Mode; className?: string }) {
  return (
    <div
      className={cn(
        "relative flex items-center justify-center rounded-xl",
        mode === "couple"
          ? "bg-gradient-to-br from-red-500 to-rose-500"
          : "bg-gradient-to-br from-purple-500 to-pink-500",
        className
      )}
    >
      <Heart className="h-full w-full p-1.5 text-white fill-current" />
    </div>
  );
}
