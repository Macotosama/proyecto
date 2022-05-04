import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-parqueos',
  templateUrl: './parqueos.component.html',
  styleUrls: ['./parqueos.component.scss']
})
export class ParqueosComponent implements OnInit {
  parqueos = [{localidad: 'San Pedro', espacios: '9', automovil: '3', motocicleta: '3', discapacitado: '3'},
  {localidad: 'San Pedro', espacios: '9', automovil: '3', motocicleta: '3', discapacitado: '3'},
  {localidad: 'San Pedro', espacios: '9', automovil: '3', motocicleta: '3', discapacitado: '3'},
  {localidad: 'San Pedro', espacios: '9', automovil: '3', motocicleta: '3', discapacitado: '3'}]

  constructor() { }

  ngOnInit(): void {
  }

}
