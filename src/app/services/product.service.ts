import { Injectable } from "@angular/core"
import { Observable, Subject } from "rxjs"
import { Product } from "../types/interface"

@Injectable({
    providedIn: "root",
})
export class ProductService {
    private readonly products$ = new Subject<Product[]>()

    product: Product[] = []

    constructor() {}

    getProducts(): Observable<Product[]> {
        return this.products$.asObservable()
    }

    setProducts(product: Product[]): void {
        this.product = product
        this.products$.next(this.product)
    }

    getTimeStamp() {
        return Math.random()
    }
}
