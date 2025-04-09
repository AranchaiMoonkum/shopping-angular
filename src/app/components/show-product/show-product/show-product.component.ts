import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    Output,
} from "@angular/core"
import { CartService } from "../../../services/cart.service"
import { MatSnackBar } from "@angular/material/snack-bar"
import { Product } from "../../../types/interface"

@Component({
    selector: "app-show-product",
    templateUrl: "./show-product.component.html",
    styleUrl: "./show-product.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShowProductComponent {
    @Input() filterProducts: Product[] = []
    @Output() updateCart = new EventEmitter<{
        product: Product
        quantity: number
    }>()

    // constructor
    constructor(
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

    trackByProductId(index: number, product: Product): number {
        return product.id
    }

    // update quantity
    updateQuantity(product: Product, quantity: number): void {
        this.updateCart.emit({ product, quantity })
    }

    // get the quantity of the product in the cart
    getProductQuantity(product: Product): number {
        return this.cartService.getProductQuantity(product)
    }
}
