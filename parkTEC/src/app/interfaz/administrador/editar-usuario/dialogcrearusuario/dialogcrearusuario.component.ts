import { Component, OnInit, Inject } from '@angular/core';
import { DTOAdmin } from 'src/app/controler/DTO/dtoAdmin';
import { Usuario } from 'src/app/modelo/Usuario';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dialogcrearusuario',
  templateUrl: './dialogcrearusuario.component.html',
  styleUrls: ['./dialogcrearusuario.component.scss']
})
export class DialogcrearusuarioComponent implements OnInit {
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

  constructor(public dialogRef: MatDialogRef<DialogcrearusuarioComponent>,
    private servicio: DTOAdmin, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  cerrar() {
    this.dialogRef.close();
  }

  crear() {
    if (this.usuario.apellido1 != '' && this.usuario.apellido2 != '' && this.usuario.cedula != '' && this.usuario.contrasena != '' && this.usuario.correo_institucional != ''
    && this.usuario.departamento != '' && this.usuario.email != '' && this.usuario.nombre != '' && this.usuario.puesto_laboral) {
      this.servicio.crearUsuario(this.usuario).subscribe(_ => {
        this._snackBar.open('Usuario creado correctamente', 'Aceptar');
        this.cerrar();
      })
    }
  }

}
