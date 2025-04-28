import { Injectable } from "@angular/core"
import { BehaviorSubject, Observable } from "rxjs"
import { Product } from "../types/interface"

@Injectable({
    providedIn: "root",
})
export class ProductService {
    // use BehaviorSubject to store the products
    private readonly productSubject = new BehaviorSubject<Product[]>([])

    // expose only the observable, not the subject
    readonly products$ = this.productSubject.asObservable()

    constructor() {}

    // returns an observable of the products 
    getProducts(): Observable<Product[]> {
        return this.products$
    }

    // updates the products collection
    setProducts(products: Product[]): void {
        this.productSubject.next(products)
    }

    getCurrentProducts(): Product[] {
        return this.productSubject.getValue()
    }

    getTimeStamp() {
        return Date.now()
    }
}
