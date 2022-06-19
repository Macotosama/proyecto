import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/modelo/Usuario';
import { CookieService } from 'ngx-cookie-service';
import { DTOUsuario } from 'src/app/controler/DTO/dtoUsuario';
import { Vehiculo } from 'src/app/modelo/Vehiculo';
import { MatDialog } from '@angular/material/dialog';
import { EditarautomovilComponent } from './editarautomovil/editarautomovil.component';
import { CrearautomovilComponent } from './crearautomovil/crearautomovil.component';
import { EdiitarPerfilComponent } from './ediitar-perfil/ediitar-perfil.component';
import { Horario } from 'src/app/modelo/Horario';
import { Perfil } from 'src/app/modelo/Perfil';
import { DTOAdmin } from 'src/app/controler/DTO/dtoAdmin';

@Component({
  selector: 'app-info-usuario',
  templateUrl: './info-usuario.component.html',
  styleUrls: ['./info-usuario.component.scss']
})
export class InfoUsuarioComponent implements OnInit {
  perfil: Perfil = {
    idFuncionario: '',
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

  nombre = '';

  automoviles = new Array<Vehiculo>();

  constructor(private dtoU: DTOUsuario, private cookieService: CookieService, public dialog: MatDialog, private dto2: DTOAdmin) { }

  ngOnInit(): void {
    this.getUsuario();
    this.nombreFuncionario();
  }

  nombreFuncionario() {
    this.nombre = this.cookieService.get('nombre');
  }

  getAutomoviles(id: string) {
    this.dto2.vehiculosId(id).subscribe(res => {
      this.automoviles = res;
    })
  }

  getUsuario() {
    this.dtoU.busquedaId(this.cookieService.get("funcionario")).subscribe(res => {
      this.dto2.busquedaFuncionario(res.id).subscribe(res2 => {
        this.perfil.idFuncionario = res2[0].id;
        this.perfil.usuario = {
          apellido1: res.apellido1,
          apellido2: res.apellido2,
          cedula: res.cedula,
          contrasena: res.contrasenna,
          discapacidad: res2[0].discapacidad,
          email: res.email,
          departamento: res2[0].departamento,
          jefe: res2[0].jefe,
          nombre: res.nombre,
          puesto_laboral: res2[0].puesto_laboral,
          tipo_usuario: res.tipo_usuario,
          correo_institucional: res.correo_institucional,
          id: res.id,
        }
        this.dto2.horarios(res2[0].id).subscribe(res3 => {
          for (let i = 0; i < res3.length; i++) {
            var temp = {
              dia_semana: res3[i].dia_semana,
              horas_entradas: this.parceTime(res3[i].hora_entrada._seconds),
              horas_salidas: this.parceTime(res3[i].hora_salida._seconds),
              idusuario: res3[i].idfuncionario,
              id: res3[i].Id,
            };
            if (res3[i].dia_semana == 'Lunes') {
              this.perfil.horarios.lunes = temp;
            } else if (res3[i].dia_semana == 'Martes') {
              this.perfil.horarios.martes = temp;
            } else if (res3[i].dia_semana == 'Miércoles') {
              this.perfil.horarios.miercoles = temp;
            } else if (res3[i].dia_semana == 'Jueves') {
              this.perfil.horarios.jueves = temp;
            } else if (res3[i].dia_semana == 'Viernes') {
              this.perfil.horarios.viernes = temp;
            } else if (res3[i].dia_semana == 'Sábado') {
              this.perfil.horarios.sabado = temp;
            } else {
              this.perfil.horarios.domingo = temp;
            }
          }
        })
        this.getAutomoviles(res2[0].id);
      })
    });
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

  openEdit(ato: Vehiculo) {
    this.dialog.open(EditarautomovilComponent, {
      width: '500px', height: '700px', data:ato});
  }

  openEditInfoUsuario () {
    this.dialog.open(EdiitarPerfilComponent, {
      width: '1000px', height: '900px', data: this.perfil}); 
  }

  openCreate() {
    this.dialog.open(CrearautomovilComponent, {
      width: '500px', height: '700px'});
  }

}
