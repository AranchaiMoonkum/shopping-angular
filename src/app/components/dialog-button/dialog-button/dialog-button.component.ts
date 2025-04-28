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

/**
 * A component that displays a floating action button with a badge showing the cart quantity.
 * When clicked, it opens a dialog to manage the shopping cart.
 * 
 * Features:
 * - Displays total quantity of items in cart as a badge
 * - Freezes quantity updates while dialog is open
 * - Resumes real-time updates when dialog closes
 * - Tracks and processes changes made in the checkout dialog
 */
@Component({
    selector: "app-dialog-button",
    templateUrl: "./dialog-button.component.html",
    styleUrls: ["./dialog-button.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogButtonComponent implements OnInit, OnDestroy {
    /** Current items in the shopping cart */
    cart: Product[] = []

    /**
     * Observable of the quantity to display in the badge.
     * This can be either the real-time quantity or the frozen quantity when the dialog is open.
     * depending on whether the dialog is open.
     */
    displayQuantity$!: Observable<number>

    /** Manages all subscriptions for proper cleanup */
    private readonly subscriptions = new Subscription()

    /** Tracks whether the checkout dialog is currently open */
    private readonly isDialogOpen = new BehaviorSubject<boolean>(false)

    /** Stores the cart quantity at the moment when the dialog was opened */
    private frozenQuantity: number = 0

    /**
     * @param cartService Service that manages cart data and operations
     * @param dialog Angular Material dialog service
     * @param cdr Change detector reference for OnPush change detection
     */
    constructor(
        private readonly cartService: CartService,
        private readonly dialog: MatDialog,
        private readonly cdr: ChangeDetectorRef
    ) {}

    /**
     * Initializes component observables and subscriptions.
     * Sets up the displayQuantity$ observable which shows either:
     * - Real-time cart quantity (when dialog is closed)
     * - Frozen quantity (when dialog is open)
     */
    ngOnInit(): void {
        // Create an observable that shows either real-time or the cart quantity
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

        // Subscribe to cart changes
        this.subscriptions.add(
            this.cartService.getCart().subscribe((data: Product[]) => {
                this.cart = data
                this.cdr.markForCheck()
            })
        )

        // Store the current quantity when it changes (while dialog is closed)
        this.subscriptions.add(
            combineLatest([
                this.cartService.totalQuantity$,
                this.isDialogOpen
            ])
                .pipe(
                    tap(([totalQuantity, isDialogOpen]) => {
                        if (!isDialogOpen) {
                            this.frozenQuantity = totalQuantity
                        }
                    })
                ).subscribe()
        )
    }

    /**
     * Cleans up all subscriptions when component is destroyed
     */
    ngOnDestroy(): void {
        this.subscriptions.unsubscribe()
    }

    /**
     * Opens the checkout dialog and manages its lifecycle.
     * - Freezes the badge quantity when dialog opens
     * - Identifies which products were changed when dialog closes
     * - Notifies cart service to refresh only the changed products
     * - Resumes real-time updates when dialog closes
     */
    openDialog(): void {
        // Create deep copies to track changes
        const originalCart = [...this.cart]
        const originalIds = new Set(originalCart.map((product) => product.id))

        // Freeze quantity updates while dialog is open
        this.isDialogOpen.next(true)

        // Open the checkout dialog
        const dialogRef = this.dialog.open(CheckoutDialogComponent, {
            width: "400px",
            height: "400px",
            data: { cart: this.cart },
        })

        // Handle dialog close
        this.subscriptions.add(
            dialogRef.afterClosed().subscribe((returnedProducts: Product[]) => {
                // Resume real-time updates when dialog closes
                this.isDialogOpen.next(false)

                if (returnedProducts) {
                    const changedProductIds: number[] = []

                    // Track products that were modified or removed
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

                    // Track new products that were added
                    returnedProducts.forEach((product) => {
                        if (!originalIds.has(product.id)) {
                            changedProductIds.push(product.id)
                        }
                    })

                    // Refresh only the products that changed
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
