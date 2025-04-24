import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"
import { DialogButtonComponent } from "./dialog-button/dialog-button.component"
import { MatDialogModule } from "@angular/material/dialog"
import { CheckoutDialogModule } from "../checkout-dialog/checkout-dialog.module"
import { MatButtonModule } from "@angular/material/button"
import { MatIconModule } from "@angular/material/icon"
import { MatBadgeModule } from "@angular/material/badge"

@NgModule({
    declarations: [DialogButtonComponent],
    imports: [
        CommonModule,
        MatDialogModule,
        MatButtonModule,
        MatIconModule,
        MatBadgeModule,
        CheckoutDialogModule,
    ],
    exports: [DialogButtonComponent],
})
export class DialogButtonModule {}
