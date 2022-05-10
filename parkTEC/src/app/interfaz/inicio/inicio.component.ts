import { Component, OnInit } from '@angular/core';
import  { dtoUsuario }  from '../../controler/DTO/dtoUsuario';

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

  constructor(private router:dtoUsuario) { }

  ngOnInit(): void {
  }

  loguinFuncio () {
    // this.router.loguin().subscribe(res =>{
    //   console.log(res)
    // })
  }

  loguinAdmin () {
    this.router.loguin(this.userFuncio, this.contrasenaAdmin).subscribe(res =>{
      console.log(res)
    })
  }

}
