import { Component, OnInit } from "@angular/core"
import { ApiService } from "./services/api.service"

@Component({
    standalone: false,
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrl: "./app.component.scss"
})

export class AppComponent implements OnInit {
    products: any[] = []

    constructor(private apiService: ApiService) { }

    ngOnInit(): void {
        this.apiService.getProducts().subscribe((data: any) => {
            this.products = data
        })
    }
}
