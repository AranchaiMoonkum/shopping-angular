import { ChangeDetectionStrategy, Component } from "@angular/core"
import { ProductService } from "../../../services/product.service"
import { Product } from "../../../types/interface"
import { MatSnackBar } from "@angular/material/snack-bar"
import { CartService } from "../../../services/cart.service"
import { Observable } from "rxjs"

@Component({
    selector: "app-home",
    templateUrl: "./home.component.html",
    styleUrl: "./home.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
    // the constructor injects the ProductService to fetch products data
    constructor(
        private productService: ProductService,
        private cartService: CartService,
        private _snackBar: MatSnackBar
    ) {}

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

    trackByProductId(index: number, product: Product): number {
        return product.id
    }

    // add product to cart
    addToCart(product: Product): void {
        this._snackBar.open("Product added to cart", "Close", {
            duration: 2000,
        })

        this.cartService.addProductToCart(product)
    }

    // filter and sort products based on category and sort option
    filterAndSortProducts(filters: {
        category: string
        sort: "asc" | "desc" | "none"
    }): void {
        this.selectedCategory = filters.category
        this.selectedSort = filters.sort
        this.productService.setSortAndFilter(filters.category, filters.sort)
    }

    // get star rating percentage based on the rating value
    getStarPercentage(rate: number): string {
        return `${(rate / 5) * 100}%`
    }

    // update the quantity of the product in the cart
    updateCart(product: Product, quantity: number): void {
        if (quantity === 0) {
            this.cartService.removeProductFromCart(product)
        } else {
            this.cartService.updateProductQuantity(product, quantity)
        }
    }

    // get the quantity of the product in the cart
    getProductQuantity(product: Product): number {
        const cartQuantity = this.cartService.getProductQuantity(product)
        return cartQuantity ? cartQuantity : 0
    }
}
