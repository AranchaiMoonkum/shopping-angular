import { ChangeDetectionStrategy, Component } from "@angular/core"
import { Product } from "../../../types/interface"
import { Observable } from "rxjs"
import { CartService } from "../../../services/cart.service"
import { MatDialog } from "@angular/material/dialog"
import { CheckoutDialogComponent } from "../../checkout-dialog/checkout-dialog/checkout-dialog.component"
import { ProductService } from "../../../services/product.service"

@Component({
    standalone: false,
    selector: "app-navbar",
    templateUrl: "./navbar.component.html",
    styleUrl: "./navbar.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
    constructor(
        private cartService: CartService,
        private dialog: MatDialog,
        private productService: ProductService
    ) {}

    cart: Product[] = []
    totalQuantity$ = new Observable<number>()

    ngOnInit(): void {
        this.cartService.getCart().subscribe((data: Product[]) => {
            this.cart = data
            this.totalQuantity$ = this.cartService.totalQuantity$
        })
    }

    openDialog(): void {
        this.dialog.open(CheckoutDialogComponent, {
            width: "400px",
            height: "400px",
            data: { cart: this.cart },
        })
    }

    getTimeStamp() {
        return this.productService.getTimeStamp()
    }
}
