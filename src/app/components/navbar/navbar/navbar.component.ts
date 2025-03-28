import { Component, OnInit } from "@angular/core"
import { CartService } from "../../../services/cart.service"

@Component({
    standalone: false,
    selector: "app-navbar",
    templateUrl: "./navbar.component.html",
    styleUrl: "./navbar.component.scss",
})
export class NavbarComponent implements OnInit {
    showFiller = false
    cartItems: any[] = []
    cartCount: number = 0

    constructor(private cartService: CartService) {}

    ngOnInit(): void {
        this.cartItems = this.cartService.getCartItems()

        this.cartService.cartCount$.subscribe((count) => {
            this.cartCount = count
        })
    }
}
