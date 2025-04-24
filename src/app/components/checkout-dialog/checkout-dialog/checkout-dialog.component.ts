import { Component, inject, OnInit } from "@angular/core"
import { MatDialogRef } from "@angular/material/dialog"
import { Product } from "../../../types/interface"
import { CartService } from "../../../services/cart.service"
import { MatSnackBar } from "@angular/material/snack-bar"
import { Observable } from "rxjs"

@Component({
    standalone: false,
    selector: "app-checkout-dialog",
    templateUrl: "./checkout-dialog.component.html",
    styleUrl: "./checkout-dialog.component.scss",
})
export class CheckoutDialogComponent implements OnInit {
    cart$!: Observable<Product[]>
    totalPrice$!: Observable<number>

    readonly dialogRef = inject(MatDialogRef<CheckoutDialogComponent>)

    constructor(
        private readonly cartService: CartService,
        private readonly _snackBar: MatSnackBar
    ) {}

    ngOnInit(): void {
        this.cart$ = this.cartService.getCart()
        this.totalPrice$ = this.cartService.totalPrice$
    }

    updateQuantity(product: Product, newQuantity: number) {
        this.cartService.updateProductQuantity(product, newQuantity)
    }

    removeOnClick(product: Product) {
        this.cartService.removeProductFromCart(product)

        this._snackBar.open("Product was removed from cart", "Close", {
            duration: 2000,
        })
    }

    checkoutCart() {
        // if cart is empty, show error message
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

    onClose() {
        this.dialogRef.close()
    }
}
