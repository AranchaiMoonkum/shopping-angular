import { ChangeDetectionStrategy, Component, Input } from "@angular/core"
import { Product } from "../../../types/interface"
import { ProductService } from "../../../services/product.service"

@Component({
    selector: "app-card-product",
    templateUrl: "./card-product.component.html",
    styleUrl: "./card-product.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardProductComponent {
    @Input() product!: Product

    constructor(private readonly productService: ProductService) {}

    getStarPercentage(rate: number): string {
        return `${(rate / 5) * 100}%`
    }

    getTimeStamp() {
        return this.productService.getTimeStamp()
    }
}
