import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core"
import { ProductService } from "../../../services/product.service"
import { Product } from "../../../types/interface"
import { ApiService } from "../../../services/api.service"

@Component({
    selector: "app-home",
    templateUrl: "./home.component.html",
    styleUrl: "./home.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
    products: Product[] = []
    productsDisplay: Product[] = []
    categories: string[] = []

    selectedCategory: string = "all"

    private readonly sortFunctions = {
        none: () => 0,
        "price-asc": (a: Product, b: Product) => a.price - b.price,
        "price-desc": (a: Product, b: Product) => b.price - a.price,
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

                console.log(this.products)

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

    onFilterChange(filters: { category: string; sort: string }) {
        if (filters.category === "all") {
            this.productsDisplay = this.products
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

        return this.productsDisplay
    }
}
