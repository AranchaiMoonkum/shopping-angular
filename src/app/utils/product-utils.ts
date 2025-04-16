import { Product } from "../types/interface"
import { Sort } from "../types/types"

export interface ProductFilter {
    category: string
    sort: Sort
    search: string
}

export class ProductUtils {
    static filterAndSort(
        products: Product[],
        filters: ProductFilter
    ): Product[] {
        let filtered =
            filters.category === "all"
                ? products
                : products.filter(
                      (product) => product.category === filters.category
                  )

        if (filters.search) {
            filtered = filtered.filter((product) =>
                product.title
                    .toLowerCase()
                    .includes(filters.search.toLowerCase())
            )
        }

        if (filters.sort !== "none") {
            filtered = [...filtered].sort((a, b) =>
                filters.sort === "asc" ? a.price - b.price : b.price - a.price
            )
        }

        return filtered
    }
}
