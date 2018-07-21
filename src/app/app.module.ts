import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CordovaService } from './service/cordova.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    { provide: CordovaService, useClass: CordovaService },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
