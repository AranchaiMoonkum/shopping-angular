import { ProductService } from "./../../../services/product.service"
import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core"
import { Product } from "../../../types/interface"
import { ApiService } from "../../../services/api.service"

@Component({
    selector: "app-show-product",
    templateUrl: "./show-product.component.html",
    styleUrl: "./show-product.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShowProductComponent implements OnInit {
    products: Product[] = []
    productsDisplay: Product[] = []
    categories: string[] = []

    selectedCategory: string = "all"

    private readonly sortFunctions = {
        none: () => 0,
        "price-asc": (a: Product, b: Product) => a.price - b.price,
        "price-desc": (a: Product, b: Product) => b.price - a.price,
        "name-asc": (a: Product, b: Product) => a.title.localeCompare(b.title),
        "name-desc": (a: Product, b: Product) => b.title.localeCompare(a.title),
    }

    constructor(
        private readonly apiService: ApiService,
        private readonly productService: ProductService
    ) {}

    ngOnInit(): void {
        this.apiService
            .getProducts()
            .subscribe((data: { products: Product[] }) => {
                this.productService.setProducts(data.products)
                this.products = data.products

                this.productsDisplay = this.products

                this.categories = [
                    "all",
                    ...this.products
                        .map((p) => p.category)
                        .filter((value, index, self) => {
                            return self.indexOf(value) === index
                        }),
                ]
            })
    }

    trackById(index: number, product: Product) {
        return product.id
    }

    onFilterChange(filters: {
        category: string
        sort: string
        search: string
    }) {
        if (filters.category === "all") {
            this.productsDisplay = [...this.products]
        } else {
            this.productsDisplay = this.products.filter(
                (product) => product.category === filters.category
            )
        }

        const sortFn =
            this.sortFunctions[filters.sort as keyof typeof this.sortFunctions]
        if (sortFn) {
            this.productsDisplay.sort(sortFn)
        }

        if (filters.search) {
            this.productsDisplay = this.productsDisplay.filter((product) =>
                product.title
                    .toLowerCase()
                    .includes(filters.search.toLowerCase())
            )
        }

        return this.productsDisplay
    }
}
