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

    updateQuantity(product: Product, quantity: number) {
        // check if quantity is a number and greater than 0
        if (quantity < 1 || isNaN(quantity)) {
            this.removeProductFromCart(product)
        }

        this.cartService.updateProductQuantity(product, quantity)
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
