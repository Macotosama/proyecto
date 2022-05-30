import { Component, OnInit, Inject } from '@angular/core';
import { DTOAdmin } from 'src/app/controler/DTO/dtoAdmin';
import { Parqueos } from 'src/app/modelo/Parqueos';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    apertura: '',
    cierre: '',
    nombre: '',
    tipo_parqueo: '',
    motocicleta: 0,
    automovil: 0,
    discapacitado: 0
  }

  constructor(public dialogRef: MatDialogRef<EditarparqueoComponent>,
    private servicio: DTOAdmin, @Inject(MAT_DIALOG_DATA) public data: Parqueos,
    private _snackBar: MatSnackBar) { 
      this.parqueo = data;
    }

  ngOnInit(): void {
  }

  cerrar() {
    this.dialogRef.close();
  }

  editar() {
    if (this.parqueo.direccion != '' && this.parqueo.apertura != '' && this.parqueo.nombre != '' && this.parqueo.tipo_parqueo != ''
    && this.parqueo.cierre != '') {
      this.servicio.editarParqueos(this.parqueo).subscribe(_ => {
        this._snackBar.open('Datos actualizados', 'Aceptar');
        this.cerrar();
      })
    }
  }

}
