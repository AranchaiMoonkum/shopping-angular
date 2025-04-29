import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"
import { HomeComponent } from "./pages/home/home/home.component"
import { productResolver } from "./guards/product.resolver"
import { ShowProductComponent } from "./components/show-product/show-product/show-product.component"

const routes: Routes = [
    {
        path: "",
        component: HomeComponent,
        resolve: {
            products: productResolver
        }
    },
    {
        path: "products",
        component: ShowProductComponent,
        resolve: {
            products: productResolver
        }
    }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
