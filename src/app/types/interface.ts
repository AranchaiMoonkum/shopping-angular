/**
 * Represents a product item in the shopping application.
 * Contains all information needed to display and manage a product.
 */
export interface Product {
    /** Unique identifier for the product */
    id: number

    /** Product name or title */
    title: string

    /** Product price in currency units */
    price: number
    
    /** Detailed product description */
    description: string

    /** Product category for filtering and organization */
    category: string

    /** URL to the product image */
    image: string

    /** Product rating information */
    rating: {
        /** Average rating score from 0 - 5 */
        rate: number

        /** Number of ratings submitted */
        count: number
    }

    /** Quantity of this product in the shopping cart */
    quantity: number
}

/**
 * Represents a sort option for product listings.
 * Used in dropdown menus for sorting product displays.
 */
export interface Sort {
    /** The sort value used internally by the application */
    value: string

    /** User-friendly label displayed in the sort dropdown */
    label: string
}

/**
 * Collection of filter criteria for product listings.
 * Used to pass filter state between components.
 */
export interface ProductFilters { 
    /** Selected category filter (e.g., "all", "electronics", etc.) */
    category: string

    /** Selected sort option (e.g., "price-asc", "name-asc", etc.) */
    sort: string

    /** Search text for filtering products by name */
    search: string
}