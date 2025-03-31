import { Component, Inject } from "@angular/core"

import {
    MatDialogModule,
    MatDialogTitle,
    MatDialogContent,
    MAT_DIALOG_DATA,
    MatDialogRef,
} from "@angular/material/dialog"
import { CartItem } from "../../types/interface"

@Component({
    standalone: true,
    selector: "app-checkout-dialog",
    templateUrl: "./checkout-dialog.component.html",
    styleUrl: "./checkout-dialog.component.scss",
    imports: [MatDialogModule, MatDialogTitle, MatDialogContent],
})
export class CheckoutDialogComponent {
    cartItems: CartItem[] = []

    constructor(
        public dialogRef: MatDialogRef<CheckoutDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { cartItems: CartItem[] }
    ) {
        this.cartItems = data.cartItems
    }

    onClose() {
        this.dialogRef.close()
    }
}
