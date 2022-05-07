import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './interfaz/inicio/inicio.component';
import { MenuPrincipalComponent } from './interfaz/funcionario/menu-principal/menu-principal.component';
import { CrearReservacionComponent } from './interfaz/funcionario/crear-reservacion/crear-reservacion.component';
import { ReservacionesComponent } from './interfaz/funcionario/reservaciones/reservaciones.component';
import { InfoUsuarioComponent } from './interfaz/funcionario/info-usuario/info-usuario.component';
import { MenuAdminComponent } from './interfaz/administrador/menu-admin/menu-admin.component';
import { ParqueosComponent } from './interfaz/administrador/parqueos/parqueos.component';
import { EditarUsuarioComponent } from './interfaz/administrador/editar-usuario/editar-usuario.component';

const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: 'inicio', component: InicioComponent },
  { path: 'menuFuncionario', component: MenuPrincipalComponent },
  { path: 'crearReser', component: CrearReservacionComponent },
  { path: 'reservaciones', component: ReservacionesComponent },
  { path: 'infousuario', component: InfoUsuarioComponent },
  { path: 'menuAdmin', component: MenuAdminComponent },
  { path: 'parqueos', component: ParqueosComponent },
  { path: 'editUsuario', component: EditarUsuarioComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
