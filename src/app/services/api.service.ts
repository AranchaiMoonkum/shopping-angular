import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { map, Observable } from "rxjs"
import { Product } from "../types/interface"

/**
 * Service responsible for handling API communication with the backend product data source.
 * 
 * This service:
 * - Provides methods to fetch product data from the external API
 * - Maps raw API responses to application-specific data structures
 * - Uses Angular HttpClient for HTTP requests
 * - Returns observables for reactive data handling
 */
@Injectable({
    providedIn: "root",
})
export class ApiService {
    /** Base URL for the products API endpoint */
    private readonly apiUrl = "https://fakestoreapi.com/products"

    /**
     * @param http Angular's HttpClient for making API requests
     */
    constructor(private readonly http: HttpClient) {}

    /**
     * Fetches all products from the API
     * 
     * @returns An Observable that emits an object containing an array of Product
     * 
     * @example
     * // In a component:
     * this.apiService.getProducts().subscribe({
     *   next: (data) => console.log(data.products),
     *   error: (err) => console.error("Error fetching products", err)
     * })
     */
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
