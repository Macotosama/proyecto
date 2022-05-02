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
  {value: 'tres', view: 'centro'}]

  constructor() { }

  ngOnInit(): void {
  }

}
