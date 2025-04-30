import { ChangeDetectionStrategy, Component } from "@angular/core"

/**
 * Component that renders the application's top navigation bar.
 * 
 * Features:
 * - Fixed header with application branding
 * - Navigation links to key sections
 * - Optimized with OnPush change detection
 */
@Component({
    standalone: false,
    selector: "app-navbar",
    templateUrl: "./navbar.component.html",
    styleUrls: ["./navbar.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent { }
