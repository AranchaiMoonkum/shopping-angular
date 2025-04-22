import { ProductService } from "./../../../services/product.service"
import { ChangeDetectionStrategy, Component, Input } from "@angular/core"
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
    @Input() showProducts: Product[] = []

    // constructor
    constructor(
        private readonly cartService: CartService,
        private readonly productService: ProductService,
        private readonly _snackBar: MatSnackBar
    ) {}

    // get star rating percentage based on the rating value
    getStarPercentage(rate: number): string {
        return `${(rate / 5) * 100}%`
    }

    trackByProductId(index: number, product: Product): number {
        return product.id
    }

    // get the quantity of the product in the cart
    getProductQuantity(product: Product): number {
        return this.cartService.getProductQuantity(product)
    }

    getTimeStamp() {
        return this.productService.getTimeStamp()
    }
}
