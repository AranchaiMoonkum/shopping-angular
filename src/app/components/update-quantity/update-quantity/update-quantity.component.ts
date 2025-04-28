import { Component, EventEmitter, Input, Output } from "@angular/core"
import { Product } from "../../../types/interface"

/**
 * A reusable component for updating product quantities with increment/decrement
 * controls and direct input. Ensures quantity stays within allowed range.
 * 
 * Usage:
 * <app-update-quantity 
 *   [product]="productObj"
 *   [quantity]="currentQty"
 *   (quantityChange)="handleQuantityChange($event)">
 * </app-update-quantity>
 */
@Component({
    selector: "app-update-quantity",
    templateUrl: "./update-quantity.component.html",
    styleUrls: ["./update-quantity.component.scss"],
})
export class UpdateQuantityComponent {
    /** The product associated with this quantity control */
    @Input() product!: Product

    /** Current quantity value- defaults to 0 */
    @Input() quantity: number = 0

    /** Emits when quantity changes with the new quantity values */
    @Output() quantityChange = new EventEmitter<number>()

    /** Minimum allowed quantity */
    private readonly MIN_QUANTITY = 0

    /** Maximum allowed quantity */
    private readonly MAX_QUANTITY = 99

    /**
     * Increases quantity by 1, up to the maximum allowed value
     * and emits the new quantity value
     */
    increaseQuantity(): void {
        this.quantity = Math.min(this.quantity + 1, this.MAX_QUANTITY)
        this.emitQuantityChange()
    }

    /**
     * Decreases quantity by 1, down to the minimum allowed value
     * and emits the new quantity value
     */
    decreaseQuantity(): void {
        this.quantity = Math.max(this.quantity - 1, this.MIN_QUANTITY)
        this.emitQuantityChange()
    }

    /**
     * Handles direct input quantity changes
     * Ensures the input value stays within allowed range
     * 
     * @param event Input event containing the new quantity value
     */
    onInputChange(event: Event) {
        const target = (event.target as HTMLInputElement) || null
        if (!target) return

        const input = target.value
        const newQuantity = Math.min(
            this.MAX_QUANTITY,
            Math.max(this.MIN_QUANTITY, +input)
        )

        this.quantity = newQuantity
        this.emitQuantityChange()
    }

    /**
     * Emits the current quantity value to parent components
     * @private
     */
    private emitQuantityChange(): void {
        this.quantityChange.emit(this.quantity)
    }
}
