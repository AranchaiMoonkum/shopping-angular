// import Angular core modules
import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"

// import components
import { CartDialogComponent } from "./cart-dialog/cart-dialog.component"

// import Angular Material modules
import { MatIconModule } from "@angular/material/icon"
import { MatBadgeModule } from "@angular/material/badge"
import { MatButtonModule } from "@angular/material/button"
import {
    MatDialogActions,
    MatDialogContent,
    MatDialogModule,
    MatDialogTitle,
} from "@angular/material/dialog"

@NgModule({
    declarations: [CartDialogComponent],
    imports: [
        CommonModule,
        MatIconModule,
        MatBadgeModule,
        MatButtonModule,
        MatDialogModule,
        MatDialogContent,
        MatDialogTitle,
        MatDialogActions,
    ],
    exports: [CartDialogComponent],
})
export class CartDialogModule {}
