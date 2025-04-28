import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"
import { CheckoutDialogComponent } from "./checkout-dialog/checkout-dialog.component"
import { MatDialogModule } from "@angular/material/dialog"
import { MatTooltipModule } from "@angular/material/tooltip"
import { MatButtonModule } from "@angular/material/button"
import { UpdateQuantityModule } from "../update-quantity/update-quantity.module"

/**
 * Module that provides the shopping cart checkout dialog functionality.
 * 
 * This module:
 * - Declares and exports the CheckoutDialogComponent
 * - Integrates with UpdateQuantityModule for product quantity controls
 * - Imports Angular Material modules for UI components
 * 
 * The CheckoutDialogComponent displays:
 * - A list of products in the shopping cart
 * - Product details including image, title and price
 * - Quantity controls to adjust product quantities
 * - Remove buttons to delete products from cart
 * - Total price calculation
 * - Checkout and close action buttons
 * 
 * Features:
 * - Real-time quantity adjustments
 * - Real-time price calculations
 * - Interactive product removal
 * - Checkout validation
 * - Returns modified cart data when closed
 * 
 * @example
 * // Import in the DialogButtonModule:
 * import { CheckoutDialogModule } from "../checkout-dialog/checkout-dialog.module"
 * 
 * @NgModule({
 *   imports: [
 *     // other imports...
 *     CheckoutDialogModule
 *   ]
 * })
 * export class DialogButtonModule { }
 */
@NgModule({
    declarations: [CheckoutDialogComponent],
    imports: [
        CommonModule,
        MatDialogModule,
        MatButtonModule,
        MatTooltipModule,
        UpdateQuantityModule,
    ],
    exports: [CheckoutDialogComponent],
})
export class CheckoutDialogModule {}
