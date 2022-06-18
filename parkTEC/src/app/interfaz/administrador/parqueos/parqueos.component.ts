import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/modelo/Usuario';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DTOAdmin } from 'src/app/controler/DTO/dtoAdmin';
import { Parqueos } from 'src/app/modelo/Parqueos';
import { EditarparqueoComponent } from './editarparqueo/editarparqueo.component';
import { AgregarparqueoComponent } from './agregarparqueo/agregarparqueo.component';

@Component({
  selector: 'app-parqueos',
  templateUrl: './parqueos.component.html',
  styleUrls: ['./parqueos.component.scss']
})
export class ParqueosComponent implements OnInit {
  parqueos = new Array<Parqueos>() ;
  parqueo = '';
  constructor(private _snackBar: MatSnackBar, private dto: DTOAdmin, public dialog: MatDialog) { }



  ngOnInit(): void {
    this.getParqueos();
  }

  getParqueos() {
    this.dto.parqueos().subscribe(res => {
      var dateInicio:Date;
      var dateFinal:Date;
      for (let i = 0; i < res.length; i++) {
        dateInicio = new Date(res[i].hora_inicio._seconds * 1000);
        dateFinal = new Date(res[i].hora_cierre._seconds * 1000);
        this.parqueos.push({
          id: res[i].id,
          direccion: res[i].direccion,
          espacios: res[i].espacios,
          hora_cierre: this.timeParce(dateFinal),
          hora_inicio: this.timeParce(dateInicio),
          nombre: res[i].nombre,
          tipo_parqueo: res[i].tipo_parqueo,
        })
      };

      // this.parqueos = res;
    })
  }

  timeParce(date:Date) {
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

  openEdit(parqueo: Parqueos) {
    this.dialog.open(EditarparqueoComponent, {
      width: '1000px', height: '900px', data:parqueo});
  }

  openCreate() {
    this.dialog.open(AgregarparqueoComponent, {
      width: '500px', height: '780px'});
  }

  buscarParqueo() {
    if (this.parqueo != '') {
      this.dto.parqueoPorNombre(this.parqueo).subscribe(res => {
        this.parqueos = new Array<Parqueos>();
        var dateInicio:Date;
        var dateFinal:Date;
        for (let i = 0; i < res.length; i++) {
          dateInicio = new Date(res[i].hora_inicio._seconds * 1000);
          dateFinal = new Date(res[i].hora_cierre._seconds * 1000);
          this.parqueos.push({
            id: res[i].id,
            direccion: res[i].direccion,
            espacios: res[i].espacios,
            hora_cierre: this.timeParce(dateFinal),
            hora_inicio: this.timeParce(dateInicio),
            nombre: res[i].nombre,
            tipo_parqueo: res[i].tipo_parqueo,
          })
        };
      })
    }
  }
}
