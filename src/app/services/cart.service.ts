import { Injectable } from "@angular/core"
import { BehaviorSubject, map, Observable, shareReplay } from "rxjs"
import { Product } from "../types/interface"

@Injectable({
    providedIn: "root",
})
export class CartService {
    private readonly cartSubject = new BehaviorSubject<Product[]>([])

    readonly totalQuantity$: Observable<number> = this.cartSubject.pipe(
        map((cart) => cart.reduce((acc, product) => acc + product.quantity, 0)),
        shareReplay(1)
    )

    readonly totalPrice$: Observable<number> = this.cartSubject.pipe(
        map((cart) =>
            cart.reduce(
                (acc, product) => acc + product.price * product.quantity,
                0
            )
        ),
        shareReplay(1)
    )

    getCart() {
        return this.cartSubject.asObservable()
    }

    getProductQuantity(product: Product): number {
        return this.findProduct(product)?.quantity ?? 0
    }

    isEmptyCart(): boolean {
        return this.cartItems.length === 0
    }

    updateProductQuantity(product: Product, quantity: number): void {
        let updatedCart =
            quantity === 0
                ? this.cartItems.filter((p) => p.id !== product.id)
                : this.cartItems.some((p) => p.id === product.id)
                ? this.cartItems.map((p) =>
                      p.id === product.id ? { ...p, quantity } : p
                  )
                : [...this.cartItems, { ...product, quantity }]
        this.emitUpdatedCart(updatedCart)
    }

    addProductQuantity(product: Product): void {
        const existingProduct = this.findProduct(product)
        const updatedCart = existingProduct
            ? this.cartItems.map((p) =>
                  p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
              )
            : [...this.cartItems, { ...product, quantity: 1 }]
        this.emitUpdatedCart(updatedCart)
    }

    removeProductFromCart(product: Product): void {
        const updatedCart = this.cartItems.filter((p) => p.id !== product.id)
        this.emitUpdatedCart(updatedCart)
    }

    private get cartItems(): Product[] {
        return this.cartSubject.getValue()
    }

    private findProduct(product: Product): Product | undefined {
        return this.cartItems.find((p) => p.id === product.id)
    }

    private emitUpdatedCart(cart: Product[]): void {
        this.cartSubject.next([...cart])
    }
}
