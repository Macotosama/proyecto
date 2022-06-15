import { Component, OnInit } from '@angular/core';
import { Formulario } from 'src/app/modelo/Formulario';
import { Estacionamiento } from 'src/app/modelo/Estacionamiento';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class FormularioComponent implements OnInit {
  formulario: Formulario = {
    placa: '',
    modelo: '',
    color: '',
    chofer: '',
    id: '',
    inicio: new Date,
    final: new Date,
  }

  estacionamientos: Array<Estacionamiento> = [];

  parqueo: string = 'Puro coco';

  constructor() { }

  ngOnInit(): void {
  }

}
