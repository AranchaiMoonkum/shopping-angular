import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"
import { NavbarComponent } from "./navbar/navbar.component"
import { MatButtonModule } from "@angular/material/button"
import { MatSidenavModule } from "@angular/material/sidenav"
import { MatSelectModule } from "@angular/material/select"
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatListModule } from "@angular/material/list"
import { MatIconModule } from "@angular/material/icon"
import { MatToolbarModule } from "@angular/material/toolbar"
import { HomeModule } from "../home/home.module"

@NgModule({
    declarations: [NavbarComponent],
    imports: [
        CommonModule,

        MatButtonModule,
        MatSidenavModule,
        MatButtonModule,
        MatSelectModule,
        MatFormFieldModule,
        MatListModule,
        MatIconModule,
        MatToolbarModule,

        HomeModule,
    ],
    exports: [NavbarComponent],
})
export class NavbarModule {}
