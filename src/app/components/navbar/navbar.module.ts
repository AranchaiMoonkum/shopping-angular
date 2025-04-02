// import Angular core modules
import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"

// import components
import { NavbarComponent } from "./navbar/navbar.component"

// import Angular Material modules
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
