import {
    Component,
    Input,
    Output,
    EventEmitter,
    OnChanges,
    SimpleChanges,
} from "@angular/core"
import { Sort } from "../../../types/types"

@Component({
    standalone: false,
    selector: "app-product-filter",
    templateUrl: "./product-filter.component.html",
    styleUrl: "./product-filter.component.scss",
})
export class ProductFilterComponent implements OnChanges {
    @Input() categories: string[] = []
    @Output() filterChange = new EventEmitter<{
        category: string
        sort: Sort
        search: string
    }>()

    selectedCategory: string = "all"
    selectedSort: Sort = "none"
    searchQuery: string = ""

    ngOnChanges(change: SimpleChanges): void {
        if (change["categories"]) {
            this.emitFilters()
        }
    }

    onFilterChange(): void {
        this.emitFilters()
    }

    private emitFilters(): void {
        this.filterChange.emit({
            category: this.selectedCategory,
            sort: this.selectedSort,
            search: this.searchQuery,
        })
    }

    formatUpperCaseCategory(category: string) {
        return (
            category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()
        )
    }
}
