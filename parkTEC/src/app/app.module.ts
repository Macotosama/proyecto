import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DtoUsuarioComponent } from './controler/DTO/dto-usuario/dto-usuario.component';
import { InicioComponent } from './interfaz/inicio/inicio.component';

@NgModule({
  declarations: [
    AppComponent,
    DtoUsuarioComponent,
    InicioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
