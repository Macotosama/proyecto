import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reservaciones',
  templateUrl: './reservaciones.component.html',
  styleUrls: ['./reservaciones.component.scss']
})
export class ReservacionesComponent implements OnInit {
  resercaiones = [{localidad: 'San Pedro', fecha: '9/4/2222', tipo: 'Automovil', placa: 'adfas98'},
  {localidad: 'San Pedro', fecha: '9/4/2222', tipo: 'Automovil', placa: 'adfas98'},
  {localidad: 'San Pedro', fecha: '9/4/2222', tipo: 'Automovil', placa: 'adfas98'},
  {localidad: 'San Pedro', fecha: '9/4/2222', tipo: 'Automovil', placa: 'adfas98'}]

  constructor() { }

  ngOnInit(): void {
  }

}
