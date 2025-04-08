import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"
import { CheckoutDialogComponent } from "./checkout-dialog/checkout-dialog.component"
import { MatDialogModule } from "@angular/material/dialog"
import { MatTooltipModule } from "@angular/material/tooltip"
import { MatButtonModule } from "@angular/material/button"
import { UpdateQuantityModule } from "../update-quantity/update-quantity.module"

@NgModule({
    declarations: [CheckoutDialogComponent],
    imports: [
        CommonModule,
        MatDialogModule,
        MatButtonModule,
        MatTooltipModule,
        UpdateQuantityModule,
    ],
    exports: [CheckoutDialogComponent],
})
export class CheckoutDialogModule {}
