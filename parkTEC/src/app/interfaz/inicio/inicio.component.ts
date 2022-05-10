import { Component, OnInit } from '@angular/core';
import  { dtoUsuario }  from '../../controler/DTO/dtoUsuario';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {
  contrasena = '';
  hide = true;

  constructor(private router:dtoUsuario) { }

  ngOnInit(): void {
  }

  loguin () {
    this.router.loguin().subscribe(res =>{
      console.log(res)
    })
  }

}
