"use client";

// Assignment 2: Hero Section Component
// Features both Couple Mode and Single Mode with smooth transitions
// Uses provided Shopify video banners

import { Mode } from "@/types/product";
import { ModeToggle } from "./ModeToggle";
import { cn } from "@/lib/utils";
import { Heart, Sparkles, ArrowRight } from "lucide-react";

interface HeroSectionProps {
  mode: Mode;
  onModeChange: (mode: Mode) => void;
}

// Video URLs from assignment requirements
const COUPLE_VIDEO_URL = "https://cdn.shopify.com/videos/c/o/v/c102dc6ee2be49fc9935403b43e413bb.mp4";
const SINGLE_VIDEO_URL = "https://cdn.shopify.com/videos/c/o/v/452bedba47694a96a7e5684c79a0eeb3.mp4";

/**
 * HeroSection Component
 * 
 * Couple Mode:
 * - Red/warm theme
 * - Headline: "This Valentine's Gift Comfort"
 * - Video: Couple imagery banner
 * 
 * Single Mode:
 * - Dark/black theme
 * - Headline: "Be Your Own Bae"
 * - Video: Solo character imagery banner
 * 
 * Transitions:
 * - Background gradient transition (700ms)
 * - Text color transitions
 * - Video crossfade effect
 */
export function HeroSection({ mode, onModeChange }: HeroSectionProps) {
  return (
    <section
      className={cn(
        "relative min-h-[90vh] overflow-hidden transition-all duration-700 ease-in-out",
        mode === "couple"
          ? "bg-gradient-to-br from-rose-50 via-red-50 to-pink-100"
          : "bg-gradient-to-br from-gray-900 via-gray-800 to-black"
      )}
    >
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden">
        {mode === "couple" ? (
          <>
            {/* Warm colored blobs for Couple Mode */}
            <div className="absolute -left-20 top-20 h-72 w-72 rounded-full bg-red-200/30 blur-3xl animate-pulse" />
            <div className="absolute right-10 top-40 h-96 w-96 rounded-full bg-pink-200/20 blur-3xl animate-pulse delay-1000" />
            <div className="absolute bottom-20 left-1/3 h-64 w-64 rounded-full bg-rose-200/25 blur-3xl animate-pulse delay-500" />
          </>
        ) : (
          <>
            {/* Dark colored blobs for Single Mode */}
            <div className="absolute -left-20 top-20 h-72 w-72 rounded-full bg-purple-900/20 blur-3xl animate-pulse" />
            <div className="absolute right-10 top-40 h-96 w-96 rounded-full bg-blue-900/15 blur-3xl animate-pulse delay-1000" />
            <div className="absolute bottom-20 left-1/3 h-64 w-64 rounded-full bg-gray-700/20 blur-3xl animate-pulse delay-500" />
          </>
        )}
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Mode Toggle Header */}
        <div className="mb-12 flex justify-center">
          <ModeToggle mode={mode} onModeChange={onModeChange} />
        </div>

        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Text Content - Left Side */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div
              className={cn(
                "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-500",
                mode === "couple"
                  ? "bg-red-100 text-red-700"
                  : "bg-gray-800 text-gray-300"
              )}
            >
              {mode === "couple" ? (
                <>
                  <Heart className="h-4 w-4 fill-current" />
                  <span>Valentine&apos;s Special</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  <span>Self-Love Edition</span>
                </>
              )}
            </div>

            {/* Main Headline */}
            <h1
              className={cn(
                "mt-6 text-4xl font-bold tracking-tight transition-all duration-500 sm:text-5xl lg:text-6xl",
                mode === "couple" ? "text-gray-900" : "text-white"
              )}
            >
              {mode === "couple" ? (
                <>
                  This Valentine&apos;s
                  <br />
                  <span className="bg-gradient-to-r from-red-500 to-rose-500 bg-clip-text text-transparent">
                    Gift Comfort
                  </span>
                </>
              ) : (
                <>
                  Be Your
                  <br />
                  <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Own Bae
                  </span>
                </>
              )}
            </h1>

            {/* Subheadline */}
            <p
              className={cn(
                "mt-6 text-lg transition-all duration-500",
                mode === "couple" ? "text-gray-600" : "text-gray-400"
              )}
            >
              {mode === "couple"
                ? "Show your love with gifts that bring comfort and joy. Curated essentials for couples who care."
                : "Treat yourself this Valentine's. Because self-love is the best love, and you deserve all the comfort."}
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
              <button
                className={cn(
                  "group flex items-center justify-center gap-2 rounded-full px-8 py-4 font-semibold transition-all duration-300",
                  mode === "couple"
                    ? "bg-gradient-to-r from-red-500 to-rose-500 text-white shadow-lg shadow-red-500/25 hover:shadow-xl hover:shadow-red-500/30 hover:scale-105"
                    : "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/30 hover:scale-105"
                )}
              >
                <span>Shop Now</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
              <button
                className={cn(
                  "rounded-full px-8 py-4 font-semibold transition-all duration-300 border-2",
                  mode === "couple"
                    ? "border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white"
                    : "border-gray-600 text-gray-300 hover:bg-gray-800 hover:border-gray-500"
                )}
              >
                View Collections
              </button>
            </div>
          </div>

          {/* Video Section - Right Side */}
          <div className="relative">
            <div
              className={cn(
                "relative aspect-square overflow-hidden rounded-3xl transition-all duration-700",
                mode === "couple"
                  ? "shadow-2xl shadow-red-500/20"
                  : "shadow-2xl shadow-purple-500/20"
              )}
            >
              {/* Video Element with key prop for re-render on mode change */}
              <video
                key={mode}
                autoPlay
                loop
                muted
                playsInline
                className="h-full w-full object-cover transition-all duration-700"
                poster={
                  mode === "couple"
                    ? "https://images.unsplash.com/photo-1518621736915-f3b1c41bfd08?w=800&h=800&fit=crop"
                    : "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=800&fit=crop"
                }
              >
                <source
                  src={mode === "couple" ? COUPLE_VIDEO_URL : SINGLE_VIDEO_URL}
                  type="video/mp4"
                />
              </video>

              {/* Video Overlay Gradient */}
              <div
                className={cn(
                  "absolute inset-0 bg-gradient-to-t transition-opacity duration-500",
                  mode === "couple"
                    ? "from-red-900/20 to-transparent"
                    : "from-black/30 to-transparent"
                )}
              />
            </div>

            {/* Floating Badge */}
            <div
              className={cn(
                "absolute -bottom-6 -left-6 flex items-center gap-3 rounded-2xl p-4 shadow-xl transition-all duration-500",
                mode === "couple" ? "bg-white text-gray-900" : "bg-gray-800 text-white"
              )}
            >
              <div
                className={cn(
                  "flex h-12 w-12 items-center justify-center rounded-full",
                  mode === "couple" ? "bg-red-100" : "bg-gray-700"
                )}
              >
                {mode === "couple" ? (
                  <Heart className="h-6 w-6 text-red-500 fill-current" />
                ) : (
                  <Sparkles className="h-6 w-6 text-purple-400" />
                )}
              </div>
              <div>
                <p className="text-sm font-medium opacity-70">
                  {mode === "couple" ? "Perfect for Two" : "Treat Yourself"}
                </p>
                <p className="font-bold">
                  {mode === "couple" ? "Starting at $29" : "Up to 50% Off"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
