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

@NgModule({
    declarations: [HomeComponent],
    imports: [
        CommonModule,
        ProductFilterModule,
        MatCardModule,
        MatIconModule,
        MatSnackBarModule,
        NavbarModule,
    ],
    exports: [HomeComponent],
})
export class HomeModule {}
