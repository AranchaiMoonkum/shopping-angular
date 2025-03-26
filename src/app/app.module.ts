// import angular core and platform modules
import { NgModule } from "@angular/core"
import { BrowserModule, provideClientHydration } from "@angular/platform-browser"

// import routing module
import { AppRoutingModule } from "./app-routing.module"
import { AppComponent } from "./app.component"

// import http and animations modules
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async"
import { HttpClientModule, provideHttpClient, withFetch } from "@angular/common/http"

// import ui components
import { MatCardModule } from "@angular/material/card"
import { MatDividerModule } from "@angular/material/divider"

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        MatCardModule,
        MatDividerModule
    ],
    providers: [provideClientHydration(), provideAnimationsAsync(), provideHttpClient(withFetch())],
    bootstrap: [AppComponent]
})

export class AppModule { }
