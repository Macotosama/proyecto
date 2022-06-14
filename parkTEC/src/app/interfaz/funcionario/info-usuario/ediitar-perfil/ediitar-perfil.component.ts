import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DTOAdmin } from 'src/app/controler/DTO/dtoAdmin';
import { Perfil } from 'src/app/modelo/Perfil';
import { Usuario } from 'src/app/modelo/Usuario';

@Component({
  selector: 'app-ediitar-perfil',
  templateUrl: './ediitar-perfil.component.html',
  styleUrls: ['./ediitar-perfil.component.scss']
})
export class EdiitarPerfilComponent implements OnInit {
  perfil: Perfil = {
    horarios: {
      lunes: {
        dia_semana: '',
        horas_entradas: '',
        horas_salidas: '',
        idusuario: '',
        id: ''
      },
      martes: {
        dia_semana: '',
        horas_entradas: '',
        horas_salidas: '',
        idusuario: '',
        id: ''
      },
      miercoles: {
        dia_semana: '',
        horas_entradas: '',
        horas_salidas: '',
        idusuario: '',
        id: ''
      },
      jueves: {
        dia_semana: '',
        horas_entradas: '',
        horas_salidas: '',
        idusuario: '',
        id: ''
      },
      viernes: {
        dia_semana: '',
        horas_entradas: '',
        horas_salidas: '',
        idusuario: '',
        id: ''
      },
      sabado: {
        dia_semana: '',
        horas_entradas: '',
        horas_salidas: '',
        idusuario: '',
        id: ''
      },
      domingo: {
        dia_semana: '',
        horas_entradas: '',
        horas_salidas: '',
        idusuario: '',
        id: ''
      },
    },

    usuario: {
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
    },
  }


  constructor(public dialogRef: MatDialogRef<EdiitarPerfilComponent>,
    private servicio: DTOAdmin, @Inject(MAT_DIALOG_DATA) public data: Perfil,
    private _snackBar: MatSnackBar) { 
      this.perfil = data;
    }

  ngOnInit(): void {
  }

  cerrar() {
    this.dialogRef.close();
  }

  editar() {
    if (this.perfil.usuario.apellido1 != '' && this.perfil.usuario.apellido2 != '' && this.perfil.usuario.cedula != '' && this.perfil.usuario.contrasena != '' && this.perfil.usuario.correo_institucional != ''
    && this.perfil.usuario.departamento != '' && this.perfil.usuario.email != '' && this.perfil.usuario.nombre != '' && this.perfil.usuario.puesto_laboral) {
      this.servicio.editarUsuario(this.perfil.usuario).subscribe(_ => {
        this._snackBar.open('Datos actualizados', 'Aceptar');
        this.cerrar();
      })
    }
  }
}
