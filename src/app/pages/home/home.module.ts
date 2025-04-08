// import components
import { HomeComponent } from "./home/home.component"

// import modules
import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"
import { NavbarModule } from "../../components/navbar/navbar.module"
import { ShowProductModule } from "../../components/show-product/show-product.module"
import { ProductFilterModule } from "../../components/product-filter/product-filter.module"

@NgModule({
    declarations: [HomeComponent],
    imports: [
        CommonModule,
        NavbarModule,
        ShowProductModule,
        ProductFilterModule,
    ],
    exports: [HomeComponent],
})
export class HomeModule {}
