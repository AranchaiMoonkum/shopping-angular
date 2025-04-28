import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"
import { ProductFilterComponent } from "./product-filter/product-filter.component"
import { MatSelectModule } from "@angular/material/select"
import {
    MAT_FORM_FIELD_DEFAULT_OPTIONS,
    MatFormFieldModule,
} from "@angular/material/form-field"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { MatInputModule } from "@angular/material/input"
import { MatButtonModule } from "@angular/material/button"
import { MatIconModule } from "@angular/material/icon"

@NgModule({
    declarations: [ProductFilterComponent],
    imports: [
        CommonModule,
        MatSelectModule,
        MatFormFieldModule,
        FormsModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        ReactiveFormsModule
    ],
    providers: [
        {
            provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
            useValue: { appearance: "outline" },
        },
    ],
    exports: [ProductFilterComponent],
})
export class ProductFilterModule {}
