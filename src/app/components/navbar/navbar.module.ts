import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"
import { NavbarComponent } from "./navbar/navbar.component"
import { DialogButtonModule } from "../dialog-button/dialog-button.module"
import { MatButtonModule } from "@angular/material/button"
import { MatIconModule } from "@angular/material/icon"
import { MatToolbarModule } from "@angular/material/toolbar"
import { MatBadgeModule } from "@angular/material/badge"
import { MatDialogModule } from "@angular/material/dialog"

/**
 * Module that provides the application's navigation header component.
 * 
 * This module:
 * - Declares and exports the NavbarComponent for site navigation
 * - Integrates with DialogButtonModule for cart functionality
 * - Imports Angular Material modules for UI components
 * 
 * The NavbarComponent displays:
 * - Application branding and title
 * - Navigation links
 * - Shopping cart button with item count badge
 * 
 * @example
 * // Import in the AppModule:
 * import { NavbarModule } from "./components/navbar/navbar.module"
 * 
 * @NgModule({
 *   imports: [
 *     // other imports...
 *     NavbarModule
 *   ]
 * })
 * export class AppModule { }
 */
@NgModule({
    declarations: [NavbarComponent],
    imports: [
        CommonModule,
        MatDialogModule,
        MatButtonModule,
        MatIconModule,
        MatToolbarModule,
        MatBadgeModule,
        DialogButtonModule,
    ],
    exports: [NavbarComponent],
})
export class NavbarModule {}
