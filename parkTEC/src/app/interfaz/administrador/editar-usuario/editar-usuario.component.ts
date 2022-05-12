import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DTOAdmin } from 'src/app/controler/DTO/dtoAdmin';
import { Usuario } from 'src/app/modelo/Usuario';
import { Vehiculo } from 'src/app/modelo/Vehiculo';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.scss']
})
export class EditarUsuarioComponent implements OnInit {
  nombre = '';
  apellido1 = '';
  apellido2 = '';

  resNombre = '';
  resApellido1 = '';
  resApellido2 = '';
  resCorreo = '';
  resCargo = '';
  resDepartamento = '';
  resCedula = '';

  constructor(private _snackBar: MatSnackBar, private dto: DTOAdmin) { }

  ngOnInit(): void {
  }

  buscarUsuario() {
    if (this.nombre != '' && this.apellido1 != '' && this.apellido2 != '') {
      this.dto.buscarUsuario(this.nombre, this.apellido1, this.apellido2).subscribe(res  => {
        if (res.estatus) {
          
        } else {
          this._snackBar.open('Correo electrónico o contraseña equivocados', 'Aceptar');
        }
      })
    } else {
      this._snackBar.open('Ingrese los datos solicitados', 'Aceptar');
    }
  }

}
