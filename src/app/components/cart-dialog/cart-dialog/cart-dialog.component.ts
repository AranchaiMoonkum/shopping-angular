import { Component, OnInit } from "@angular/core"
import { CartService } from "../../../services/cart.service"
import { MatDialog } from "@angular/material/dialog"
import { CartItem } from "../../../types/interface"
import { CheckoutDialogComponent } from "../../checkout-dialog/checkout-dialog.component"

@Component({
    standalone: false,
    selector: "app-cart-dialog",
    templateUrl: "./cart-dialog.component.html",
    styleUrl: "./cart-dialog.component.scss",
})
export class CartDialogComponent implements OnInit {
    cartCount: number = 0
    totalPrice: number = 0
    cartItems: CartItem[] = []

    constructor(private cartService: CartService, public dialog: MatDialog) {}

    ngOnInit(): void {
        this.cartService.cart$.subscribe((item) => {
            this.cartItems = item
        })

        this.cartService.cartQuan$.subscribe((quan) => {
            this.cartCount = quan
        })

        this.cartService.cartTotalPrice$.subscribe((price) => {
            this.totalPrice = price
        })
    }

    openDialog() {
        this.dialog.open(CheckoutDialogComponent, {
            width: "600px",
            height: "600px",
            data: {
                cartItems: this.cartItems,
                totalPrice: this.totalPrice,
            },
        })
    }
}
