"use client";

// Assignment 2: Footer Component

import { Mode } from "@/types/product";
import { Logo } from "./Logo";
import { cn } from "@/lib/utils";

interface FooterProps {
  mode: Mode;
}

/**
 * Footer Component
 * 
 * Simple footer with:
 * - Brand logo
 * - Navigation links
 * - Copyright
 * - Theme-aware styling
 */
export function Footer({ mode }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={cn(
        "py-12 transition-all duration-500",
        mode === "couple" ? "bg-gray-900 text-white" : "bg-black text-gray-300"
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          {/* Brand Logo */}
          <Logo mode={mode} size="md" />

          {/* Links */}
          <div className="flex gap-8">
            <a
              href="#"
              className={cn(
                "text-sm transition-colors",
                mode === "couple"
                  ? "text-gray-400 hover:text-white"
                  : "text-gray-500 hover:text-gray-300"
              )}
            >
              About
            </a>
            <a
              href="#"
              className={cn(
                "text-sm transition-colors",
                mode === "couple"
                  ? "text-gray-400 hover:text-white"
                  : "text-gray-500 hover:text-gray-300"
              )}
            >
              Contact
            </a>
            <a
              href="#"
              className={cn(
                "text-sm transition-colors",
                mode === "couple"
                  ? "text-gray-400 hover:text-white"
                  : "text-gray-500 hover:text-gray-300"
              )}
            >
              Privacy
            </a>
            <a
              href="#"
              className={cn(
                "text-sm transition-colors",
                mode === "couple"
                  ? "text-gray-400 hover:text-white"
                  : "text-gray-500 hover:text-gray-300"
              )}
            >
              Terms
            </a>
          </div>

          {/* Copyright */}
          <p
            className={cn(
              "text-sm",
              mode === "couple" ? "text-gray-500" : "text-gray-600"
            )}
          >
            © {currentYear} ComfortValley. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
