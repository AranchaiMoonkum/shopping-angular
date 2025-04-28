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

    readonly totalQuantity$: Observable<number> = this.cartSubject.pipe(
        map((cart) => {
            let quantity = 0
            cart.forEach((product) => {
                quantity += product.quantity
            })
            return quantity
        })
    )

    readonly totalPrice$: Observable<number> = this.cartSubject.pipe(
        map((cart) => {
            let price = 0
            cart.forEach((product) => {
                price += product.price * product.quantity
            })
            return price
        })
    )

    getCart() {
        return this.cartSubject.asObservable()
    }

    getCartValue(): Product[] {
        return this.cartSubject.getValue()
    }

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

    removeProductFromCart(product: Product) {
        const updatedCart = this.getCartValue().filter((p) => p.id !== product.id)

        this.emitUpdatedCart(updatedCart)
        return product.id
    }

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

    getProductQuantity(product: Product): number {
        return this.findProduct(product)?.quantity ?? 0
    }

    isEmptyCart(): boolean {
        return this.getCartValue().length === 0
    }

    refreshCart(changedProductIds?: number[]): void {
        this.refreshCartSource.next(changedProductIds || [])
    }

    private findProduct(product: Product): Product | undefined {
        return this.getCartValue().find((p) => p.id === product.id)
    }

    private emitUpdatedCart(cart: Product[]) {
        this.cartSubject.next(cart)
    }
}
