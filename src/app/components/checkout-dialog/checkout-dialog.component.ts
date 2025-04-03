import { CommonModule } from "@angular/common"
import { Component, OnInit } from "@angular/core"

import {
    MatDialogModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogRef,
} from "@angular/material/dialog"
import { Product } from "../../types/interface"
import { MatButtonModule } from "@angular/material/button"
import { CartService } from "../../services/cart.service"
import { FormsModule } from "@angular/forms"
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar"
import { MatIconModule } from "@angular/material/icon"
import { MatTooltipModule } from "@angular/material/tooltip"
import { Observable } from "rxjs"
import { UpdateQuantityModule } from "../update-quantity/update-quantity.module"

@Component({
    standalone: true,
    selector: "app-checkout-dialog",
    templateUrl: "./checkout-dialog.component.html",
    styleUrl: "./checkout-dialog.component.scss",
    imports: [
        CommonModule,
        MatDialogModule,
        MatDialogTitle,
        MatDialogContent,
        MatButtonModule,
        FormsModule,
        MatSnackBarModule,
        MatIconModule,
        MatTooltipModule,
        UpdateQuantityModule,
    ],
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
