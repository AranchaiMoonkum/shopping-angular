import { Component } from "@angular/core"
import { ProductService } from "../../../services/product.service"
import { Product } from "../../../types/interface"
import { Observable } from "rxjs"

@Component({
    selector: "app-home",
    templateUrl: "./home.component.html",
    styleUrl: "./home.component.scss",
})
export class HomeComponent {
    // the constructor injects the ProductService to fetch products data
    constructor(private productService: ProductService) {}

    filterProducts$: Observable<Product[]> =
        this.productService.getFilteredProducts()

    selectedCategory: string = "all"
    selectedSort: "asc" | "desc" | "none" = "none"

    // categories is an array of strings
    categories: string[] = [
        "men's clothing",
        "jewelery",
        "electronics",
        "women's clothing",
    ]

    // filter and sort products based on category and sort option
    filterAndSortProducts(filters: {
        category: string
        sort: "asc" | "desc" | "none"
    }): void {
        this.selectedCategory = filters.category
        this.selectedSort = filters.sort
        this.productService.setSortAndFilter(filters.category, filters.sort)
    }
}
