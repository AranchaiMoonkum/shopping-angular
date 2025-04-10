import { Injectable } from "@angular/core"
import {
    BehaviorSubject,
    combineLatest,
    distinctUntilChanged,
    map,
    merge,
    Observable,
    ReplaySubject,
    shareReplay,
    tap,
} from "rxjs"
import { Product } from "../types/interface"
import { ApiService } from "./api.service"
import { CartService } from "./cart.service"
import { Sort } from "../types/types"

@Injectable({
    providedIn: "root",
})
export class ProductService {
    // initialize the products observable with an empty array
    private readonly productsSubject = new ReplaySubject<Product[]>(1)
    private readonly filterCategorySubject = new BehaviorSubject<string>("all")
    private readonly sortOrderSubject = new BehaviorSubject<Sort>("none")
    private readonly searchQuerySubject = new BehaviorSubject<string>("")

    // get products as an observable with caching using shareReplay
    private readonly products$ = merge(
        this.apiService
            .get<Product[]>("https://fakestoreapi.com/products")
            .pipe(
                tap((products) => {
                    this.productsSubject.next(products)
                }),
                shareReplay(1)
            ),
        this.productsSubject.asObservable()
    )

    private readonly filteredProducts$ = combineLatest([
        this.products$,
        this.cartService.getCart(),
        this.filterCategorySubject.pipe(distinctUntilChanged()),
        this.sortOrderSubject.pipe(distinctUntilChanged()),
        this.searchQuerySubject.pipe(distinctUntilChanged()),
    ]).pipe(
        map(([products, cart, category, order, search]) => {
            const productWithQuantity = products.map((p) => {
                const inCart = cart.find((c) => c.id === p.id)
                return {
                    ...p,
                    quantity: inCart ? inCart.quantity : 0,
                }
            })

            return this.filterAndSortProducts(
                productWithQuantity,
                category,
                order,
                search
            )
        })
    )

    constructor(
        private apiService: ApiService,
        private cartService: CartService
    ) {}

    // get the products as an observable
    getProducts(): Observable<Product[]> {
        return this.products$
    }

    // get the filtered products as an observable
    getFilteredProducts(): Observable<Product[]> {
        return this.filteredProducts$
    }

    // get values of filter and sort options
    setSortAndFilter(category: string, order: Sort, search: string) {
        this.filterCategorySubject.next(category)
        this.sortOrderSubject.next(order)
        this.searchQuerySubject.next(search)
    }

    // filter and sort the products based on category and sort option
    private filterAndSortProducts(
        products: Product[],
        category: string,
        order: Sort,
        search: string
    ) {
        // filter products based on category
        let filteredProducts =
            category === "all"
                ? products
                : products.filter((product) => product.category === category)

        // filter products based on search query
        if (search) {
            filteredProducts = filteredProducts.filter((product) =>
                product.title.toLowerCase().includes(search.toLowerCase())
            )
        }

        // sort products based on order
        if (order !== "none") {
            filteredProducts = [...filteredProducts].sort((a, b) => {
                const comparison = a.price - b.price
                return order === "asc" ? comparison : -comparison
            })
        }

        // return the filtered and sorted products
        return filteredProducts
    }
}
