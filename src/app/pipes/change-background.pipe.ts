import { Pipe, PipeTransform } from "@angular/core"

/**
 * Pipe that transforms a product quantity value into an appropriate background color.
 * 
 * This pipe:
 * - Returns different colors based on the product quantity
 * - Helps visually distinguish products with different cart quantities
 * - Can be used directly in template bindings with pipe syntax
 * 
 * Color mapping:
 * - quantity = 0: white (default)
 * - quantity = 1: lightgreen
 * - quantity > 1: lightblue
 * 
 * @example
 * <!-- In a template -->
 * <div [ngStyle]="{ 'background-color': productQuantity | changeBackground }">
 *   Product content
 * </div>
 */
@Pipe({
    name: "changeBackground",
})
export class ChangeBackgroundPipe implements PipeTransform {
    /**
     * Transforms a quantity number into a CSS color string
     * 
     * @param quantity The product quantity to transform
     * @returns A CSS color string based on the quantity value
     */
    transform(quantity: number): string {
        if (quantity === 1) {
            return "lightgreen"
        } else if (quantity > 1) {
            return "lightblue"
        }

        return "white"
    }
}
