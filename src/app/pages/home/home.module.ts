// import components
import { HomeComponent } from "./home/home.component"

// import modules
import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"
import { NavbarModule } from "../../components/navbar/navbar.module"

// import angular material modules
import { MatCardModule } from "@angular/material/card"
import { MatIconModule } from "@angular/material/icon"
import { MatSnackBarModule } from "@angular/material/snack-bar"

// import functional components
import { ProductFilterModule } from "../../components/product-filter/product-filter.module"
import { UpdateQuantityModule } from "../../components/update-quantity/update-quantity.module"
import { ShowProductModule } from "../../components/show-product/show-product.module"
import { DialogButtonModule } from "../../components/dialog-button/dialog-button.module"

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
