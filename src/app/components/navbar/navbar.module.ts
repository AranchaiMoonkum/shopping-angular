import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"
import { NavbarComponent } from "./navbar/navbar.component"
import { MatButtonModule } from "@angular/material/button"
import { MatIconModule } from "@angular/material/icon"
import { MatToolbarModule } from "@angular/material/toolbar"
import { MatBadgeModule } from "@angular/material/badge"

@NgModule({
    declarations: [NavbarComponent],
    imports: [
        CommonModule,

        MatButtonModule,
        MatIconModule,
        MatToolbarModule,
        MatBadgeModule,
    ],
    exports: [NavbarComponent],
})
export class NavbarModule {}
