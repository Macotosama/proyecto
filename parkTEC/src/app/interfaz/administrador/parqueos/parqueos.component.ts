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

  constructor(private _snackBar: MatSnackBar, private dto: DTOAdmin, public dialog: MatDialog) { }



  ngOnInit(): void {
    this.getParqueos();
  }

  getParqueos() {
    this.dto.parqueos().subscribe(res => {
      console.log(res)
      this.parqueos = res;
    })
  }

  openEdit(parqueo: Parqueos) {
    this.dialog.open(EditarparqueoComponent, {
      width: '500px', height: '780px', data:parqueo});
  }

  openCreate(parqueo: Parqueos) {
    this.dialog.open(AgregarparqueoComponent, {
      width: '500px', height: '780px'});
  }

}
