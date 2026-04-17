// Assignment 2: Valentine's Day Landing Page - Type Definitions
// These types support the Couple/Single mode toggle and Shopify Storefront API integration

export type Mode = "couple" | "single";

// Category definition for filter tabs
export interface Category {
  id: string;
  label: string;
  tag: string; // Shopify tag for filtering
}

// Categories for Couple Mode: Sleep, Travel, WFH, GYM
export const COUPLE_CATEGORIES: Category[] = [
  { id: "sleep", label: "Sleep", tag: "sleep" },
  { id: "travel", label: "Travel", tag: "travel" },
  { id: "wfh", label: "WFH", tag: "wfh" },
  { id: "gym", label: "GYM", tag: "gym" },
];

// Categories for Single Mode: Mom, Dad, BFF, Kids
export const SINGLE_CATEGORIES: Category[] = [
  { id: "mom", label: "Mom", tag: "mom" },
  { id: "dad", label: "Dad", tag: "dad" },
  { id: "bff", label: "BFF", tag: "bff" },
  { id: "kids", label: "Kids", tag: "kids" },
];

// Shopify Storefront API Product Response Structure
// Reference: https://shopify.dev/docs/api/storefront/latest/objects/Product
export interface ShopifyProduct {
  id: string;
  title: string;
  description: string;
  handle: string;
  tags: string[];
  productType: string;
  images: {
    edges: Array<{
      node: {
        url: string;
        altText: string | null;
      };
    }>;
  };
  variants: {
    edges: Array<{
      node: {
        id: string;
        price: {
          amount: string;
          currencyCode: string;
        };
        compareAtPrice?: {
          amount: string;
          currencyCode: string;
        } | null;
      };
    }>;
  };
}

// Simplified product data for Product Card component
// Requirements: product image, name, original price, sale price, discount badge, Add to Cart button
export interface ProductCardData {
  id: string;
  title: string;
  handle: string;
  image: string;
  price: string; // Sale price (formatted)
  originalPrice?: string; // Original price if on sale (formatted)
  discount?: number; // Discount percentage
  tags: string[];
  variantId?: string; // For Add to Cart functionality
}
