import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core"
import { FormControl } from "@angular/forms"
import { Sort } from "../../../types/interface"
import { MatSelectChange } from "@angular/material/select"

@Component({
    standalone: false,
    selector: "app-product-filter",
    templateUrl: "./product-filter.component.html",
    styleUrl: "./product-filter.component.scss",
})
export class ProductFilterComponent implements OnInit {
    @Input() categories: string[] = []
    @Input() sortOptions: Sort[] = []

    @Output() filterChange = new EventEmitter<string>()

    categoryControl = new FormControl("all")

    ngOnInit(): void {
        this.filterChange.emit(this.categoryControl.value ?? "all")
    }

    onCategoryChange(event: MatSelectChange): void {
        console.log("Selected category:", event.value)

        this.filterChange.emit(event.value ?? "all")
    }
}
