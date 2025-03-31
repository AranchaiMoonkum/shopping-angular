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
    ],
})
export class CheckoutDialogComponent implements OnInit {
    cartItems: CartItem[] = []
    totalPrice: number

    constructor(
        @Inject(MAT_DIALOG_DATA)
        public data: { cartItems: CartItem[]; totalPrice: number },
        private dialogRef: MatDialogRef<CheckoutDialogComponent>,
        private cartService: CartService
    ) {
        this.cartItems = data.cartItems
        this.totalPrice = data.totalPrice
    }

    ngOnInit(): void {
        this.cartService.cart$.subscribe((item) => {
            this.cartItems = item
        })

        this.cartService.cartTotalPrice$.subscribe((price) => {
            this.totalPrice = price
        })
    }

    updateQuantity(item: CartItem, change: number) {
        this.cartService.updateItemQuantity(item.id, change)
        this.totalPrice = this.cartService.getTotalPrice()
    }

    onClose() {
        this.dialogRef.close()
    }
}
