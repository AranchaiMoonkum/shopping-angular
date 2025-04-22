import { Component, EventEmitter, Input, Output } from "@angular/core"
import { FormControl } from "@angular/forms"
import { Sort } from "../../../types/interface"
import { MatSelectChange } from "@angular/material/select"

@Component({
    standalone: false,
    selector: "app-product-filter",
    templateUrl: "./product-filter.component.html",
    styleUrl: "./product-filter.component.scss",
})
export class ProductFilterComponent {
    @Input() categories: string[] = []

    @Output() filterChange = new EventEmitter<{
        category: string
        sort: string
    }>()

    sortOptions: Sort[] = [
        { value: "none", label: "None" },
        { value: "price-asc", label: "Price: Low to High" },
        { value: "price-desc", label: "Price: High to Low" },
    ]

    categoryControl = new FormControl("all")
    sortControl = new FormControl("none")

    onCategoryChange(event: MatSelectChange): void {
        console.log("Selected category:", event.value)
        this.emitFilterChange()
    }

    onSortChange(event: MatSelectChange): void {
        console.log("Selected category:", event.value)
        this.emitFilterChange()
    }

    private emitFilterChange(): void {
        this.filterChange.emit({
            category: this.categoryControl.value ?? "all",
            sort: this.sortControl.value ?? "none",
        })
    }
}
