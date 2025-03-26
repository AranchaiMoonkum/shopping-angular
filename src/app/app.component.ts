import { Component, OnInit } from "@angular/core"
import { ApiService } from "./services/api.service"

@Component({
    standalone: false,
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrl: "./app.component.scss"
})

export class AppComponent implements OnInit {
    // get products
    products: any[] = []

    // filter and sort products
    filteredProducts: any[] = []

    // filter and sort options
    categories: string[] = ["men's clothing", "jewelery", "electronics", "women's clothing"]
    selectedCategory: string = "all"
    selectedSort: string = "none"

    constructor(private apiService: ApiService) { }

    ngOnInit(): void {
        this.fetchProducts()
    }

    fetchProducts() {
        this.apiService.getProducts().subscribe((data: any[]) => {
            this.products = data
            this.applyFilters()
        })
    }

    filterProducts(category: string) {
        this.selectedCategory = category
        this.applyFilters()
    }

    sortProducts(sortType: string) {
        this.selectedSort = sortType
        this.applyFilters()
    }

    applyFilters() {
        let filtered = [...this.products]

        // apply category filter
        if (this.selectedCategory !== "all") {
            filtered = filtered.filter(product => product.category === this.selectedCategory)
        }

        // apply sort filter
        if (this.selectedSort === "price-low-to-high") {
            filtered.sort((a, b) => a.price - b.price)
        } else if (this.selectedSort === "price-high-to-low") {
            filtered.sort((a, b) => b.price - a.price)
        } else if (this.selectedSort === "rating-low-to-high") {
            filtered.sort((a, b) => a.rating.rate - b.rating.rate);
        } else if (this.selectedSort === "rating-high-to-low") {
            filtered.sort((a, b) => b.rating.rate - a.rating.rate);
        }

        this.filteredProducts = filtered
    }

    // convert rating to percentage
    getStarPercentage(rating: number): string {
        return `${(rating / 5) * 100}%`
    }
}
