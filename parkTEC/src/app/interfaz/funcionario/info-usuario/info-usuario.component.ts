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

@Component({
  selector: 'app-info-usuario',
  templateUrl: './info-usuario.component.html',
  styleUrls: ['./info-usuario.component.scss']
})
export class InfoUsuarioComponent implements OnInit {
  usaurio: Usuario = {
    apellido1: '',
    apellido2: '',
    cedula: '',
    contrasena: '',
    discapacidad: false,
    email: '',
    departamento: '',
    jefe: false,
    nombre: '',
    puesto_laboral: '',
    tipo_usuario: false,
    correo_institucional: '',
    id: '',
  };

  lunes: Horario = {
    dia_semana: '',
    horas_entradas: '',
    horas_salidas: '',
    idusuario: '',
    id: ''
  };
  martes: Horario = {
    dia_semana: '',
    horas_entradas: '',
    horas_salidas: '',
    idusuario: '',
    id: ''
  };
  miercoles: Horario = {
    dia_semana: '',
    horas_entradas: '',
    horas_salidas: '',
    idusuario: '',
    id: ''
  };
  jueves: Horario = {
    dia_semana: '',
    horas_entradas: '',
    horas_salidas: '',
    idusuario: '',
    id: ''
  };
  viernes: Horario = {
    dia_semana: '',
    horas_entradas: '',
    horas_salidas: '',
    idusuario: '',
    id: ''
  };
  sabado: Horario = {
    dia_semana: '',
    horas_entradas: '',
    horas_salidas: '',
    idusuario: '',
    id: ''
  };
  domingo: Horario = {
    dia_semana: '',
    horas_entradas: '',
    horas_salidas: '',
    idusuario: '',
    id: ''
  };

  automoviles = new Array<Vehiculo>();

  constructor(private dtoU: DTOUsuario, private cookieService: CookieService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getUsuario();
    this.getAutomoviles();
    this.obtenerHorarios();
  }

  getAutomoviles() {
    this.dtoU.vehiculosId(this.cookieService.get("funcionario")).subscribe(res => {
      this.automoviles = res;
    })
  }

  getUsuario() {
    this.dtoU.busquedaId(this.cookieService.get("funcionario")).subscribe(res => {
      console.log(res)
      this.usaurio = {
        apellido1: res.apellido1,
        apellido2: res.apellido2,
        cedula: res.cedula,
        contrasena: res.contrasena,
        discapacidad: res.discapacidad,
        email: res.email,
        departamento: res.departamento,
        jefe: res.jefe,
        nombre: res.nombre,
        puesto_laboral: res.puesto_laboral,
        tipo_usuario: res.tipo_usuario,
        correo_institucional: res.correo_institucional,
        id: res.id,
      }
    });
  }

  openEdit(ato: Vehiculo) {
    this.dialog.open(EditarautomovilComponent, {
      width: '500px', height: '700px', data:ato});
  }

  openEditInfoUsuario () {
    this.dialog.open(EdiitarPerfilComponent, {
      width: '900px', height: '500px', data: this.usaurio}); 
  }

  openCreate() {
    this.dialog.open(CrearautomovilComponent, {
      width: '500px', height: '700px'});
  }

  obtenerHorarios() {
    this.dtoU.horariosBus(this.cookieService.get('funcionario')).subscribe(res => {
      console.log(res)
      for(let i = 0; i < 7; i++) {
        if (res[i] == 'Lunes') {
          this.lunes = res[i];
        } else if (res[i] == 'Martes') {
          this.martes = res[i];
        } else if (res[i] == 'Miércoles') {
          this.miercoles = res[i];
        } else if (res[i] = 'Jueves') {
          this.jueves = res[i];
        } else if (res[i] = 'Viernes') {
          this.viernes = res[i];
        } else if (res[i] = 'Sábado') {
          this.sabado = res[i];
        } else {
          this.domingo = res[i];
        }
      }
    })
  }

}
