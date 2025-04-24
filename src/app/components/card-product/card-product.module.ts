// import Angular core and common modules
import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"

// import component
import { CardProductComponent } from "./card-product/card-product.component"

// import functional components
import { MatCardModule } from "@angular/material/card"
import { UpdateQuantityModule } from "../update-quantity/update-quantity.module"

@NgModule({
    declarations: [CardProductComponent],
    imports: [CommonModule, MatCardModule, UpdateQuantityModule],
    exports: [CardProductComponent],
})
export class CardProductModule {}
