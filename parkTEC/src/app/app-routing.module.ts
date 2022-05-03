import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './interfaz/inicio/inicio.component';
import { MenuPrincipalComponent } from './interfaz/funcionario/menu-principal/menu-principal.component';
import { CrearReservacionComponent } from './interfaz/funcionario/crear-reservacion/crear-reservacion.component';
import { ReservacionesComponent } from './interfaz/funcionario/reservaciones/reservaciones.component';

const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: 'inicio', component: InicioComponent },
  { path: 'menuFuncionario', component: MenuPrincipalComponent },
  { path: 'crearReser', component: CrearReservacionComponent},
  { path: 'reservaciones', component: ReservacionesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
