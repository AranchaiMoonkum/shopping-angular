import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"
import { UpdateQuantityComponent } from "./update-quantity/update-quantity.component"
import { MatButtonModule } from "@angular/material/button"

/**
 * Module that provides the UpdateQuantityComponent for reuse across the application.
 * 
 * This module:
 * - Declares the UpdateQuantityComponent
 * - Exports it for use in other modules
 * - Imports necessary dependencies
 * 
 * @example
 * // Import in another module:
 * import { UpdateQuantityModule } from "../path/to/update-quantity.module"
 * 
 * @NgModule({
 *   imports: [
 *     // other imports...
 *     UpdateQuantityModule
 *   ]
 * })
 * export class SomeFeatureModule { }
 */
@NgModule({
    declarations: [UpdateQuantityComponent],
    exports: [UpdateQuantityComponent],
    imports: [CommonModule, MatButtonModule],
})
export class UpdateQuantityModule {}
