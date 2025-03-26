import { Component, Input, Output, EventEmitter } from "@angular/core"

@Component({
    standalone: false,
    selector: "app-product-filter",
    templateUrl: "./product-filter.component.html",
    styleUrl: "./product-filter.component.scss"
})

export class ProductFilterComponent {
    @Input() categories: string[] = []
    @Input() selectedCategory: string = "all"
    @Input() selectedSort: string = "none"

    @Output() categorySelected = new EventEmitter<string>()
    @Output() sortSelected = new EventEmitter<string>()

    selectCategory(event: Event) {
        const selectedValue = (event.target as HTMLSelectElement).value
        this.categorySelected.emit(selectedValue)
    }

    selectSort(event: Event) {
        const selectedSortValue = (event.target as HTMLSelectElement).value
        this.sortSelected.emit(selectedSortValue)
    }
}
