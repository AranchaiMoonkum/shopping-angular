import { CommonModule } from "@angular/common"
import { Component, Inject, OnInit } from "@angular/core"

import {
    MatDialogModule,
    MatDialogTitle,
    MatDialogContent,
    MAT_DIALOG_DATA,
    MatDialogRef,
} from "@angular/material/dialog"
import { CartItem } from "../../types/interface"
import { MatButtonModule } from "@angular/material/button"
import { CartService } from "../../services/cart.service"
import { FormsModule } from "@angular/forms"
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar"
import { MatIconModule } from "@angular/material/icon"
import { MatTooltipModule } from "@angular/material/tooltip"

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
    cartItems: (CartItem & { quantityChange: number })[] = []
    totalPrice: number

    constructor(
        @Inject(MAT_DIALOG_DATA)
        public data: { cartItems: CartItem[]; totalPrice: number },
        private dialogRef: MatDialogRef<CheckoutDialogComponent>,
        private cartService: CartService,
        private _snackBar: MatSnackBar
    ) {
        this.cartItems = data.cartItems.map((item) => ({
            ...item,
            quantityChange: 1,
        }))
        this.totalPrice = data.totalPrice
    }

    ngOnInit(): void {
        this.cartService.cart$.subscribe((item) => {
            this.cartItems = item.map((item) => ({
                ...item,
                quantityChange: 1,
            }))
        })

        this.cartService.cartTotalPrice$.subscribe((price) => {
            this.totalPrice = price
        })
    }

    updateQuantity(item: CartItem, change: number): void {
        const maximumQuantity = 99

        if (change < 1) {
            this._snackBar.open("Removed product from the cart", "Close", {
                duration: 2000,
            })
        }

        if (change >= maximumQuantity) {
            change = maximumQuantity

            this._snackBar.open("Maximum quantity is 99", "Close", {
                duration: 2000,
            })
        }
        this.cartService.updateItemQuantity(item.id, change)
        this.totalPrice = this.cartService.getTotalPrice()
    }

    onClose(): void {
        this.dialogRef.close()
    }

    checkoutItem(): void {
        this._snackBar.open("Checkout successful!", "Close", {
            duration: 2000,
        })
    }

    onDelete(item: CartItem): void {
        this.cartService.updateItemQuantity(item.id, 0)
        this.cartItems = this.cartItems.filter((i) => i.id !== item.id)
        this.totalPrice = this.cartService.getTotalPrice()

        this._snackBar.open("Removed product from the cart", "Close", {
            duration: 2000,
        })
    }
}
