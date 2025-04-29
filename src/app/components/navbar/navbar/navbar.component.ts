import { ChangeDetectionStrategy, Component } from "@angular/core"
import { ProductService } from "../../../services/product.service"

/**
 * Component that renders the application's top navigation bar.
 * 
 * Features:
 * - Fixed header with application branding
 * - Navigation links to key sections
 * - Optimized with OnPush change detection
 * - Timestamp display for data refresh indicators
 */
@Component({
    standalone: false,
    selector: "app-navbar",
    templateUrl: "./navbar.component.html",
    styleUrls: ["./navbar.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
    /**
     * @param productService Service for accessing product utilities
     */
    constructor(private readonly productService: ProductService) {}

    /**
     * Gets the current timestamp from the product service
     * Used for displaying when data was last refreshed
     * 
     * @returns Current timestamp number
     */
    getTimeStamp(): number {
        return this.productService.getTimeStamp()
    }
}
