import { Injectable } from "@angular/core"
import { BehaviorSubject, Observable } from "rxjs"
import { Product } from "../types/interface"

/**
 * Service responsible for managing product data throughout the application.
 * 
 * This service:
 * - Maintains a centralized store of product data
 * - Provides observables for reactive access to product data
 * - Offers methods to get and update the product collection
 * - Provides utility functions for product-related operations
 */
@Injectable({
    providedIn: "root",
})
export class ProductService {
    /** BehaviorSubject that stores and emits the product collection */
    private readonly productSubject = new BehaviorSubject<Product[]>([])

    /** Observable that components can subscribe to for product updates */
    readonly products$ = this.productSubject.asObservable()

    /**
     * Returns an observable of the products for components to subscribe to
     * 
     * @returns Observable that emits the current products array
     */
    getProducts(): Observable<Product[]> {
        return this.products$
    }

    /**
     * Updates the product collection with new data
     * Emits the new data to all subscribers
     * 
     * @param products The new product array to store
     */
    setProducts(products: Product[]): void {
        this.productSubject.next(products)
    }

    /**
     * Returns the current products value synchronously
     * 
     * @returns Current array of products
     */
    getCurrentProducts(): Product[] {
        return this.productSubject.getValue()
    }

    /**
     * Gets the current timestamp
     * Used for display purposes in product components
     * 
     * @returns Current timestamp in milliseconds
     */
    getTimeStamp(): number {
        return Date.now()
    }
}
