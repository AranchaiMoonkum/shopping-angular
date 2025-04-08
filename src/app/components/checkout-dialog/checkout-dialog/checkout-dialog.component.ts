import { Component, OnInit } from "@angular/core"

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

    constructor(
        private cartService: CartService,
        public dialogRef: MatDialogRef<CheckoutDialogComponent>,
        private _snackBar: MatSnackBar
    ) {}

    ngOnInit(): void {
        this.cart$ = this.cartService.getCart()
        this.totalPrice$ = this.cartService.totalPrice$
    }

    updateQuantity(product: Product, newQuantity: number) {
        this.cartService.updateProductQuantity(product, newQuantity)
    }

    removeProductFromCart(product: Product) {
        this.cartService.removeProductFromCart(product)
    }

    checkoutCart() {
        this._snackBar.open("Checkout successful", "Close", {
            duration: 2000,
        })
    }

    onClose() {
        this.dialogRef.close()
    }
}
