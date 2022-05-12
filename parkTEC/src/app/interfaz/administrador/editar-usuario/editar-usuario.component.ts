import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DTOAdmin } from 'src/app/controler/DTO/dtoAdmin';
import { MatDialog } from '@angular/material/dialog';
import { DialogeditusuarioComponent } from './dialogeditusuario/dialogeditusuario.component';
import { DialogcrearusuarioComponent } from './dialogcrearusuario/dialogcrearusuario.component';
import { Usuario } from 'src/app/modelo/Usuario';


@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.scss']
})
export class EditarUsuarioComponent implements OnInit {
  nombre = '';
  apellido1 = '';
  apellido2 = '';

  usuario: Usuario = {
    apellido1: '',
    apellido2: '',
    cedula: '',
    contrasena: '',
    discapacidad: true,
    email: '',
    departamento: '',
    jefe: true,
    nombre: '',
    puesto_laboral: '',
    tipo_usuario: true,
    correo_institucional: '',
    id: ''
  }

  constructor(private _snackBar: MatSnackBar, private dto: DTOAdmin, public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  buscarUsuario() {
    if (this.nombre != '' && this.apellido1 != '' && this.apellido2 != '') {
      this.dto.buscarUsuario(this.nombre, this.apellido1, this.apellido2).subscribe(res  => {
        if (res.estatus != {}) {
          res = res[0];
          this.usuario.apellido1 = res.apellido1;
          this.usuario.apellido2 = res.apellido2;
          this.usuario.cedula = res.cedula;
          this.usuario.contrasena = res.contrasena;
          this.usuario.discapacidad = res.discapacidad;
          this.usuario.email = res.email
          this.usuario.departamento = res.departamento;
          this.usuario.jefe = res.jefe;
          this.usuario.nombre = res.nombre;
          this.usuario.puesto_laboral = res.puesto_laboral;
          this.usuario.tipo_usuario = res.tipo_usuario;
          this.usuario.correo_institucional = res.correo_institucional;
          this.usuario.id = res.Id;
        } else {
          this._snackBar.open('Correo electrónico o contraseña equivocados', 'Aceptar');
        }
      })
    } else {
      this._snackBar.open('Ingrese los datos solicitados', 'Aceptar');
    }
  }

  openEdit() {
    this.dialog.open(DialogeditusuarioComponent, {
      width: '500px', height: '780px', data:this.usuario});
  }

  openCrear() {
    this.dialog.open(DialogcrearusuarioComponent, {
      width: '500px', height: '780px'});
  }

  openEliminar() {
    if (this.nombre != '') {
      this.dto.eliminarUsuario(this.usuario.id)
    } else {
      this._snackBar.open('Ingrese el usuario que desea eliminar', 'Aceptar');
    }
  }

}
