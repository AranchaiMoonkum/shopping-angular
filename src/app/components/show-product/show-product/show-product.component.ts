import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
} from "@angular/core"
import { Product, ProductFilters } from "../../../types/interface"
import { CartService } from "../../../services/cart.service"
import { Subject, takeUntil, interval, Subscription } from "rxjs"
import { ActivatedRoute } from "@angular/router"
import { ApiService } from "../../../services/api.service"

/**
 * Component for displaying and managing a dynamic product catalog.
 *
 * Features:
 * - Product filtering by category and search text
 * - Sorting by price (ascending/descending) and name (A-Z/Z-A)
 * - Real-time cart quantity updates with optimized rendering
 * - Selective updates of only changed products for performance
 * - Periodic data fetching with error handling
 *
 * Uses OnPush change detection strategy to minimize DOM updates.
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

    /** Track if there was an error loading products */
    hasError: boolean = false

    /** Controls whether auto-refresh is active */
    isAutoRefreshing: boolean = false

    /** Stores the interval subscription for cleanup */
    private refreshSubscription?: Subscription

    /** Subject to handle unsubscribing from all observables */
    private readonly destroy$ = new Subject<void>()

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
     * @param route Route with resolved data
     * @param cartService Service for managing cart operations
     * @param cdr Reference to the change detector for manual change detection triggering
     * @param apiService Service for fetching product data from API
     */
    constructor(
        private readonly route: ActivatedRoute,
        private readonly cartService: CartService,
        private readonly cdr: ChangeDetectorRef,
        private readonly apiService: ApiService
    ) {}

    /**
     * Initializes component by loading products and setting up subscriptions
     * - Loading product data from route resolver
     * - Setting up initial product display
     * - Extracting unique product categories
     * - Subscribing to cart update notifications
     */
    ngOnInit(): void {
        // Get pre-loaded product data from resolver
        this.route.data.pipe(takeUntil(this.destroy$)).subscribe((data) => {
            const productsData = data["products"]
            this.products = productsData.products
            this.hasError = productsData.hasError
            this.productsDisplay = this.products

            // Extract unique categories with "all" as first option
            this.categories = [
                "all",
                ...new Set(this.products.map((p) => p.category)),
            ]

            this.cdr.markForCheck()
        })

        this.cartService.refreshCart$
            .pipe(takeUntil(this.destroy$))
            .subscribe((changedProductIds: number[]) => {
                this.updateProductQuantitiesSelectively(changedProductIds)
                this.cdr.markForCheck()
            })
    }

    /**
     * Cleanup by emitting to the destroy subject
     */
    ngOnDestroy(): void {
        if (this.refreshSubscription) {
            this.refreshSubscription.unsubscribe()
        }

        this.destroy$.next()
        this.destroy$.complete()
    }

    /**
     * Start auto-refreshing data every 5 seconds
     */
    startAutoRefresh(): void {
        if (this.isAutoRefreshing) return

        this.isAutoRefreshing = true
        this.refreshSubscription = interval(5000)
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
                this.fetchProducts()
            })

        // Fetch immediately when button is clicked
        this.fetchProducts()
        this.cdr.markForCheck()
    }

    /**
     * Fetch product data from API
     */
    fetchProducts(): void {
        this.apiService
            .getProducts()
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (data) => {
                    this.products = data.products
                    this.hasError = false
                    this.productsDisplay = this.products

                    // Update categories
                    this.categories = [
                        "all",
                        ...new Set(this.products.map((p) => p.category)),
                    ]

                    this.cdr.markForCheck()
                },
                error: (err) => {
                    console.error("Error fetching products:", err)
                    this.products = []
                    this.productsDisplay = []
                    this.hasError = true
                    this.cdr.markForCheck()
                },
            })
    }

    /**
     * Updates only products that changed in the cart without full array recreation.
     * Creates new references only for modified products to trigger OnPush detection.
     *
     * @param productIds Array of product IDs that were modified in the cart
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
        const productLookup = new Map(
            this.products.map((product) => [product.id, product])
        )
        this.productsDisplay = this.productsDisplay.map(
            (product) => productLookup.get(product.id) || product
        )
    }

    /**
     * Track function for ngFor directive to improve performance
     * Angular uses this to minimize DOM operations when the product list changes.
     *
     * @param index Position in the array (unused but required by ngFor)
     * @param product Product object
     * @returns The product's unique identifier
     */
    trackById(index: number, product: Product) {
        return product.id
    }

    /**
     * Processes filter changes from the filter component and updates display.
     * Applies filters in sequence:
     * - Category filtering
     * - Sorting by selected criteria
     * - Text search filtering (case-insensitive)
     *
     * @param filters Object containing category, sort option, and search term
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

        this.cdr.markForCheck()
    }
}
