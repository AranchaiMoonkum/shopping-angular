import { NgModule } from "@angular/core"
import { ServerModule } from "@angular/platform-server"

import { AppModule } from "./app.module"
import { AppComponent } from "./app.component"
import { NavbarModule } from "./components/navbar/navbar.module"

@NgModule({
    imports: [AppModule, ServerModule, NavbarModule],
    bootstrap: [AppComponent],
})
export class AppServerModule {}
