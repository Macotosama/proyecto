import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DTOAdmin } from 'src/app/controler/DTO/dtoAdmin';
import { MatDialog } from '@angular/material/dialog';
import { DialogeditusuarioComponent } from './dialogeditusuario/dialogeditusuario.component';
import { DialogcrearusuarioComponent } from './dialogcrearusuario/dialogcrearusuario.component';
import { Usuario } from 'src/app/modelo/Usuario';
import { Vehiculo } from 'src/app/modelo/Vehiculo';
import { Horario } from 'src/app/modelo/Horario';

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

  lunes: Horario = {
    dia_semana: '',
    horas_entradas: '',
    horas_salidas: '',
    idusuario: '',
    id: ''
  }
  
  martes: Horario = {
    dia_semana: '',
    horas_entradas: '',
    horas_salidas: '',
    idusuario: '',
    id: ''
  }

  miercoles: Horario = {
    dia_semana: '',
    horas_entradas: '',
    horas_salidas: '',
    idusuario: '',
    id: ''
  }

  jueves: Horario = {
    dia_semana: '',
    horas_entradas: '',
    horas_salidas: '',
    idusuario: '',
    id: ''
  }

  viernes: Horario = {
    dia_semana: '',
    horas_entradas: '',
    horas_salidas: '',
    idusuario: '',
    id: ''
  }

  sabado: Horario = {
    dia_semana: '',
    horas_entradas: '',
    horas_salidas: '',
    idusuario: '',
    id: ''
  }

  domingo: Horario = {
    dia_semana: '',
    horas_entradas: '',
    horas_salidas: '',
    idusuario: '',
    id: ''
  }

  automoviles = new Array<Vehiculo>();

  constructor(private _snackBar: MatSnackBar, private dto: DTOAdmin, public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  buscarUsuario() {
    if (this.nombre != '' && this.apellido1 != '' && this.apellido2 != '') {
      this.dto.buscarUsuario(this.nombre, this.apellido1, this.apellido2).subscribe(res  => {
        if (res.estatus != {}) {
          res = res[0];
          this.dto.busquedaFuncionario(res.id).subscribe(res2 => {
            console.log(res)
            console.log(res2)
            if (res2.length != 0) {
              this.usuario.apellido1 = res.apellido1;
              this.usuario.apellido2 = res.apellido2;
              this.usuario.cedula = res.cedula;
              this.usuario.contrasena = res.contrasena;
              this.usuario.discapacidad = res2[0].discapacidad;
              this.usuario.email = res.email
              this.usuario.departamento = res2[0].departamento;
              this.usuario.jefe = res2[0].jefe;
              this.usuario.nombre = res.nombre;
              this.usuario.puesto_laboral = res2[0].puesto_laboral;
              this.usuario.tipo_usuario = res.tipo_usuario;
              this.usuario.correo_institucional = res.correo_institucional;
              this.usuario.id = res.Id;

              this.dto.horarios(res2[0].id).subscribe(res3 => {
                console.log(res3)
                for (let i = 0; i < res3.length; i++) {
                  var temp = {
                    dia_semana: res3[i].dia_semana,
                    horas_entradas: this.parceTime(res3[i].hora_entrada._seconds),
                    horas_salidas: this.parceTime(res3[i].hora_salida._seconds),
                    idusuario: res3[i].idusuario,
                    id: res3[i].id,
                  };
                  if (res3[i].dia_semana == 'Lunes') {
                    this.lunes = temp;
                  } else if (res3[i].dia_semana == 'Martes') {
                    this.martes = temp;
                  } else if (res3[i].dia_semana == 'Miércoles') {
                    this.miercoles = temp;
                  } else if (res3[i].dia_semana == 'Jueves') {
                    this.jueves = temp;
                  } else if (res3[i].dia_semana == 'Viernes') {
                    this.viernes = temp;
                  } else if (res3[i].dia_semana == 'Sábado') {
                    this.sabado = temp;
                  } else {
                    this.domingo = temp;
                  }
                }
              })
              // console.log(res2[0].id)
              this.getAutomoviles(res2[0].id);
            } else {
              this._snackBar.open('No existe ese funcionario', 'Aceptar');
            }
          })

        } else {
          this._snackBar.open('No existe ese funcionario', 'Aceptar');
        }
      })
    } else {
      this._snackBar.open('Ingrese los datos solicitados', 'Aceptar');
    }
  }

  parceTime(secundos: number) {
    var date = new Date(secundos * 1000);
    var hora = date.getHours();
    var minutos = date.getMinutes();
    var res = ''
    if (hora < 10) {
      res += `0${hora}`;
    } else {
      res += `${hora}`;
    }

    if (minutos < 10) {
      res += `:0${minutos}`;
    } else {
      res += `:${minutos}`;
    }
    return res;
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

  getAutomoviles(id: string) {
    this.dto.vehiculosId(id).subscribe(res => {
      this.automoviles = res;
    })
  }

}
