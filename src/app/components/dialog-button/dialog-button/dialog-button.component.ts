import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core"
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
        private readonly dialog: MatDialog,
        private readonly cdr: ChangeDetectorRef,
    ) {}

    ngOnInit(): void {
        this.totalQuantity$ = this.cartService.totalQuantity$

        this.subscriptions.add(
            this.cartService.getCart().subscribe((data: Product[]) => {
                this.cart = data
            }),
        )
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe()
    }

    openDialog(): void {
        const originalCart = [...this.cart]
        const originalIds = new Set(originalCart.map((product) => product.id))

        const dialogRef = this.dialog.open(CheckoutDialogComponent, {
            width: "400px",
            height: "400px",
            data: { cart: this.cart },
        })

        this.subscriptions.add(
            dialogRef.afterClosed().subscribe((returnedProducts: Product[]) => {
                if (returnedProducts) {
                    const changedProductIds: number[] = []
                    
                    originalCart.forEach(originalProduct => {
                        const returnedProduct = returnedProducts.find(p => p.id === originalProduct.id);
                        if (!returnedProduct || returnedProduct.quantity !== originalProduct.quantity) {
                            changedProductIds.push(originalProduct.id);
                        }
                    })

                    returnedProducts.forEach(product => {
                        if (!originalIds.has(product.id)) {
                            changedProductIds.push(product.id)
                        }
                    })
                    
                    // refresh cart data after dialog is closed
                    this.cartService.refreshCart(Array.from(new Set(changedProductIds)))
                    this.cdr.detectChanges()
                } else {
                    console.log("Dialog closed without data")
                }
            })
        )
    }
}
