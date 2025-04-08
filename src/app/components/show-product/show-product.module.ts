// import component
import { ShowProductComponent } from "./show-product/show-product.component"

// import modules
import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"

// import angular material modules
import { MatCardModule } from "@angular/material/card"
import { MatIconModule } from "@angular/material/icon"
import { MatSnackBarModule } from "@angular/material/snack-bar"

// import functional components
import { ProductFilterModule } from "../../components/product-filter/product-filter.module"
import { UpdateQuantityModule } from "../../components/update-quantity/update-quantity.module"
import { ChangeBackgroundPipe } from "../../pipes/change-background.pipe"

@NgModule({
    declarations: [ShowProductComponent, ChangeBackgroundPipe],
    imports: [
        CommonModule,
        ProductFilterModule,
        MatCardModule,
        MatIconModule,
        MatSnackBarModule,
        UpdateQuantityModule,
    ],
    exports: [ShowProductComponent],
})
export class ShowProductModule {}
