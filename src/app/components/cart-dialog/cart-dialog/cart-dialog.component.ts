import { Component, OnInit } from "@angular/core"
import { CartService } from "../../../services/cart.service"
import { MatDialog } from "@angular/material/dialog"
import { CartItem } from "../../../types/interface"

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
    }
}
