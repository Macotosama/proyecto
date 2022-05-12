import { Component, OnInit, Inject } from '@angular/core';
import { DTOAdmin } from 'src/app/controler/DTO/dtoAdmin';
import { Usuario } from 'src/app/modelo/Usuario';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dialogeditusuario',
  templateUrl: './dialogeditusuario.component.html',
  styleUrls: ['./dialogeditusuario.component.scss']
})
export class DialogeditusuarioComponent implements OnInit {
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

  constructor(public dialogRef: MatDialogRef<DialogeditusuarioComponent>,
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
