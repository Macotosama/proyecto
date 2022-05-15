import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DTOUsuario } from 'src/app/controler/DTO/dtoUsuario';
import { Estacionamiento } from 'src/app/modelo/Estacionamiento';
import { Vehiculo } from 'src/app/modelo/Vehiculo';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-crear-reservacion',
  templateUrl: './crear-reservacion.component.html',
  styleUrls: ['./crear-reservacion.component.scss']
})
export class CrearReservacionComponent implements OnInit {
  ubicacion = '';
  ubicaciones = [{id: 'uno', nombre: 'Sanjose'}];
  aparcamientos = Array<Estacionamiento>();
  aparcamiento = '';
  placas = new Array<Vehiculo>();
  placa = '';
  arrendar = false;
  fechaActual = new Date();

  constructor(private dtoU: DTOUsuario, private cookieService: CookieService) {
  }

  ngOnInit(): void {
    this.parqueosNombre();
    this.getAutomoviles();
  }

  getAutomoviles() {
    this.dtoU.vehiculosId(this.cookieService.get("funcionario")).subscribe(res => {
      this.placas = res;
    })
  }

  parqueosNombre() {
    this.dtoU.parqueosNombre().subscribe(res => {
      this.ubicaciones = res;
    })
  }

  estacionaBuscar() {
    this.dtoU.estacionaBuscar(this.ubicacion).subscribe(res => {
      this.aparcamientos = res;
    })
  }

}
