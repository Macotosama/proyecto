import { Component, OnInit } from '@angular/core';
import { DTOAdmin } from 'src/app/controler/DTO/dtoAdmin';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {
  hide = true;

  contrasenaAdmin = '';
  userAdmin = '';

  contrasenaFuncio = '';
  userFuncio = '';

  constructor(private dto: DTOAdmin, private router: Router, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  loguinFuncio () {
    // this.router.loguin().subscribe(res =>{
    //   console.log(res)
    // })
  }

  loguinAdmin () {
    if (this.verificarLogin(this.userAdmin, this.contrasenaAdmin)) {
      this.dto.loginAdmin(this.userAdmin, this.contrasenaAdmin).subscribe(res => {
        if (res.estatus) {
          this.router.navigate(['/menuAdmin']);
        } else {
          this._snackBar.open('Correo electrónico o contraseña equivocados', 'Aceptar');
        }
    });

    } else {
      this._snackBar.open('Ingrese los datos solicitados', 'Aceptar');
    }

  }

  verificarLogin(user: string, contra: string) {
    if (user != '' && contra != '') {
      return true;
    } else {
      return false;
    }
  }

}
