// import components
import { HomeComponent } from "./home/home.component"

// import modules
import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"
import { MatCardModule } from "@angular/material/card"
import { MatIconModule } from "@angular/material/icon"

// import functional components
import { ProductFilterModule } from "../product-filter/product-filter.module"

@NgModule({
    declarations: [HomeComponent],
    imports: [CommonModule, ProductFilterModule, MatCardModule, MatIconModule],
    exports: [HomeComponent],
})
export class HomeModule {}
