import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DTOAdmin } from 'src/app/controler/DTO/dtoAdmin';
import { Usuario } from 'src/app/modelo/Usuario';

@Component({
  selector: 'app-ediitar-perfil',
  templateUrl: './ediitar-perfil.component.html',
  styleUrls: ['./ediitar-perfil.component.scss']
})
export class EdiitarPerfilComponent implements OnInit {
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

  constructor(public dialogRef: MatDialogRef<EdiitarPerfilComponent>,
    private servicio: DTOAdmin, @Inject(MAT_DIALOG_DATA) public data: Usuario,
    private _snackBar: MatSnackBar) { 
      this.usuario = data;
    }

  ngOnInit(): void {
  }

  cerrar() {
    this.dialogRef.close();
  }

  editar() {
    if (this.usuario.apellido1 != '' && this.usuario.apellido2 != '' && this.usuario.cedula != '' && this.usuario.contrasena != '' && this.usuario.correo_institucional != ''
    && this.usuario.departamento != '' && this.usuario.email != '' && this.usuario.nombre != '' && this.usuario.puesto_laboral) {
      this.servicio.editarUsuario(this.usuario).subscribe(_ => {
        this._snackBar.open('Datos actualizados', 'Aceptar');
        this.cerrar();
      })
    }
  }
}
