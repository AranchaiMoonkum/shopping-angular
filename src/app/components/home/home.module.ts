// import components
import { HomeComponent } from "./home/home.component"
import { MatCardModule } from "@angular/material/card"

// import modules
import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"

// import functional components
import { ProductFilterModule } from "../product-filter/product-filter.module"

@NgModule({
    declarations: [HomeComponent],
    imports: [CommonModule, ProductFilterModule, MatCardModule],
    exports: [HomeComponent],
})
export class HomeModule {}
