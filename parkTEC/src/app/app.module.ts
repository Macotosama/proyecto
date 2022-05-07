import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DtoUsuarioComponent } from './controler/DTO/dto-usuario/dto-usuario.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CookieService } from 'ngx-cookie-service';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';

import { InicioComponent } from './interfaz/inicio/inicio.component';
import { MenuPrincipalComponent } from './interfaz/funcionario/menu-principal/menu-principal.component';
import { CrearReservacionComponent } from './interfaz/funcionario/crear-reservacion/crear-reservacion.component';
import { ReservacionesComponent } from './interfaz/funcionario/reservaciones/reservaciones.component';
import { InfoUsuarioComponent } from './interfaz/funcionario/info-usuario/info-usuario.component';
import { MenuAdminComponent } from './interfaz/administrador/menu-admin/menu-admin.component';
import { ParqueosComponent } from './interfaz/administrador/parqueos/parqueos.component';
import { EditarUsuarioComponent } from './interfaz/administrador/editar-usuario/editar-usuario.component';

@NgModule({
  declarations: [
    AppComponent,
    DtoUsuarioComponent,
    InicioComponent,
    MenuPrincipalComponent,
    CrearReservacionComponent,
    ReservacionesComponent,
    InfoUsuarioComponent,
    MenuAdminComponent,
    ParqueosComponent,
    EditarUsuarioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatIconModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatRadioModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
