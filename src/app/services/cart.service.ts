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

    // get data from the cart observable
    getCart() {
        return this.cartSubject.asObservable()
    }

    // get product quantity from the cart observable
    getProductQuantity(product: Product) {
        const existingProduct = this.cartSubject
            .getValue()
            .find((p) => p.id === product.id)
        return existingProduct ? existingProduct.quantity : 0
    }

    // method to check if the cart is empty
    isEmptyCart(): boolean {
        return this.cartSubject.getValue().length === 0
    }

    // update quantity of a product in the cart
    updateProductQuantity(product: Product, quantity: number) {
        if (quantity === 0) {
            this.removeProductFromCart(product)
        } else {
            const cart = this.cartSubject.getValue()
            const existingProduct = cart.find((p) => p.id === product.id)

            const updatedCart = existingProduct
                ? cart.map((p) =>
                      p.id === product.id ? { ...p, quantity } : p
                  )
                : [...cart, { ...product, quantity }]

            this.updateCart(updatedCart)
        }
    }

    // add product to the cart
    addProductToCart(product: Product) {
        const cart = this.cartSubject.getValue()
        const existingProduct = cart.find((p) => p.id === product.id) // check if the product is already in the cart

        const updatedCart = existingProduct
            ? cart.map((p) =>
                  p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
              )
            : [...cart, { ...product, quantity: 1 }]
        this.updateCart(updatedCart)
    }

    // remove a product from the cart
    removeProductFromCart(product: Product): void {
        const updatedCart = this.cartSubject
            .getValue()
            .filter((p) => p.id !== product.id)
        this.updateCart(updatedCart)
    }

    private updateCart(cart: Product[]): void {
        this.cartSubject.next([...cart])
    }
}
