import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
} from "@angular/core"
import { MatDialog } from "@angular/material/dialog"
import { CartService } from "../../../services/cart.service"
import { Product } from "../../../types/interface"
import { CheckoutDialogComponent } from "../../checkout-dialog/checkout-dialog/checkout-dialog.component"
import {
    BehaviorSubject,
    combineLatest,
    map,
    Observable,
    Subscription,
    tap,
} from "rxjs"

@Component({
    selector: "app-dialog-button",
    templateUrl: "./dialog-button.component.html",
    styleUrls: ["./dialog-button.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogButtonComponent implements OnInit, OnDestroy {
    cart: Product[] = []
    displayQuantity$!: Observable<number>

    private readonly subscriptions = new Subscription()
    private readonly isDialogOpen = new BehaviorSubject<boolean>(false)
    private frozenQuantity: number = 0

    constructor(
        private readonly cartService: CartService,
        private readonly dialog: MatDialog,
        private readonly cdr: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        this.displayQuantity$ = combineLatest([
            this.cartService.totalQuantity$,
            this.isDialogOpen,
        ]).pipe(
            map(([totalQuantity, isDialogOpen]) => {
                if (isDialogOpen) {
                    return this.frozenQuantity
                }

                return totalQuantity
            })
        )

        this.subscriptions.add(
            this.cartService.getCart().subscribe((data: Product[]) => {
                this.cart = data
                this.cdr.markForCheck()
            })
        )

        this.subscriptions.add(
            combineLatest([this.cartService.totalQuantity$, this.isDialogOpen])
                .pipe(
                    tap(([totalQuantity, isDialogOpen]) => {
                        if (!isDialogOpen) {
                            this.frozenQuantity = totalQuantity
                        }
                    })
                )
                .subscribe()
        )
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe()
    }

    openDialog(): void {
        const originalCart = [...this.cart]
        const originalIds = new Set(originalCart.map((product) => product.id))

        this.isDialogOpen.next(true)

        const dialogRef = this.dialog.open(CheckoutDialogComponent, {
            width: "400px",
            height: "400px",
            data: { cart: this.cart },
        })

        this.subscriptions.add(
            dialogRef.afterClosed().subscribe((returnedProducts: Product[]) => {
                this.isDialogOpen.next(false)

                if (returnedProducts) {
                    const changedProductIds: number[] = []

                    originalCart.forEach((originalProduct) => {
                        const returnedProduct = returnedProducts.find(
                            (p) => p.id === originalProduct.id
                        )
                        if (
                            !returnedProduct ||
                            returnedProduct.quantity !==
                                originalProduct.quantity
                        ) {
                            changedProductIds.push(originalProduct.id)
                        }
                    })

                    returnedProducts.forEach((product) => {
                        if (!originalIds.has(product.id)) {
                            changedProductIds.push(product.id)
                        }
                    })

                    // refresh cart data after dialog is closed
                    this.cartService.refreshCart(
                        Array.from(new Set(changedProductIds))
                    )
                    this.cdr.detectChanges()
                } else {
                    console.log("Dialog closed without data")
                }
            })
        )
    }
}
