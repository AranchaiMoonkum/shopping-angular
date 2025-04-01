import { Component, OnInit } from "@angular/core"
import { ActivatedRoute } from "@angular/router"
import { CartService } from "../../../services/cart.service"
import { MatSnackBar } from "@angular/material/snack-bar"
import { CartItem } from "../../../types/interface"

@Component({
    standalone: false,
    selector: "app-home",
    templateUrl: "./home.component.html",
    styleUrl: "./home.component.scss",
})
export class HomeComponent implements OnInit {
    products: any[] = []
    filteredProducts: any[] = []
    cartItem: CartItem[] = []

    // filter and sort options
    categories: string[] = [
        "men's clothing",
        "jewelery",
        "electronics",
        "women's clothing",
    ]

    constructor(
        private route: ActivatedRoute,
        private cartService: CartService,
        private _snackBar: MatSnackBar
    ) {}

    ngOnInit(): void {
        this.route.data.subscribe((data: any) => {
            if (Array.isArray(data["products"])) {
                this.products = data["products"]
                this.filteredProducts = [...this.products]
            } else {
                this.products = []
                this.filteredProducts = [...this.products]
            }
        })

        // subscribe to cart service to get the cart items
        this.cartService.cart$.subscribe((item) => {
            this.cartItem = item
        })
    }

    applyFilters(filters: { category: string; sort: string }) {
        let filtered = [...this.products]

        // apply category filter
        if (filters.category !== "all") {
            filtered = filtered.filter(
                (product) => product.category === filters.category
            )
        }

        // apply sort filter
        if (filters.sort === "price-low-to-high") {
            filtered.sort((a, b) => a.price - b.price)
        } else if (filters.sort === "price-high-to-low") {
            filtered.sort((a, b) => b.price - a.price)
        } else if (filters.sort === "rating-low-to-high") {
            filtered.sort((a, b) => a.rating.rate - b.rating.rate)
        } else if (filters.sort === "rating-high-to-low") {
            filtered.sort((a, b) => b.rating.rate - a.rating.rate)
        }

        this.filteredProducts = filtered
    }

    // convert rating to percentage
    getStarPercentage(rating: number): string {
        return `${(rating / 5) * 100}%`
    }

    addToCart(product: any) {
        this._snackBar.open("Added a product to cart now!", "Close", {
            duration: 2000,
        })

        this.cartService.addToCart(product)
    }

    // check if there is a product in the cart or not
    isItemInCart(productId: number): number {
        const products = this.cartItem.find((item) => item.id === productId)
        return products ? products.quantity : 0
    }
}
