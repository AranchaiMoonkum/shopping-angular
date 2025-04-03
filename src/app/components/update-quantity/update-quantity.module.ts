import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"
import { UpdateQuantityComponent } from "./update-quantity/update-quantity.component"
import { MatButtonModule } from "@angular/material/button"

@NgModule({
    declarations: [UpdateQuantityComponent],
    exports: [UpdateQuantityComponent],
    imports: [CommonModule, MatButtonModule],
})
export class UpdateQuantityModule {}
