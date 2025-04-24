import { ChangeDetectionStrategy, Component } from "@angular/core"
import { MatDialog } from "@angular/material/dialog"
import { CartService } from "../../../services/cart.service"
import { Product } from "../../../types/interface"
import { Observable } from "rxjs"
import { CheckoutDialogComponent } from "../../checkout-dialog/checkout-dialog/checkout-dialog.component"

@Component({
    selector: "app-dialog-button",
    templateUrl: "./dialog-button.component.html",
    styleUrl: "./dialog-button.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogButtonComponent {
    constructor(
        private readonly cartService: CartService,
        private readonly dialog: MatDialog
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
}
