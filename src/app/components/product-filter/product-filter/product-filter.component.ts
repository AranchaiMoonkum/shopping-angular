import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core"
import { FormBuilder, FormGroup } from "@angular/forms"
import { ProductFilters, Sort } from "../../../types/interface"
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from "rxjs"
import { MatSelectChange } from "@angular/material/select"

/**
 * Component that provides a filtering and sorting controls for product catalog.
 * Features:
 * - Category filtering via dropdown
 * - Multiple sort options (price/name, ascending/descending)
 * - Search with debounce for better performance
 * - Reactive forms with real-time updates
 * 
 * @example
 * <app-product-filter
 *   [categories]="['all', 'electronics', 'clothing']"
 *   (filterChange)="handleFilterChange($event)"
 * </app-product-filter>
 */
@Component({
    selector: "app-product-filter",
    templateUrl: "./product-filter.component.html",
    styleUrls: ["./product-filter.component.scss"],
})
export class ProductFilterComponent implements OnInit {
    /** List of product categories to display in filter dropdown */
    @Input() categories: string[] = []

    /** Emits filter criteria when any filter value changes */
    @Output() filterChange = new EventEmitter<ProductFilters>()

    /** Subject for coordinating component cleanup */
    private readonly destroy$ = new Subject<void>()    

    /** Subject for debouncing search input */
    private readonly searchSubject = new Subject<string>()

    /** Form group that contains all filter controls */
    filterForm: FormGroup

    /** Available sort options for the sort dropdown */
    sortOptions: Sort[] = [
        { value: "none", label: "None" },
        { value: "price-asc", label: "Price: Low to High" },
        { value: "price-desc", label: "Price: High to Low" },
        { value: "name-asc", label: "Name: A to Z" },
        { value: "name-desc", label: "Name: Z to A" },
    ]

    /**
     * Creates the component and initializes the filter form
     * @param fb Angular FormBuilder for reactive forms
     */
    constructor(private readonly fb: FormBuilder) {
        this.filterForm = this.fb.group({
            category: ["all"],
            sort: ["none"],
            search: [""],
        })
    }

    /**
     * Sets up subscriptions for filter value changes
     * - Direct subscription to category and sort changes
     * - Debounced subscription to search input changes
     * - Initial filter emission
     */
    ngOnInit(): void {
        // Subscribe to category control changes
        this.categoryControl?.valueChanges
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
                this.emitFilterChange()
            })

        // Subscribe to sort control changes
        this.sortControl?.valueChanges
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
                this.emitFilterChange()
            })

        // Subscribe to search input with debounce
        this.searchSubject
            .pipe(
                debounceTime(300), // Wait 300ms after typing stops
                distinctUntilChanged(), // Only process if value changed
                takeUntil(this.destroy$)
            )
            .subscribe((searchTerm) => {
                this.filterForm.get("search")?.setValue(searchTerm, { emitEvent: true })
                this.emitFilterChange()
            })

        // Send initial filter values
        this.emitFilterChange()
    }

    /**
     * Cleans up subscriptions when component is destroyed
     */
    ngOnDestroy(): void {
        this.destroy$.next()
        this.destroy$.complete()
    }

    /**
     * Handles category dropdown changes
     * Updates form control and triggers filter change
     * @param event The MatSelectChange event
     */
    onCategoryChange(event: MatSelectChange): void {
        // Update the form control
        this.filterForm.get("category")?.setValue(event.value, { emitEvent: true })
    }

    /**
     * Handles sort dropdown changes
     * Updates form control and triggers filter change
     * @param event The MatSelectChange event
     */
    onSortChange(event: MatSelectChange): void {
        // Update the form control
        this.filterForm.get("sort")?.setValue(event.value, { emitEvent: true })
    }

    /**
     * Handles search input with debounce
     * @param event Input event from search field
     */
    onSearchChange(event: Event): void {
        const searchTerm = (event.target as HTMLInputElement).value || ""
        this.searchSubject.next(searchTerm)
    }

    /**
     * Clears the search field and updates filters
     */
    onSearchClear(): void {
        this.searchSubject.next("") // Emit empty string to clear search
        this.filterForm.get("search")?.setValue("", { emitEvent: true })
        this.emitFilterChange()
    }

    /**
     * Gathers current filter values and emits them to parent component
     * @private
     */
    private emitFilterChange(): void {
        const formValues = this.filterForm.value
        this.filterChange.emit({
            category: formValues.category ?? "all",
            sort: formValues.sort ?? "none",
            search: formValues.search ?? "",
        })
    }

    // Getters for form controls to use in template
    /** @returns Category form control */
    get categoryControl() { return this.filterForm.get("category") }

    /** @returns Sort form control */
    get sortControl() { return this.filterForm.get("sort") }

    /** @returns Search form control */
    get searchControl() { return this.filterForm.get("search") }
}
