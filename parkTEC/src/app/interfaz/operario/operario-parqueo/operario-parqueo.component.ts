import { Component, OnInit } from '@angular/core';
import { Parqueos } from 'src/app/modelo/Parqueos';

@Component({
  selector: 'app-operario-parqueo',
  templateUrl: './operario-parqueo.component.html',
  styleUrls: ['./operario-parqueo.component.scss']
})
export class OperarioParqueoComponent implements OnInit {
  parqueo:Parqueos = {
    id: '',
    direccion: '',
    espacios: 0,
    hora_inicio: '',
    hora_cierre: '',
    nombre: '',
    tipo_parqueo: '',
  };
  
  constructor() { }

  ngOnInit(): void {
  }

}
