import { HomeComponent } from "./home/home.component"
import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"
import { NavbarModule } from "../../components/navbar/navbar.module"
import { MatCardModule } from "@angular/material/card"
import { MatIconModule } from "@angular/material/icon"
import { MatSnackBarModule } from "@angular/material/snack-bar"
import { ProductFilterModule } from "../../components/product-filter/product-filter.module"
import { UpdateQuantityModule } from "../../components/update-quantity/update-quantity.module"
import { ShowProductModule } from "../../components/show-product/show-product.module"
import { DialogButtonModule } from "../../components/dialog-button/dialog-button.module"

/**
 * Home feature module containing the main shopping page components.
 * 
 * This module:
 * - Provides the main HomeComponent
 * - Imports required Angular Material UI components
 * - Integrates custom feature modules for the shopping experience
 * - Encapsulates the product display, filtering, and cart functionality
 * 
 * Dependencies:
 * - Angular Material: Card, Icon, and SnackBar components for UI
 * - Custom feature modules: Navbar, ProductFilter, UpdateQuantity, ShowProduct, and DialogButton
 */
@NgModule({
    declarations: [HomeComponent],
    imports: [
        CommonModule,
        ProductFilterModule,
        MatCardModule,
        MatIconModule,
        MatSnackBarModule,
        NavbarModule,
        UpdateQuantityModule,
        ShowProductModule,
        DialogButtonModule,
    ],
    exports: [HomeComponent],
})
export class HomeModule {}
