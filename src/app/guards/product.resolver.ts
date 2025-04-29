import { inject } from "@angular/core"
import { ResolveFn } from "@angular/router"
import { ProductService } from "../services/product.service"
import { Product } from "../types/interface"
import { catchError, Observable, of, tap } from "rxjs"
import { ApiService } from "../services/api.service"

/**
 * Angular route resolver that pre-loads product data before component activation.
 * 
 * This resolver:
 * - Fetches products from the API service
 * - Stores products in the shared ProductService
 * - Handles errors gracefully by returning an empty products array
 * - Makes product data immediately available to components via route data
 * 
 * @returns An Observable of object containing products array
 */
export const productResolver: ResolveFn<{ products: Product[] }> = (): Observable<{ products: Product[] }> => {
    const apiService = inject(ApiService)
    const productService = inject(ProductService)

    return apiService.getProducts().pipe(
        tap(data => productService.setProducts(data.products)),
        catchError(error => {
            console.error("Error fetching products:", error)
            return of({ products: [] }) // Return a default value to prevent unhandled errors
        })
    )
}
