import { Injectable } from "@angular/core"
import { BehaviorSubject } from "rxjs"
import { CartItem } from "../types/interface"

@Injectable({
    providedIn: "root",
})
export class CartService {
    private cartItems: CartItem[] = []
    private cartSubject = new BehaviorSubject<CartItem[]>([])
    private cartQuantitySubject = new BehaviorSubject<number>(0)
    private cartTotalPriceSubject = new BehaviorSubject<number>(0)

    // observable streams for cart items, cart quantity, and total price
    cart$ = this.cartSubject.asObservable()
    cartQuan$ = this.cartQuantitySubject.asObservable()
    cartTotalPrice$ = this.cartTotalPriceSubject.asObservable()

    addToCart(product: CartItem) {
        const existingProduct = this.cartItems.find(
            (item) => item.id === product.id
        )

        if (existingProduct) {
            existingProduct.quantity++
        } else {
            this.cartItems.push({ ...product, quantity: 1 })
        }

        this.cartSubject.next(this.cartItems)
        this.updateCartQuantity()
        this.updateTotalPrice()
    }

    getCartItems() {
        return this.cartItems
    }

    private updateCartQuantity() {
        const totalQuantity = this.cartItems.reduce(
            (acc, item) => acc + item.quantity,
            0
        )

        this.cartQuantitySubject.next(totalQuantity)
    }

    updateItemQuantity(productId: number, change: number) {
        const item = this.cartItems.find((item) => item.id === productId)

        if (item) {
            item.quantity = change

            if (item.quantity <= 0) {
                this.cartItems = this.cartItems.filter(
                    (item) => item.id !== productId
                )
            }
        }

        this.cartSubject.next(this.cartItems)
        this.updateCartQuantity()
        this.updateTotalPrice()
    }

    private updateTotalPrice() {
        const totalPrice = this.cartItems.reduce(
            (total, item) => total + item.price * item.quantity,
            0
        )

        this.cartTotalPriceSubject.next(totalPrice)
    }

    getTotalPrice(): number {
        return this.cartItems.reduce(
            (total, item) => total + item.price * item.quantity,
            0
        )
    }
}
