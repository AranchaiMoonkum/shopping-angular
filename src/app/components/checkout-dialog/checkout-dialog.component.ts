import { CommonModule } from "@angular/common"
import { Component, Inject } from "@angular/core"

import {
    MatDialogModule,
    MatDialogTitle,
    MatDialogContent,
    MAT_DIALOG_DATA,
    MatDialogRef,
} from "@angular/material/dialog"
import { CartItem } from "../../types/interface"
import { MatButtonModule } from "@angular/material/button"

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
export class CheckoutDialogComponent {
    cartItems: CartItem[] = []
    totalPrice: number

    constructor(
        public dialogRef: MatDialogRef<CheckoutDialogComponent>,
        @Inject(MAT_DIALOG_DATA)
        public data: { cartItems: CartItem[]; totalPrice: number }
    ) {
        this.cartItems = data.cartItems
        this.totalPrice = data.totalPrice
    }

    onClose() {
        this.dialogRef.close()
    }
}
