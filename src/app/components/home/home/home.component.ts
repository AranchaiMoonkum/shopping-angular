import { Component, OnInit } from "@angular/core"
import { ActivatedRoute } from "@angular/router"
import { CartService } from "../../../services/cart.service"

@Component({
    standalone: false,
    selector: "app-home",
    templateUrl: "./home.component.html",
    styleUrl: "./home.component.scss",
})
export class HomeComponent implements OnInit {
    products: any[] = []
    filteredProducts: any[] = []

    // filter and sort options
    categories: string[] = [
        "men's clothing",
        "jewelery",
        "electronics",
        "women's clothing",
    ]

    constructor(
        private route: ActivatedRoute,
        private cartService: CartService
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
        this.cartService.addToCart(product)
    }
}
