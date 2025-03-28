import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"
import { productResolver } from "./guards/product.resolver"
import { NavbarComponent } from "./components/navbar/navbar/navbar.component"

const routes: Routes = [
    {
        path: "",
        component: NavbarComponent,
        resolve: { products: productResolver },
    },
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
