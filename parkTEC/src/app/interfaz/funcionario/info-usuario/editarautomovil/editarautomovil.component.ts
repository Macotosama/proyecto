import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Vehiculo } from 'src/app/modelo/Vehiculo';
import { DTOUsuario } from 'src/app/controler/DTO/dtoUsuario';

@Component({
  selector: 'app-editarautomovil',
  templateUrl: './editarautomovil.component.html',
  styleUrls: ['./editarautomovil.component.scss']
})

export class EditarautomovilComponent implements OnInit {
  automovil: Vehiculo = {
    anno: '',
    color: '',
    modelo: '',
    tipo_transporte: '',
    usuario: '',
    id: '',
    placa: '',
  }

  constructor(public dialogRef: MatDialogRef<EditarautomovilComponent>,
    private servicio: DTOUsuario, @Inject(MAT_DIALOG_DATA) public data: Vehiculo,
    private _snackBar: MatSnackBar) { 
      this.automovil = data;
  }

  ngOnInit(): void {
  }

  cerrar() {
    this.dialogRef.close();
  }

  editar() {
    if (this.automovil.anno != '' && this.automovil.color != '' && this.automovil.modelo != '' && this.automovil.tipo_transporte != '' && this.automovil.placa != '') {
      this.servicio.vehiculoEdit(this.automovil).subscribe(_ => {
        this._snackBar.open('Datos actualizados', 'Aceptar');
        this.cerrar();
      })
    }
  }

}
