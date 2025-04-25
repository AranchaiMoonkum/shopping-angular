import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { map, Observable } from "rxjs"
import { Product } from "../types/interface"

@Injectable({
    providedIn: "root",
})
export class ApiService {
    constructor(private readonly http: HttpClient) {}

    getProducts(): Observable<{ products: Product[] }> {
        return this.http
            .get<Product[]>("https://fakestoreapi.com/products")
            .pipe(
                map((products) => {
                    return { products: products }
                })
            )
    }
}
