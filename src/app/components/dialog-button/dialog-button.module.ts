import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"
import { DialogButtonComponent } from "./dialog-button/dialog-button.component"
import { MatDialogModule } from "@angular/material/dialog"
import { CheckoutDialogModule } from "../checkout-dialog/checkout-dialog.module"
import { MatButtonModule } from "@angular/material/button"
import { MatIconModule } from "@angular/material/icon"
import { MatBadgeModule } from "@angular/material/badge"

/**
 * Module that provides the shopping cart dialog button functionality.
 * 
 * This module:
 * - Declares and exports the DialogButtonComponent 
 * - Integrates with CheckoutDialogModule for cart management
 * - Imports Angular Material modules for UI components
 * 
 * The DialogButtonComponent displays:
 * - A floating action button with shopping cart icon
 * - A badge showing current items quantity in cart
 * - Opens a checkout dialog when clicked
 * - Manages dialog lifecycle and cart updates
 * 
 * Features:
 * - Real-time cart quantity updates
 * - Freezes quantity display when dialog is open
 * - Tracks changes made in the checkout dialog
 * - Optimized with OnPush change detection
 * 
 * @example
 * // Import in a feature module:
 * import { DialogButtonModule } from "./components/dialog-button/dialog-button.module"
 * 
 * @NgModule({
 *   imports: [
 *     // other imports...
 *     DialogButtonModule
 *   ]
 * })
 * export class SomeFeatureModule { }
 */
@NgModule({
    declarations: [DialogButtonComponent],
    imports: [
        CommonModule,
        MatDialogModule,
        MatButtonModule,
        MatIconModule,
        MatBadgeModule,
        CheckoutDialogModule,
    ],
    exports: [DialogButtonComponent],
})
export class DialogButtonModule {}
