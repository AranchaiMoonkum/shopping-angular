import { Injectable } from "@angular/core"
import {
    BehaviorSubject,
    combineLatest,
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
import { ProductUtils } from "../utils/product-utils"

@Injectable({
    providedIn: "root",
})
export class ProductService {
    private readonly productsSubject = new ReplaySubject<Product[]>(1)
    private readonly category$ = new BehaviorSubject<string>("all")
    private readonly sort$ = new BehaviorSubject<Sort>("none")
    private readonly search$ = new BehaviorSubject<string>("")

    private readonly products$ = merge(
        this.apiService
            .get<Product[]>("https://fakestoreapi.com/products")
            .pipe(
                tap((products) => this.productsSubject.next(products)),
                shareReplay(1)
            ),
        this.productsSubject.asObservable()
    )

    private readonly filteredProducts$ = combineLatest([
        this.products$,
        this.cartService.getCart(),
        this.category$,
        this.sort$,
        this.search$,
    ]).pipe(
        map(([products, cart, category, sort, search]) => {
            const withQuantities = products.map((p) => {
                const inCart = cart.find((c) => c.id === p.id)
                return { ...p, quantity: inCart?.quantity ?? 0 }
            })

            return ProductUtils.filterAndSort(withQuantities, {
                category,
                sort,
                search,
            })
        })
    )

    constructor(
        private apiService: ApiService,
        private cartService: CartService
    ) {}

    getFilteredProducts(): Observable<Product[]> {
        return this.filteredProducts$
    }

    updateFilterCriteria(category: string, sort: Sort, search: string): void {
        this.category$.next(category)
        this.sort$.next(sort)
        this.search$.next(search)
    }
}
