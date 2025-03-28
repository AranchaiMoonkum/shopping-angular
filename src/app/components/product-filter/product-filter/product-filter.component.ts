import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core"

@Component({
    standalone: false,
    selector: "app-product-filter",
    templateUrl: "./product-filter.component.html",
    styleUrl: "./product-filter.component.scss",
})
export class ProductFilterComponent implements OnInit {
    @Input() categories: string[] = []
    @Output() filterChange = new EventEmitter<{
        category: string
        sort: string
    }>()

    selectedCategory: string = "all"
    selectedSort: string = "none"

    ngOnInit(): void {
        this.emitFilters()
    }

    onFilterChange() {
        this.filterChange.emit({
            category: this.selectedCategory,
            sort: this.selectedSort,
        })
    }

    emitFilters() {
        this.filterChange.emit({
            category: this.selectedCategory,
            sort: this.selectedSort,
        })
    }

    formatUpperCaseCategory(category: string) {
        return (
            category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()
        )
    }
}
