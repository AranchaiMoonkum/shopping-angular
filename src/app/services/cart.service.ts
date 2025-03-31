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

    cart$ = this.cartSubject.asObservable()
    cartQuan$ = this.cartQuantitySubject.asObservable()

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

    getTotalPrice(): number {
        return this.cartItems.reduce(
            (total, item) => total + item.price * item.quantity,
            0
        )
    }
}
