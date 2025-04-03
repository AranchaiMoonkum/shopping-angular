import { Component, EventEmitter, Input, Output } from "@angular/core"
import { Product } from "../../../types/interface"

@Component({
    selector: "app-update-quantity",
    templateUrl: "./update-quantity.component.html",
    styleUrl: "./update-quantity.component.scss",
})
export class UpdateQuantityComponent {
    @Input() product!: Product
    @Input() quantity: number = 0
    @Output() quantityChange = new EventEmitter<number>()

    increaseQuantity() {
        if (this.quantity === 0) {
            this.quantity = 1
        } else if (this.quantity < 99) {
            this.quantity++
        }

        this.quantityChange.emit(this.quantity)
    }

    decreaseQuantity() {
        if (this.quantity > 1) {
            this.quantity--
            this.quantityChange.emit(this.quantity)
        } else {
            this.quantity = 0
            this.quantityChange.emit(this.quantity)
        }
    }

    onInputChange(event: Event) {
        const newQuantity = Math.min(
            99,
            Math.max(1, +(event.target as HTMLInputElement).value)
        )
        this.quantity = newQuantity
        this.quantityChange.emit(this.quantity)
    }
}
