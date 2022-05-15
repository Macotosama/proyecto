import { Component, OnInit } from '@angular/core';
import { Vehiculo } from 'src/app/modelo/Vehiculo';
import { DTOUsuario } from 'src/app/controler/DTO/dtoUsuario';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-crearautomovil',
  templateUrl: './crearautomovil.component.html',
  styleUrls: ['./crearautomovil.component.scss']
})
export class CrearautomovilComponent implements OnInit {
  automovil: Vehiculo = {
    anno: '',
    color: '',
    modelo: '',
    tipo_transporte: '',
    usuario: '',
    id: '',
    placa: '',
  }



  constructor(public dialogRef: MatDialogRef<CrearautomovilComponent>,
    private servicio: DTOUsuario, private _snackBar: MatSnackBar, private cookieService: CookieService) {
      this.automovil.usuario = this.cookieService.get('funcionario')
  }

  ngOnInit(): void {
  }

  cerrar() {
    this.dialogRef.close();
  }

  editar() {
    if (this.automovil.anno != '' && this.automovil.color != '' && this.automovil.modelo != '' && this.automovil.tipo_transporte != '' && this.automovil.placa != '') {
      this.servicio.vehiculoNew(this.automovil).subscribe(_ => {
        this._snackBar.open('Vehiculo creado', 'Aceptar');
        this.cerrar();
      })
    }
  }

}
