import { Injectable } from "@angular/core"
import { BehaviorSubject, map, Observable, Subject } from "rxjs"
import { Product } from "../types/interface"

@Injectable({
    providedIn: "root",
})
export class CartService {
    private readonly cartSubject = new BehaviorSubject<Product[]>([])

    private readonly refreshCartSource = new Subject<number[]>()
    refreshCart$ = this.refreshCartSource.asObservable()

    // observable that emits the total quantity of product in the cart
    readonly totalQuantity$: Observable<number> = this.cartSubject.pipe(
        map((cart) =>
            cart.reduce((total, product) => total + product.quantity, 0)
        )
    )

    // observable that emits the total price of product in the cart
    readonly totalPrice$: Observable<number> = this.cartSubject.pipe(
        map((cart) =>
            cart.reduce(
                (total, product) => total + product.price * product.quantity,
                0
            )
        )
    )

    // returns as observable of the cart
    getCart() {
        return this.cartSubject.asObservable()
    }

    // return the current value of the cart
    getCartValue(): Product[] {
        return this.cartSubject.getValue()
    }

    //  adds a product to the cart or increases the quantity of the product in the cart
    addProductQuantity(product: Product) {
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
     * removes a product from the cart and updates the cart state
     * @returns the id of the removed product from the cart
     */
    removeProductFromCart(product: Product) {
        const updatedCart = this.getCartValue().filter(
            (p) => p.id !== product.id
        )

        this.emitUpdatedCart(updatedCart)
        return product.id
    }

    /**
     * updates the quantity of a product in the cart and updates the cart state
     * @returns the ID of the updated product from the cart
     */
    updateProductQuantity(product: Product, quantity: number) {
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

    // gets the quantity of a product in the cart
    getProductQuantity(product: Product): number {
        return this.findProduct(product)?.quantity ?? 0
    }

    // checks if the cart is empty
    isEmptyCart(): boolean {
        return this.getCartValue().length === 0
    }

    /**
     * triggers a refresh event for products in the cart
     * @param changedProductIds optional array of product
     */
    refreshCart(changedProductIds?: number[]): void {
        this.refreshCartSource.next(changedProductIds || [])
    }

    // finds a product in the cart by its ID
    private findProduct(product: Product): Product | undefined {
        return this.getCartValue().find((p) => p.id === product.id)
    }

    // updates the cart BehaviorSubject with new data
    private emitUpdatedCart(cart: Product[]) {
        this.cartSubject.next(cart)
    }
}
