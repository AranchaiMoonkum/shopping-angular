import { ChangeDetectionStrategy, Component } from "@angular/core"
import { ProductService } from "../../../services/product.service"
import { CartService } from "../../../services/cart.service"
import { MatSnackBar } from "@angular/material/snack-bar"
import { Product } from "../../../types/interface"
import { Observable, tap } from "rxjs"

@Component({
    selector: "app-show-product",
    templateUrl: "./show-product.component.html",
    styleUrl: "./show-product.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShowProductComponent {
    filterProducts$: Observable<Product[]> =
        this.productService.getFilteredProducts()

    // the constructor injects the ProductService to fetch products data
    constructor(
        private productService: ProductService,
        private cartService: CartService,
        private _snackBar: MatSnackBar
    ) {}

    // add product to cart
    addToCart(product: Product): void {
        this._snackBar.open("Product added to cart", "Close", {
            duration: 2000,
        })

        this.cartService.addProductToCart(product)
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
