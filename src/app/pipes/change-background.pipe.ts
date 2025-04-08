import { Pipe, PipeTransform } from "@angular/core"

@Pipe({
    name: "changeBackground",
})
export class ChangeBackgroundPipe implements PipeTransform {
    transform(quantity: number): string {
        if (quantity === 1) {
            return "lightgreen"
        } else if (quantity > 1) {
            return "lightblue"
        }

        return "white"
    }
}
