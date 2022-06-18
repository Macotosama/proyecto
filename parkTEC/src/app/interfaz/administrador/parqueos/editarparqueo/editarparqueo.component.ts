import { Component, OnInit, Inject } from '@angular/core';
import { DTOAdmin } from 'src/app/controler/DTO/dtoAdmin';
import { Parqueos } from 'src/app/modelo/Parqueos';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Estacionamiento } from 'src/app/modelo/Estacionamiento';

@Component({
  selector: 'app-editarparqueo',
  templateUrl: './editarparqueo.component.html',
  styleUrls: ['./editarparqueo.component.scss']
})
export class EditarparqueoComponent implements OnInit {
  parqueo: Parqueos = {
    id: '',
    direccion: '',
    espacios: 0,
    hora_inicio: '',
    hora_cierre: '',
    nombre: '',
    tipo_parqueo: true,
  }

  estacionamientos: Array<Estacionamiento> = new Array<Estacionamiento>();

  motocicleta = 0;
  automovil = 0;
  discapacitado = 0;

  constructor(public dialogRef: MatDialogRef<EditarparqueoComponent>,
    private servicio: DTOAdmin, @Inject(MAT_DIALOG_DATA) public data: Parqueos,
    private _snackBar: MatSnackBar) { 
      this.parqueo = data;
      this.getEstacionatos();
    }

  ngOnInit(): void {
  }

  cerrar() {
    this.dialogRef.close();
  }

  editar() {
    if (this.parqueo.direccion != '' && this.parqueo.hora_inicio != '' && this.parqueo.nombre != ''
    && this.parqueo.hora_cierre != '') {
      this.servicio.editarParqueos(this.parqueo).subscribe(_ => {
        this.servicio.editarEstacionamientos(this.estacionamientos).subscribe(_ => {});
        this._snackBar.open('Datos actualizados', 'Aceptar');
        this.cerrar();
      });
    }
  }

  getEstacionatos() {
    console.log(this.parqueo.id)
    this.servicio.obtnerEstacionemientos(this.parqueo.id).subscribe(res => {
      this.estacionamientos = res;
    })
  }

}
