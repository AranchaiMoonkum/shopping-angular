// import component
import { ShowProductComponent } from "./show-product/show-product.component"

// import modules
import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"

// import functional components
import { ProductFilterModule } from "../../components/product-filter/product-filter.module"
import { CardProductModule } from "../card-product/card-product.module"

@NgModule({
    declarations: [ShowProductComponent],
    imports: [CommonModule, ProductFilterModule, CardProductModule],
    exports: [ShowProductComponent],
})
export class ShowProductModule {}
