import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from "@angular/core"
import { Product } from "../../../types/interface"
import { ProductService } from "../../../services/product.service"
import { CartService } from "../../../services/cart.service"
import { Subscription } from "rxjs"

/**
 * Component that displays a single product card with interactive controls.
 * Features include:
 * - Product image and details display
 * - Ratings visualization with star display
 * - Quantity controls for adding to cart
 * - OnPush change detection for better performance
 * - Selective updates when cart quantities change
 */
@Component({
    selector: "app-card-product",
    templateUrl: "./card-product.component.html",
    styleUrls: ["./card-product.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardProductComponent implements OnInit, OnDestroy {
    /** The product data to be displayed in this card */
    @Input() product!: Product

    /** Manages all subscriptions for proper cleanup */
    private readonly subscriptions = new Subscription()

    /**
     * 
     * @param productService Service for accessing product data and utilities
     * @param cartService Service for managing cart operations
     * @param cdr ChangeDetectorRef for manually triggering change detection
     */
    constructor(
        private readonly productService: ProductService,
        private readonly cartService: CartService,
        private readonly cdr: ChangeDetectorRef,
    ) {}

    /**
     * Sets up subscription to cart update notifications
     * Only triggers change detection when this product's quantity changes
     */
    ngOnInit(): void {
        this.subscriptions.add(
            this.cartService.refreshCart$.subscribe((changedProductIds: number[]) => {
                // Only update this component if its product was changed
                if (changedProductIds.length === 0 || changedProductIds.includes(this.product.id)) {
                    this.cdr.markForCheck()
                }
            })
        )
    }

    /**
     * Cleans up subscriptions when component is destroyed
     */
    ngOnDestroy(): void {
        this.subscriptions.unsubscribe()
    }

    /**
     * Calculates with width percentage for star rating display
     * Converts a 0 - 5 rating scale to a 0 - 100% CSS width
     * 
     * @param rate The product rating on a scale of 0 - 5
     * @returns A CSS percentage string for styling star ratings
     */
    getStarPercentage(rate: number): string {
        return `${(rate / 5) * 100}%`
    }

    /**
     * Gets the current quantity of the product in the cart
     * Used for displaying when product data was last updated
     * 
     * @returns Current timestamp number
     */
    getTimeStamp(): number {
        return this.productService.getTimeStamp()
    }

    /**
     * Gets the quantity of this product in the shopping cart 
     * 
     * @param product The product to check quantity for
     * @returns Current quantity of the product in cart
     */
    getProductQuantity(product: Product): number {
        return this.cartService.getProductQuantity(product)
    }

    /**
     * Handles quantity change events from the quantity control component
     * Updates the product quantity in the cart
     * 
     * @param quantity The new quantity to set for this product
     */
    onQuantityChange(quantity: number): void {
        this.cartService.updateProductQuantity(this.product, quantity)
    }
}
