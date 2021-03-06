import { Component, OnInit, Inject } from '@angular/core';
import { DTOAdmin } from 'src/app/controler/DTO/dtoAdmin';
import { Parqueos } from 'src/app/modelo/Parqueos';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-agregarparqueo',
  templateUrl: './agregarparqueo.component.html',
  styleUrls: ['./agregarparqueo.component.scss']
})
export class AgregarparqueoComponent implements OnInit {
  parqueo: Parqueos = {
    id: '',
    direccion: '',
    espacios: 0,
    hora_inicio: '',
    hora_cierre: '',
    nombre: '',
    tipo_parqueo: true,
  }
  hora_inicio2 = '';
  motocicleta = 0;
  automovil = 0;
  discapacitado = 0;

  constructor(public dialogRef: MatDialogRef<AgregarparqueoComponent>,
    private servicio: DTOAdmin, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  cerrar() {
    this.dialogRef.close();
  }

  craer() {
    if (this.parqueo.direccion != '' && this.parqueo.hora_inicio != '' && this.parqueo.nombre != ''
    && this.parqueo.hora_cierre != '') {
      this.servicio.crearParqueos(this.parqueo).subscribe(_ => {
        this._snackBar.open('Parqueo creado', 'Aceptar');
        this.cerrar();
      })
    }
  }
}
