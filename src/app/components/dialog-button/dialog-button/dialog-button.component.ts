import { ChangeDetectionStrategy, Component } from "@angular/core"
import { MatDialog } from "@angular/material/dialog"
import { CartService } from "../../../services/cart.service"
import { Product } from "../../../types/interface"
import { CheckoutDialogComponent } from "../../checkout-dialog/checkout-dialog/checkout-dialog.component"
import { ProductService } from "../../../services/product.service"
import { Observable } from "rxjs"

@Component({
    selector: "app-dialog-button",
    templateUrl: "./dialog-button.component.html",
    styleUrl: "./dialog-button.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogButtonComponent {
    cart: Product[] = []
    totalQuantity$ = new Observable<number>()

    constructor(
        private readonly cartService: CartService,
        private readonly productService: ProductService,
        private readonly dialog: MatDialog
    ) {}

    ngOnInit(): void {
        this.cartService.getCart().subscribe((data: Product[]) => {
            this.cart = data
            this.totalQuantity$ = this.cartService.totalQuantity$
        })
    }

    openDialog(): void {
        const dialogRef = this.dialog.open(CheckoutDialogComponent, {
            width: "400px",
            height: "400px",
            data: { cart: this.cart },
        })

        dialogRef.afterClosed().subscribe(() => {
            console.log("The dialog was closed")
            this.productService.notifyQuantityChange()
        })
    }
}
