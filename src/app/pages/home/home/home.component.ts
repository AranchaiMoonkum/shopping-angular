import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core"
import { ProductService } from "../../../services/product.service"
import { Product } from "../../../types/interface"
import { Observable } from "rxjs"
import { CartService } from "../../../services/cart.service"
import { Sort } from "../../../types/types"

@Component({
    selector: "app-home",
    templateUrl: "./home.component.html",
    styleUrl: "./home.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
    filterProducts$: Observable<Product[]> =
        this.productService.getFilteredProducts()

    selectedCategory: string = "all"
    selectedSort: Sort = "none"

    // categories is an array of strings
    categories: string[] = [
        "men's clothing",
        "jewelery",
        "electronics",
        "women's clothing",
    ]

    // the constructor injects the ProductService to fetch products data
    constructor(
        private productService: ProductService,
        private cartService: CartService
    ) {}

    // filter and sort products based on category and sort option
    filterAndSortProducts(filters: { category: string; sort: Sort }): void {
        this.selectedCategory = filters.category
        this.selectedSort = filters.sort
        this.productService.setSortAndFilter(filters.category, filters.sort)
    }

    // update the quantity of the product in the cart
    handleUpdateCart({
        product,
        quantity,
    }: {
        product: Product
        quantity: number
    }) {
        this.cartService.updateProductQuantity(product, quantity)
    }
}
