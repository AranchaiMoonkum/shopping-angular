import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"
import { ProductFilterComponent } from "./product-filter/product-filter.component"
import { MatSelectModule } from "@angular/material/select"
import {
    MAT_FORM_FIELD_DEFAULT_OPTIONS,
    MatFormFieldModule,
} from "@angular/material/form-field"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { MatInputModule } from "@angular/material/input"
import { MatButtonModule } from "@angular/material/button"
import { MatIconModule } from "@angular/material/icon"

/**
 * Module that provides filtering and sorting functionality for product displays.
 * 
 * This module:
 * - Declares and exports the ProductFilterComponent
 * - Imports required Angular Material modules for UI components
 * - Sets up form controls for filtering operations
 * - Configures Material form field appearance
 * 
 * The ProductFilterComponent enables users to filter products by:
 * - Category selection via dropdown
 * - Multiple sort options (price/name, ascending/descending)
 * - Text search with debounce for performance
 * 
 * @example
 * // Import in a feature module:
 * import { ProductFilterModule } from "../path/to/product-filter.module"
 * 
 * @NgModule({
 *   imports: [
 *     // other imports...
 *     ProductFilterModule
 *   ]
 * })
 * export class SomeFeatureModule { }
 */
@NgModule({
    declarations: [ProductFilterComponent],
    imports: [
        CommonModule,
        MatSelectModule,
        MatFormFieldModule,
        FormsModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        ReactiveFormsModule
    ],
    providers: [
        {
            provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
            useValue: { appearance: "outline" },
        },
    ],
    exports: [ProductFilterComponent],
})
export class ProductFilterModule {}
