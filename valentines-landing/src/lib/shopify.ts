// Assignment 2: Shopify Storefront API Integration
// Reference: https://shopify.dev/docs/api/storefront/latest/objects/Product
// Fetches products dynamically by tag for Category Filter Tabs

import { ShopifyProduct, ProductCardData } from "@/types/product";

// Environment variables for Shopify Storefront API
const STOREFRONT_API_URL = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_URL || "";
const STOREFRONT_ACCESS_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN || "";

// GraphQL query to fetch products by tag
// Supports: product image, name, original price, sale price, discount badge
const PRODUCTS_QUERY = `
  query GetProducts($first: Int!, $query: String) {
    products(first: $first, query: $query) {
      edges {
        node {
          id
          title
          description
          handle
          tags
          productType
          images(first: 1) {
            edges {
              node {
                url
                altText
              }
            }
          }
          variants(first: 1) {
            edges {
              node {
                id
                price {
                  amount
                  currencyCode
                }
                compareAtPrice {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      }
    }
  }
`;

/**
 * Fetches products from Shopify Storefront API by tag
 * Falls back to mock data if no credentials or API error
 * 
 * Requirements:
 * - Product image
 * - Product name  
 * - Original price
 * - Sale price
 * - Discount badge
 * - Add to Cart button (variantId)
 */
export async function fetchProductsByTag(tag: string): Promise<ProductCardData[]> {
  // Return mock data if Shopify credentials not configured (demo fallback)
  if (!STOREFRONT_API_URL || !STOREFRONT_ACCESS_TOKEN) {
    console.log("Using mock data - Shopify credentials not configured");
    return getMockProducts(tag);
  }

  try {
    const response = await fetch(STOREFRONT_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": STOREFRONT_ACCESS_TOKEN,
      },
      body: JSON.stringify({
        query: PRODUCTS_QUERY,
        variables: {
          first: 20,
          query: tag ? `tag:${tag}` : undefined,
        },
      }),
      next: { revalidate: 60 }, // Revalidate cache every 60 seconds
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const json = await response.json();
    const products: ShopifyProduct[] = json.data?.products?.edges.map(
      (edge: { node: ShopifyProduct }) => edge.node
    ) || [];

    return products.map(transformProductToCardData);
  } catch (error) {
    console.error("Error fetching products from Shopify:", error);
    return getMockProducts(tag); // Fallback to mock data on error
  }
}

/**
 * Transforms Shopify Product to ProductCardData format
 */
function transformProductToCardData(product: ShopifyProduct): ProductCardData {
  const variant = product.variants.edges[0]?.node;
  const price = variant?.price?.amount || "0";
  const compareAtPrice = variant?.compareAtPrice?.amount;

  // Calculate discount percentage
  let discount: number | undefined;
  if (compareAtPrice && parseFloat(compareAtPrice) > parseFloat(price)) {
    discount = Math.round(
      ((parseFloat(compareAtPrice) - parseFloat(price)) / parseFloat(compareAtPrice)) * 100
    );
  }

  return {
    id: product.id,
    title: product.title,
    handle: product.handle,
    image: product.images.edges[0]?.node?.url || "/placeholder-product.jpg",
    price: formatPrice(price, variant?.price?.currencyCode),
    originalPrice: compareAtPrice
      ? formatPrice(compareAtPrice, variant?.compareAtPrice?.currencyCode)
      : undefined,
    discount,
    tags: product.tags,
    variantId: variant?.id,
  };
}

/**
 * Formats price with currency symbol
 */
function formatPrice(amount: string, currencyCode: string = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode,
  }).format(parseFloat(amount));
}

// ============================================================================
// MOCK DATA - Used when Shopify credentials are not available
// Simulates products for all categories: Sleep, Travel, WFH, GYM, Mom, Dad, BFF, Kids
// ============================================================================

const MOCK_IMAGES = {
  sleep: [
    "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1580584126903-c17d41830450?w=400&h=400&fit=crop",
  ],
  travel: [
    "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=400&h=400&fit=crop",
  ],
  wfh: [
    "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop",
  ],
  gym: [
    "https://images.unsplash.com/photo-1600881333168-2ef49b341f30?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1576678927484-cc907957088c?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&h=400&fit=crop",
  ],
  mom: [
    "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&h=400&fit=crop",
  ],
  dad: [
    "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&h=400&fit=crop",
  ],
  bff: [
    "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&h=400&fit=crop",
  ],
  kids: [
    "https://images.unsplash.com/photo-1559454403-b8fb87521bc7?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=400&h=400&fit=crop",
  ],
};

function getMockProducts(tag: string): ProductCardData[] {
  const mockProductsByTag: Record<string, ProductCardData[]> = {
    // Couple Mode Categories
    sleep: [
      {
        id: "sleep-1",
        title: "Cloud Comfort Pillow",
        handle: "cloud-comfort-pillow",
        image: MOCK_IMAGES.sleep[0],
        price: "$49.99",
        originalPrice: "$79.99",
        discount: 38,
        tags: ["sleep", "valentines"],
        variantId: "variant-sleep-1",
      },
      {
        id: "sleep-2",
        title: "Silk Sleep Mask Set",
        handle: "silk-sleep-mask",
        image: MOCK_IMAGES.sleep[1],
        price: "$29.99",
        originalPrice: "$45.00",
        discount: 33,
        tags: ["sleep", "valentines"],
        variantId: "variant-sleep-2",
      },
      {
        id: "sleep-3",
        title: "Aromatherapy Diffuser",
        handle: "aromatherapy-diffuser",
        image: MOCK_IMAGES.sleep[2],
        price: "$39.99",
        tags: ["sleep", "valentines"],
        variantId: "variant-sleep-3",
      },
      {
        id: "sleep-4",
        title: "Weighted Blanket",
        handle: "weighted-blanket",
        image: MOCK_IMAGES.sleep[3],
        price: "$89.99",
        originalPrice: "$129.99",
        discount: 31,
        tags: ["sleep", "valentines"],
        variantId: "variant-sleep-4",
      },
    ],
    travel: [
      {
        id: "travel-1",
        title: "Neck Support Pillow",
        handle: "neck-support-pillow",
        image: MOCK_IMAGES.travel[0],
        price: "$34.99",
        originalPrice: "$49.99",
        discount: 30,
        tags: ["travel", "valentines"],
        variantId: "variant-travel-1",
      },
      {
        id: "travel-2",
        title: "Travel Comfort Kit",
        handle: "travel-comfort-kit",
        image: MOCK_IMAGES.travel[1],
        price: "$59.99",
        tags: ["travel", "valentines"],
        variantId: "variant-travel-2",
      },
      {
        id: "travel-3",
        title: "Portable Massager",
        handle: "portable-massager",
        image: MOCK_IMAGES.travel[2],
        price: "$44.99",
        originalPrice: "$69.99",
        discount: 36,
        tags: ["travel", "valentines"],
        variantId: "variant-travel-3",
      },
    ],
    wfh: [
      {
        id: "wfh-1",
        title: "Ergonomic Seat Cushion",
        handle: "ergonomic-cushion",
        image: MOCK_IMAGES.wfh[0],
        price: "$54.99",
        originalPrice: "$79.99",
        discount: 31,
        tags: ["wfh", "valentines"],
        variantId: "variant-wfh-1",
      },
      {
        id: "wfh-2",
        title: "Lumbar Support Pillow",
        handle: "lumbar-support",
        image: MOCK_IMAGES.wfh[1],
        price: "$39.99",
        tags: ["wfh", "valentines"],
        variantId: "variant-wfh-2",
      },
      {
        id: "wfh-3",
        title: "Foot Rest Cushion",
        handle: "foot-rest",
        image: MOCK_IMAGES.wfh[2],
        price: "$29.99",
        originalPrice: "$39.99",
        discount: 25,
        tags: ["wfh", "valentines"],
        variantId: "variant-wfh-3",
      },
    ],
    gym: [
      {
        id: "gym-1",
        title: "Foam Roller Set",
        handle: "foam-roller",
        image: MOCK_IMAGES.gym[0],
        price: "$24.99",
        originalPrice: "$34.99",
        discount: 29,
        tags: ["gym", "valentines"],
        variantId: "variant-gym-1",
      },
      {
        id: "gym-2",
        title: "Massage Gun Mini",
        handle: "massage-gun",
        image: MOCK_IMAGES.gym[1],
        price: "$79.99",
        originalPrice: "$119.99",
        discount: 33,
        tags: ["gym", "valentines"],
        variantId: "variant-gym-2",
      },
      {
        id: "gym-3",
        title: "Yoga Mat Premium",
        handle: "yoga-mat",
        image: MOCK_IMAGES.gym[2],
        price: "$49.99",
        tags: ["gym", "valentines"],
        variantId: "variant-gym-3",
      },
    ],
    // Single Mode Categories
    mom: [
      {
        id: "mom-1",
        title: "Heated Massage Pillow",
        handle: "heated-pillow",
        image: MOCK_IMAGES.mom[0],
        price: "$64.99",
        originalPrice: "$99.99",
        discount: 35,
        tags: ["mom", "valentines"],
        variantId: "variant-mom-1",
      },
      {
        id: "mom-2",
        title: "Relaxation Gift Set",
        handle: "relaxation-set",
        image: MOCK_IMAGES.mom[1],
        price: "$49.99",
        tags: ["mom", "valentines"],
        variantId: "variant-mom-2",
      },
    ],
    dad: [
      {
        id: "dad-1",
        title: "Shiatsu Back Massager",
        handle: "shiatsu-massager",
        image: MOCK_IMAGES.dad[0],
        price: "$89.99",
        originalPrice: "$139.99",
        discount: 36,
        tags: ["dad", "valentines"],
        variantId: "variant-dad-1",
      },
      {
        id: "dad-2",
        title: "Neck Traction Device",
        handle: "neck-traction",
        image: MOCK_IMAGES.dad[1],
        price: "$39.99",
        originalPrice: "$59.99",
        discount: 33,
        tags: ["dad", "valentines"],
        variantId: "variant-dad-2",
      },
    ],
    bff: [
      {
        id: "bff-1",
        title: "Matching Comfort Masks",
        handle: "matching-masks",
        image: MOCK_IMAGES.bff[0],
        price: "$34.99",
        originalPrice: "$49.99",
        discount: 30,
        tags: ["bff", "valentines"],
        variantId: "variant-bff-1",
      },
      {
        id: "bff-2",
        title: "BFF Spa Kit",
        handle: "bff-spa",
        image: MOCK_IMAGES.bff[1],
        price: "$44.99",
        tags: ["bff", "valentines"],
        variantId: "variant-bff-2",
      },
    ],
    kids: [
      {
        id: "kids-1",
        title: "Plush Animal Pillow",
        handle: "plush-pillow",
        image: MOCK_IMAGES.kids[0],
        price: "$24.99",
        originalPrice: "$34.99",
        discount: 29,
        tags: ["kids", "valentines"],
        variantId: "variant-kids-1",
      },
      {
        id: "kids-2",
        title: "Kids Sleep Set",
        handle: "kids-sleep",
        image: MOCK_IMAGES.kids[1],
        price: "$29.99",
        tags: ["kids", "valentines"],
        variantId: "variant-kids-2",
      },
    ],
  };

  return mockProductsByTag[tag] || mockProductsByTag["sleep"] || [];
}
