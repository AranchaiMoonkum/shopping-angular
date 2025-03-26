import { Component, OnInit } from "@angular/core"
import { ActivatedRoute } from "@angular/router"

@Component({
    standalone: false,
    selector: "app-home",
    templateUrl: "./home.component.html",
    styleUrl: "./home.component.scss"
})

export class HomeComponent implements OnInit {
    products: any[] = []
    filteredProducts: any[] = []

    // filter and sort options
    categories: string[] = ["men's clothing", "jewelery", "electronics", "women's clothing"]
    selectedCategory: string = "all"
    selectedSort: string = "none"

    constructor(private route: ActivatedRoute) { }

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
