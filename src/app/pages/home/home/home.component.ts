import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core"
import { ProductService } from "../../../services/product.service"
import { Product } from "../../../types/interface"
import { Observable } from "rxjs"
import { CartService } from "../../../services/cart.service"
import { Sort } from "../../../types/types"
import { ApiService } from "../../../services/api.service"

@Component({
    selector: "app-home",
    templateUrl: "./home.component.html",
    styleUrl: "./home.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
    filterProducts$: Observable<Product[]> =
        this.productService.getFilteredProducts()

    filters = {
        category: "all",
        sort: "none",
        search: "",
    }

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
        private cartService: CartService,
        private apiService: ApiService
    ) {
        this.apiService
            .getProducts()
            .subscribe((data: Product[]) => console.log(data))
    }

    // filter and sort products based on category and sort option
    filterAndSortProducts(newFilters: {
        category: string
        sort: Sort
        search: string
    }): void {
        this.filters = newFilters
        this.productService.updateFilterCriteria(
            newFilters.category,
            newFilters.sort,
            newFilters.search
        )
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
