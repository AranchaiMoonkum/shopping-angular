import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    inject,
    Input,
    OnDestroy,
} from "@angular/core"
import { Product } from "../../../types/interface"
import { ProductService } from "../../../services/product.service"
import { CartService } from "../../../services/cart.service"
import { Subscription } from "rxjs"

@Component({
    selector: "app-card-product",
    templateUrl: "./card-product.component.html",
    styleUrl: "./card-product.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardProductComponent {
    @Input() product!: Product

    private readonly sub!: Subscription

    constructor(
        private readonly productService: ProductService,
        private readonly cartService: CartService,
        private readonly cdr: ChangeDetectorRef
    ) {}

    getStarPercentage(rate: number): string {
        return `${(rate / 5) * 100}%`
    }

    getTimeStamp() {
        return this.productService.getTimeStamp()
    }

    getProductQuantity(product: Product): number {
        return this.cartService.getProductQuantity(product)
    }

    onQuantityChange(quantity: number): void {
        this.cartService.updateProductQuantity(this.product, quantity)
    }
}
