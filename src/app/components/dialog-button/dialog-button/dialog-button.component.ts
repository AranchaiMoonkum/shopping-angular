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
    Subject,
    takeUntil,
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

    /** Tracks whether the checkout dialog is currently open */
    private readonly isDialogOpen = new BehaviorSubject<boolean>(false)

    /** Stores the cart quantity at the moment when the dialog was opened */
    private frozenQuantity: number = 0

    /** Subject for managing component lifecycle */
    private readonly destroy$ = new Subject<void>()

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
        // Create an observable that shows either real-time or frozen cart quantity
        this.displayQuantity$ = combineLatest([
            this.cartService.totalQuantity$,
            this.isDialogOpen,
        ]).pipe(
            map(([totalQuantity, isDialogOpen]) => isDialogOpen ? this.frozenQuantity : totalQuantity)
        )

        // Subscribe to cart changes
        this.cartService.getCart()
            .pipe(takeUntil(this.destroy$))
            .subscribe((data: Product[]) => {
                this.cart = data
                this.cdr.markForCheck()
            })

        // Update frozen quantity when total quantity changes (while dialog is closed)
        combineLatest([
            this.cartService.totalQuantity$,
            this.isDialogOpen
        ])
            .pipe(
                takeUntil(this.destroy$),
                tap(([totalQuantity, isDialogOpen]) => {
                    if (!isDialogOpen) { this.frozenQuantity = totalQuantity }
                })
            ).subscribe()
    }

    /**
     * Cleans up all subscriptions when component is destroyed
     */
    ngOnDestroy(): void {
        this.destroy$.next()
        this.destroy$.complete()
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
        dialogRef.afterClosed()
            .pipe(takeUntil(this.destroy$))
            .subscribe((returnedProducts: Product[]) => {
                // Resume real-time updates when dialog closes
                this.isDialogOpen.next(false)

                if (!returnedProducts) {
                    console.log("Dialog closed without data")
                    return
                }

                const changedProductIds = this.getChangedProductIds(originalCart, returnedProducts, originalIds)

                if (changedProductIds.length > 0) {
                    // Refresh only the products that changed
                    this.cartService.refreshCart(changedProductIds)
                    this.cdr.detectChanges()
                }
            })
    }

    private getChangedProductIds(originalCart: Product[], returnedProducts: Product[], originalIds: Set<number>): number[] {
        const changedIds = new Set<number>()

        // Find modified or removed products
        originalCart.forEach((originalProduct) => {
            const returnedProduct = returnedProducts.find((p) => p.id === originalProduct.id)
            if (!returnedProduct || returnedProduct.quantity !== originalProduct.quantity) {
                changedIds.add(originalProduct.id)
            }
        })

        // Find newly added products
        returnedProducts.forEach((product) => {
            if (!originalIds.has(product.id)) {
                changedIds.add(product.id)
            }
        })

        return Array.from(changedIds)
    }
}
