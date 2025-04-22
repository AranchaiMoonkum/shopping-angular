import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"
// import { productResolver } from "./guards/product.resolver"
import { HomeComponent } from "./pages/home/home/home.component"

const routes: Routes = [
    {
        path: "",
        component: HomeComponent,
        // resolve: { products: productResolver },
    },
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
