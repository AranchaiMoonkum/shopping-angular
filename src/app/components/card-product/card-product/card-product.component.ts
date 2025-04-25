import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Input,
    OnDestroy,
    OnInit,
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
export class CardProductComponent implements OnInit, OnDestroy {
    @Input() product!: Product
    quantity: number = 0

    private quantitySub!: Subscription

    constructor(
        private readonly productService: ProductService,
        private readonly cartService: CartService,
        private readonly cdr: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        this.quantity = this.cartService.getProductQuantity(this.product)

        this.quantitySub = this.productService
            .onQuantityChange()
            .subscribe(() => {
                const updatedQuantity = this.cartService.getProductQuantity(
                    this.product
                )

                if (this.quantity !== updatedQuantity) {
                    this.quantity = updatedQuantity
                    this.cdr.markForCheck()
                }
            })
    }

    ngOnDestroy(): void {
        this.quantitySub.unsubscribe()
    }

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
