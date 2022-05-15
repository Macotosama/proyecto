import { Component, OnInit } from '@angular/core';
import { DTOAdmin } from 'src/app/controler/DTO/dtoAdmin';
import { DTOUsuario } from 'src/app/controler/DTO/dtoUsuario';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CookieService } from 'ngx-cookie-service';

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

  constructor(private dtoA: DTOAdmin, private router: Router, private _snackBar: MatSnackBar,
    private dtoU: DTOUsuario, private cookieService: CookieService) { }

  ngOnInit(): void {
  }

  loguinFuncio () {
    if (this.verificarLogin(this.userFuncio, this.contrasenaFuncio)) {
      this.dtoU.loginUsuario(this.userFuncio, this.contrasenaFuncio).subscribe(res => {
        if (res[0].estatus) {
          this.cookieService.set('funcionario', res[0].id);
          this.router.navigate(['/menuFuncionario']);
        } else {
          this._snackBar.open('Correo electrónico o contraseña equivocados', 'Aceptar');
        }
    });

    } else {
      this._snackBar.open('Ingrese los datos solicitados', 'Aceptar');
    }
  }

  loguinAdmin () {
    if (this.verificarLogin(this.userAdmin, this.contrasenaAdmin)) {
      this.dtoA.loginAdmin(this.userAdmin, this.contrasenaAdmin).subscribe(res => {
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
