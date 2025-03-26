import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"
import { ProductFilterComponent } from "./product-filter/product-filter.component"

@NgModule({
    declarations: [
        ProductFilterComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        ProductFilterComponent
    ]
})

export class ProductFilterModule { }
