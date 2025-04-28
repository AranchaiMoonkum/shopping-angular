import { ProductService } from "./../../../services/product.service"
import {
    ChangeDetectionStrategy,
    Component,
    OnDestroy,
    OnInit,
} from "@angular/core"
import { Product, ProductFilters } from "../../../types/interface"
import { ApiService } from "../../../services/api.service"
import { CartService } from "../../../services/cart.service"
import { Subscription } from "rxjs"

/**
 * Component that displays a filterable, sortable product catalog.
 * Features include:
 * - Product filtering by category and search term
 * - Multiple sorting options (price, name)
 * - Real-time cart quantity updates
 * - OnPush change detection for better performance
 */
@Component({
    selector: "app-show-product",
    templateUrl: "./show-product.component.html",
    styleUrls: ["./show-product.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShowProductComponent implements OnInit, OnDestroy {
    /** Master list of all products retrieved from API */
    products: Product[] = []

    /** Filtered/sorted subset of products currently displayed */
    productsDisplay: Product[] = []

    /** Available product categories for filtering */
    categories: string[] = []

    /** Currently selected category filter */
    selectedCategory: string = "all"

    /** Collection of all subscriptions for proper cleanup */
    private readonly subscriptions = new Subscription()

    /**
     * Map of sort functions for different sort options
     * Each function compares two products and returns a number indicating order
     */    
    private readonly sortFunctions = {
        none: () => 0,
        "price-asc": (a: Product, b: Product) => a.price - b.price,
        "price-desc": (a: Product, b: Product) => b.price - a.price,
        "name-asc": (a: Product, b: Product) => a.title.localeCompare(b.title),
        "name-desc": (a: Product, b: Product) => b.title.localeCompare(a.title),
    }

    /**
     * @param apiService Service for fetching product data
     * @param productService Service for storing shared product state
     * @param cartService Service for managing cart operations
     */
    constructor(
        private readonly apiService: ApiService,
        private readonly productService: ProductService,
        private readonly cartService: CartService
    ) {}

    /**
     * Initializes component by loading products and setting up subscriptions
     * - Fetches products from API
     * - Extracts unique categories
     * - Sets up cart update listener
     */
    ngOnInit(): void {
        this.subscriptions.add(
            this.apiService.getProducts().subscribe({
                next: (data: { products: Product[] }) => {
                    this.productService.setProducts(data.products)
                    this.products = data.products
                    this.productsDisplay = this.products

                    // Extract unique categories with "all" as first option
                    this.categories = [
                        "all",
                        ...new Set(this.products.map((p) => p.category)),
                    ]
                },
                error: (err) => {
                    console.error("Error fetching products:", err)
                },
            })
        )

        // Listen for cart updates to refresh product quantities
        this.subscriptions.add(
            this.cartService.refreshCart$.subscribe(
                (changedProductIds: number[]) => {
                    this.updateProductQuantitiesSelectively(changedProductIds)
                }
            )
        )
    }

    /**
     * Cleanup subscriptions when component is destroyed
     */
    ngOnDestroy(): void {
        this.subscriptions.unsubscribe()
    }

    /**
     * Updates quantity properties for specific products that changed in cart
     * Creates new object references for OnPush change detection
     * 
     * @param productIds IDs of products whose quantities changed
     */
    updateProductQuantitiesSelectively(productIds: number[]): void {
        this.products = this.products.map((product) => {
            if (productIds.includes(product.id)) {
                return {
                    ...product,
                    quantity: this.cartService.getProductQuantity(product),
                }
            }
            return product
        })

        // Update displayed products efficiently with a lookup
        const productLookup = new Map(this.products.map((product) => [product.id, product]))
        this.productsDisplay = this.productsDisplay.map(
            (product) => productLookup.get(product.id) || product
        )
    }

    /**
     * Track function for ngFor directive to improve performance
     * Uses product ID for identity tracking
     * 
     * @param index Index of the item in the array
     * @param product Product object being tracked
     * @returns Unique identifier for the product
     */
    trackById(index: number, product: Product) {
        return product.id
    }

    /**
     * Handles filter changes from the filter component
     * - Filters by category
     * - Applies sorting
     * - Filters by search term
     * 
     * @param filters Object containing category, sort, and search criteria
     */
    onFilterChange(filters: ProductFilters): void {
        // Apply category filter
        if (filters.category === "all") {
            this.productsDisplay = [...this.products]
        } else {
            this.productsDisplay = this.products.filter(
                (product) => product.category === filters.category
            )
        }

        // Apply sorting
        const sortFn =
            this.sortFunctions[filters.sort as keyof typeof this.sortFunctions]
        if (sortFn) {
            this.productsDisplay.sort(sortFn)
        }

        // Apply search filter (case insensitive)
        if (filters.search) {
            this.productsDisplay = this.productsDisplay.filter((product) =>
                product.title
                    .toLowerCase()
                    .includes(filters.search.toLowerCase())
            )
        }
    }
}
