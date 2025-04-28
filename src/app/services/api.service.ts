import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { map, Observable } from "rxjs"
import { Product } from "../types/interface"

@Injectable({
    providedIn: "root",
})
export class ApiService {
    private readonly apiUrl = "https://fakestoreapi.com/products"

    constructor(private readonly http: HttpClient) {}

    getProducts(): Observable<{ products: Product[] }> {
        return this.http
            .get<Product[]>(this.apiUrl)
            .pipe(
                map((products) => {
                    return { products: products }
                })
            )
    }
}
