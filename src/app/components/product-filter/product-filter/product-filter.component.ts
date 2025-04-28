import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core"
import { FormBuilder, FormGroup } from "@angular/forms"
import { ProductFilters, Sort } from "../../../types/interface"
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from "rxjs"

@Component({
    selector: "app-product-filter",
    templateUrl: "./product-filter.component.html",
    styleUrl: "./product-filter.component.scss",
})
export class ProductFilterComponent implements OnInit {
    @Input() categories: string[] = []
    @Output() filterChange = new EventEmitter<ProductFilters>()

    private readonly destroy$ = new Subject<void>()    
    private readonly searchSubject = new Subject<string>()

    filterForm: FormGroup

    sortOptions: Sort[] = [
        { value: "none", label: "None" },
        { value: "price-asc", label: "Price: Low to High" },
        { value: "price-desc", label: "Price: High to Low" },
        { value: "name-asc", label: "Name: A to Z" },
        { value: "name-desc", label: "Name: Z to A" },
    ]

    constructor(private readonly fb: FormBuilder) {
        this.filterForm = this.fb.group({
            category: ["all"],
            sort: ["none"],
            search: [""],
        })
    }

    ngOnInit(): void {
        this.categoryControl?.valueChanges
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
                this.emitFilterChange()
            })

        this.sortControl?.valueChanges
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
                this.emitFilterChange()
            })

        this.searchSubject
            .pipe(
                debounceTime(300),
                distinctUntilChanged(),
                takeUntil(this.destroy$)
            )
            .subscribe((searchTerm) => {
                this.filterForm.get("search")?.setValue(searchTerm, { emitEvent: true })
                this.emitFilterChange()
            })

        // initial emit
        this.emitFilterChange()
    }

    ngOnDestroy(): void {
        this.destroy$.next()
        this.destroy$.complete()
    }

    onCategoryChange(): void {
        // update the form control
        this.filterForm.get("category")?.setValue(
            this.filterForm.get("category")?.value, { emitEvent: true }
        )
    }

    onSortChange(): void {
        // update the form control
        this.filterForm.get("sort")?.setValue(
            this.filterForm.get("sort")?.value, { emitEvent: true }
        )
    }

    onSearchChange(event: Event): void {
        const searchTerm = (event.target as HTMLInputElement).value || ""
        this.searchSubject.next(searchTerm)
    }

    onSearchClear(): void {
        this.searchSubject.next("") // emit empty string to clear search
        this.filterForm.get("search")?.setValue("", { emitEvent: true })
        this.emitFilterChange()
    }

    private emitFilterChange(): void {
        const formValues = this.filterForm.value
        this.filterChange.emit({
            category: formValues.category ?? "all",
            sort: formValues.sort ?? "none",
            search: formValues.search ?? "",
        })
    }

    // expose the form control for template binding
    get categoryControl() { return this.filterForm.get("category") }
    get sortControl() { return this.filterForm.get("sort") }
    get searchControl() { return this.filterForm.get("search") }
}
