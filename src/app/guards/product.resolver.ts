import { inject } from "@angular/core"
import { ResolveFn } from "@angular/router"
import { ApiService } from "../services/api.service"

export const productResolver: ResolveFn<any[]> = () => {
    const apiService = inject(ApiService)
    return apiService.getProducts()
}
