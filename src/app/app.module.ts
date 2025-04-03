// import components
import { HomeModule } from "./pages/home/home.module"

// import angular core and platform modules
import { NgModule } from "@angular/core"
import {
    BrowserModule,
    provideClientHydration,
} from "@angular/platform-browser"

// import routing module
import { AppRoutingModule } from "./app-routing.module"
import { AppComponent } from "./app.component"

// import http and animations modules
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async"
import {
    HttpClientModule,
    provideHttpClient,
    withFetch,
} from "@angular/common/http"

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, AppRoutingModule, HttpClientModule, HomeModule],
    providers: [
        provideClientHydration(),
        provideAnimationsAsync(),
        provideHttpClient(withFetch()),
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
