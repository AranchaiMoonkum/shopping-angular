import { Component } from "@angular/core"

import {
    MatDialogModule,
    MatDialogTitle,
    MatDialogContent,
} from "@angular/material/dialog"

@Component({
    standalone: true,
    selector: "app-checkout-dialog",
    templateUrl: "./checkout-dialog.component.html",
    styleUrl: "./checkout-dialog.component.scss",
    imports: [MatDialogModule],
})
export class CheckoutDialogComponent {}
