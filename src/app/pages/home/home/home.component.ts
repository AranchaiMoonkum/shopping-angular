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

    onFilterChange(category: string): void {
        if (category === "all") {
            this.productsDisplay = this.products
        } else {
            this.productsDisplay = this.products.filter(
                (product) => product.category === category
            )
        }
    }
}
