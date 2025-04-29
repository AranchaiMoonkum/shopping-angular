import { Injectable } from "@angular/core"
import { BehaviorSubject, map, Observable, Subject } from "rxjs"
import { Product } from "../types/interface"

/**
 * Service responsible for managing the shopping cart state and operations.
 * 
 * This service:
 * - Maintains the cart state using a BehaviorSubject
 * - Provides methods for adding, updating, and removing products
 * - Calculates derived cart data like total price and quantity
 * - Notifies components about cart changes
 * - Supports selective updates for better performance
 */
@Injectable({
    providedIn: "root",
})
export class CartService {
    /** BehaviorSubject that stores and emits the current cart state */
    private readonly cartSubject = new BehaviorSubject<Product[]>([])
    
    /** Subject for notifying components which specific products changed */
    private readonly refreshCartSource = new Subject<number[]>()
    
    /** Observable that components can subscribe to for change notifications */
    refreshCart$ = this.refreshCartSource.asObservable()

    /** 
     * Observable that emits the total quantity of items in the cart
     * Automatically recalculates when cart changes
     */
    readonly totalQuantity$: Observable<number> = this.cartSubject.pipe(
        map((cart) => {
            let total = 0
            for (let product of cart) { total += product.quantity }

            return total
        })
    )

    /** 
     * Observable that emits the total price of all items in the cart
     * Automatically recalculates when cart changes
     */
    readonly totalPrice$: Observable<number> = this.cartSubject.pipe(
        map((cart) => {
            let total = 0
            for (let product of cart) { total += product.price * product.quantity }

            return total
        })
    )

    /**
     * Returns an observable of the cart for components to subscribe to
     * 
     * @returns Observable that emits the current cart products array
     */
    getCart(): Observable<Product[]> {
        return this.cartSubject.asObservable()
    }

    /**
     * Returns the current cart value synchronously
     * 
     * @returns Current array of products in the cart
     */
    getCartValue(): Product[] {
        return this.cartSubject.getValue()
    }

    /**
     * Adds a product to the cart or increases its quantity if already present
     * 
     * @param product The product to add to the cart
     */
    addProductQuantity(product: Product): void {
        const cart = this.getCartValue()
        const existingProduct = this.findProduct(product)

        if (existingProduct) {
            existingProduct.quantity += 1
        } else {
            const newProduct = { ...product, quantity: 1 }
            cart.push(newProduct)
        }

        this.emitUpdatedCart(cart)
    }

    /**
     * Removes a product from the cart and updates the cart state
     * 
     * @param product The product to remove from the cart
     * @returns The ID of the removed product
     */
    removeProductFromCart(product: Product): number {
        const updatedCart = this.getCartValue().filter(
            (p) => p.id !== product.id
        )

        this.emitUpdatedCart(updatedCart)
        return product.id
    }

    /**
     * Updates the quantity of a product in the cart
     * If quantity is 0, removes the product from cart
     * If product doesn't exist and quantity > 0, adds it to cart
     * 
     * @param product The product to update
     * @param quantity New quantity to set
     * @returns The ID of the updated product
     */
    updateProductQuantity(product: Product, quantity: number): number {
        const cart = [...this.getCartValue()]
        const index = cart.findIndex((p) => p.id === product.id)

        if (index !== -1) {
            if (quantity > 0) {
                cart[index] = { ...product, quantity }
            } else {
                cart.splice(index, 1)
            }
        } else if (quantity > 0) {
            cart.push({ ...product, quantity })
        }

        this.emitUpdatedCart(cart)
        return product.id
    }

    /**
     * Gets the current quantity of a product in the cart
     * 
     * @param product The product to check
     * @returns The quantity in cart, or 0 if not in cart
     */
    getProductQuantity(product: Product): number {
        return this.findProduct(product)?.quantity ?? 0
    }

    /**
     * Checks if the cart is currently empty
     * 
     * @returns true if cart is empty, false otherwise
     */
    isEmptyCart(): boolean {
        return this.getCartValue().length === 0
    }

    /**
     * Triggers a refresh event for products in the cart
     * Components can subscribe to refreshCart$ to react to these events
     * 
     * @param changedProductIds Optional array of product IDs that changed
     */
    refreshCart(changedProductIds?: number[]): void {
        this.refreshCartSource.next(changedProductIds || [])
    }

    /**
     * Finds a product in the cart by its ID
     * 
     * @param product The product to find
     * @returns The product in the cart, or undefined if not found
     * @private
     */
    private findProduct(product: Product): Product | undefined {
        return this.getCartValue().find((p) => p.id === product.id)
    }

    /**
     * Updates the cart BehaviorSubject with new data
     * 
     * @param cart The new cart array to emit
     * @private
     */
    private emitUpdatedCart(cart: Product[]): void {
        this.cartSubject.next(cart)
    }
}
