import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { ClienteModule } from './admin/cliente/cliente.module';
import { AtencionModule } from './admin/atencion/atencion.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ClienteModule,
    AtencionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
