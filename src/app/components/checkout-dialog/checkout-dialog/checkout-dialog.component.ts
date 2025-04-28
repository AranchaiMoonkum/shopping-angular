import { Component, inject, OnInit } from "@angular/core"
import { MatDialogRef } from "@angular/material/dialog"
import { Product } from "../../../types/interface"
import { CartService } from "../../../services/cart.service"
import { MatSnackBar } from "@angular/material/snack-bar"
import { Observable } from "rxjs"

/**
 * Dialog component for shopping cart checkout functionality.
 * Displays cart contents, allows quantity adjustments, and handles checkout process.
 * 
 * Features:
 * - Displays list of products in cart with quantities and prices
 * - Allows updating quantities or removing products
 * - Calculates and displays total price
 * - Provides checkout functionality with validation
 * - Returns updated cart contents when closed
 */
@Component({
    standalone: false,
    selector: "app-checkout-dialog",
    templateUrl: "./checkout-dialog.component.html",
    styleUrls: ["./checkout-dialog.component.scss"],
})
export class CheckoutDialogComponent implements OnInit {
    /** Observable of products currently in the cart */
    cart$!: Observable<Product[]>

    /** Observable of the calculated total price of all items in cart */
    totalPrice$!: Observable<number>

    /** Reference to the dialog, used for closing and passing data back */
    readonly dialogRef = inject(MatDialogRef<CheckoutDialogComponent>)

    /**
     * @param cartService Service for managing cart operations
     * @param _snackBar Service for displaying notification messages
     */
    constructor(
        private readonly cartService: CartService,
        private readonly _snackBar: MatSnackBar
    ) {}

    /**
     * Initializes the component by subscribing to the cart and total price observables
     */
    ngOnInit(): void {
        this.cart$ = this.cartService.getCart()
        this.totalPrice$ = this.cartService.totalPrice$
    }

    /**
     * Gets the quantity of a specific product in the cart
     * 
     * @param product The product to check quantity for
     * @returns Current quantity of the product in cart
     */
    getProductQuantity(product: Product): number {
        return this.cartService.getProductQuantity(product)
    }

    /**
     * Updates the quantity of a product in the cart
     * 
     * @param product The product to update
     * @param newQuantity  The new quantity to set
     */
    updateQuantity(product: Product, newQuantity: number) {
        this.cartService.updateProductQuantity(product, newQuantity)
    }

    /**
     * Removes a product from the cart and shows a notification
     * 
     * @param product The product to remove from cart
     */
    removeOnClick(product: Product): void {
        this.cartService.removeProductFromCart(product)

        this._snackBar.open("Product was removed from cart", "Close", {
            duration: 2000,
        })
    }

    /**
     * Handles the checkout process
     * - Validates that cart is not empty
     * - Shows appropriate notification based on result
     */
    checkoutCart(): void {
        // If cart is empty, show error message
        if (this.cartService.isEmptyCart()) {
            this._snackBar.open(
                "Cart is empty, please add products to your cart",
                "Buy something",
                {
                    duration: 2000,
                }
            )
        } else {
            this._snackBar.open("Checkout successful", "Close", {
                duration: 2000,
            })
        }
    }

    /**
     * Closes the dialog and passes the current cart items back to the caller
     * This allows the parent component to track which products were modified
     */
    onClose(): void {
        const currentProducts = this.cartService.getCartValue()
        this.dialogRef.close(currentProducts)
    }
}
