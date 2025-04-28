import { ShowProductComponent } from "./show-product/show-product.component"
import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"
import { ProductFilterModule } from "../../components/product-filter/product-filter.module"
import { CardProductModule } from "../card-product/card-product.module"

/**
 * Module that provides the product catalog display functionality.
 * 
 * This module:
 * - Declares the ShowProductComponent for displaying the product catalog
 * - Imports required feature modules (ProductFilterModule, CardProductModule)
 * - Exports ShowProductComponent for use in other modules
 * 
 * The ShowProductComponent combines filtering capabilities with product display,
 * allowing users to browse, filter, sort, and interact with the product catalog.
 * 
 * @example
 * // Import in the AppModule or a feature module:
 * import { ShowProductModule } from "./components/show-product/show-product.module"
 * 
 * @NgModule({
 *   imports: [
 *     // other imports...
 *     ShowProductModule
 *   ]
 * })
 * export class AppModule { }
 */
@NgModule({
    declarations: [ShowProductComponent],
    imports: [CommonModule, ProductFilterModule, CardProductModule],
    exports: [ShowProductComponent],
})
export class ShowProductModule {}
