import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-crear-reservacion',
  templateUrl: './crear-reservacion.component.html',
  styleUrls: ['./crear-reservacion.component.scss']
})
export class CrearReservacionComponent implements OnInit {
  ubicacion = '';
  ubicaciones = [{value: 'uno', view: 'Sanjose'},
  {value: 'dos', view: 'Chepe'},
  {value: 'tres', view: 'centro'}];
  aparcamientos = [{name: 'automovil'}, {name: 'automovil'}, {name: 'automovil'}, {name: 'automovil'}, {name: 'automovil'}];
  aparcamiento = '';
  placas= [{placa: '1231l23k'}, {placa: '4dfsdf4'}];
  placa = '';
  arrendar = false;

  constructor() { }

  ngOnInit(): void {
  }

}
