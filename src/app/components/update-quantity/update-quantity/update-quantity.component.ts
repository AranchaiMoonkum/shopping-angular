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

    private readonly MIN_QUANTITY = 0
    private readonly MAX_QUANTITY = 99

    increaseQuantity(): void {
        this.quantity = Math.min(this.quantity + 1, this.MAX_QUANTITY)
        this.emitQuantityChange()
    }

    decreaseQuantity() {
        this.quantity = Math.max(this.quantity - 1, this.MIN_QUANTITY)
        this.emitQuantityChange()
    }

    onInputChange(event: Event) {
        const input = (event.target as HTMLInputElement).value
        const newQuantity = Math.min(
            this.MAX_QUANTITY,
            Math.max(this.MIN_QUANTITY, +input)
        )

        this.quantity = newQuantity
        this.emitQuantityChange()
    }

    private emitQuantityChange(): void {
        this.quantityChange.emit(this.quantity)
    }
}
