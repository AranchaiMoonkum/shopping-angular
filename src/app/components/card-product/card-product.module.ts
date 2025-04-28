import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"
import { CardProductComponent } from "./card-product/card-product.component"
import { MatCardModule } from "@angular/material/card"
import { UpdateQuantityModule } from "../update-quantity/update-quantity.module"
import { ChangeBackgroundPipe } from "../../pipes/change-background.pipe"

/**
 * Module that provides product card display functionality.
 * 
 * This module:
 * - Declares and exports the CardProductComponent
 * - Declares the ChangeBackgroundPipe for dynamic card styling
 * - Integrates with UpdateQuantityModule for product quantity controls
 * - Imports Angular Material Card module for UI components
 * 
 * The CardProductComponent displays:
 * - Product image, title, and category
 * - Product price with currency formatting
 * - Star rating visualization
 * - Quantity controls for adding to cart
 * 
 * Features:
 * - Dynamic background color based on cart quantity
 * - Interactive quantity adjustments
 * - Optimized with OnPush change detection
 * - Selective updates when cart quantities change
 * 
 * @example
 * // Import in a feature module:
 * import { CardProductModule } from "./components/card-product/card-product.module"
 * 
 * @NgModule({
 *   imports: [
 *     // other imports...
 *     CardProductModule
 *   ]
 * })
 * export class SomeFeatureModule { }
 */
@NgModule({
    declarations: [CardProductComponent, ChangeBackgroundPipe],
    imports: [CommonModule, MatCardModule, UpdateQuantityModule],
    exports: [CardProductComponent],
})
export class CardProductModule {}
