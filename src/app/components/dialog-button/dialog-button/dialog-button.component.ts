import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from "@angular/core"
import { MatDialog } from "@angular/material/dialog"
import { CartService } from "../../../services/cart.service"
import { Product } from "../../../types/interface"
import { CheckoutDialogComponent } from "../../checkout-dialog/checkout-dialog/checkout-dialog.component"
import { Observable, Subscription } from "rxjs"

@Component({
    selector: "app-dialog-button",
    templateUrl: "./dialog-button.component.html",
    styleUrl: "./dialog-button.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogButtonComponent implements OnInit, OnDestroy {
    cart: Product[] = []
    totalQuantity$!: Observable<number>
    private readonly subscriptions = new Subscription()

    constructor(
        private readonly cartService: CartService,
        private readonly dialog: MatDialog
    ) {}

    ngOnInit(): void {
        this.totalQuantity$ = this.cartService.totalQuantity$

        this.subscriptions.add(
            this.cartService.getCart().subscribe((data: Product[]) => {
                this.cart = data
            })
        )
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe()
    }

    openDialog(): void {
        const dialogRef = this.dialog.open(CheckoutDialogComponent, {
            width: "400px",
            height: "400px",
            data: { cart: this.cart },
        })

        this.subscriptions.add(
            dialogRef.afterClosed().subscribe(() => {
                console.log("The dialog was closed")
            })
        )
    }
}
