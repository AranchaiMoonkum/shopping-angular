import { ChangeDetectionStrategy, Component } from "@angular/core"
import { ProductService } from "../../../services/product.service"

@Component({
    standalone: false,
    selector: "app-navbar",
    templateUrl: "./navbar.component.html",
    styleUrl: "./navbar.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
    constructor(private readonly productService: ProductService) {}

    getTimeStamp() {
        return this.productService.getTimeStamp()
    }
}
