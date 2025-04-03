import { Injectable } from "@angular/core"
import { BehaviorSubject, map, Observable } from "rxjs"
import { Product } from "../types/interface"

@Injectable({
    providedIn: "root",
})
export class CartService {
    private readonly cartSubject = new BehaviorSubject<Product[]>([])

    readonly totalQuantity$: Observable<number> = this.cartSubject.pipe(
        map((cart) => cart.reduce((acc, product) => acc + product.quantity, 0))
    )

    readonly totalPrice$: Observable<number> = this.cartSubject.pipe(
        map((cart) =>
            cart.reduce(
                (acc, product) => acc + product.price * product.quantity,
                0
            )
        )
    )

    // get data from the cart observable
    getCart() {
        return this.cartSubject.asObservable()
    }

    // get product quantity from the cart observable
    getProductQuantity(product: Product) {
        const cart = this.cartSubject.getValue()
        const existingProduct = cart.find((p) => p.id === product.id)
        return existingProduct ? existingProduct.quantity : 0
    }

    // update quantity of a product in the cart
    updateProductQuantity(product: Product, quantity: number) {
        const cart = this.cartSubject.getValue()
        const cartIndex = cart.findIndex((p) => p.id === product.id)

        if (quantity === 0) {
            this.removeProductFromCart(product)
        } else {
            if (cartIndex > -1) {
                cart[cartIndex].quantity = quantity
            } else {
                product.quantity = quantity
                cart.push(product)
            }
            this.cartSubject.next([...cart]) // update observable
        }
    }

    // add product to the cart
    addProductToCart(product: Product) {
        const cart = [...this.cartSubject.value] // get the current cart value as an array
        const existingProduct = cart.find((p) => p.id === product.id) // check if the product is already in the cart

        // update the cart with the new product or increase the quantity of the existing product
        const updatedCart = existingProduct
            ? cart.map((p) =>
                  p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
              )
            : [...cart, { ...product, quantity: 1 }]

        this.cartSubject.next(updatedCart) // emit the updated cart to subscribers
    }

    // remove a product from the cart
    removeProductFromCart(product: Product): void {
        const cart = this.cartSubject.getValue()
        const updatedCart = cart.filter((p) => p.id !== product.id)

        this.cartSubject.next(updatedCart) // emit the updated cart to subscribers
    }
}
