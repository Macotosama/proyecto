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

  discapacidad = true;
  jefe = true;

  constructor(private dtoU: DTOUsuario, private cookieService: CookieService) {
  }

  ngOnInit(): void {
    this.infoFuncion();
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
    if (this.jefe) {
      this.dtoU.estacionaBuscarJefes(this.ubicacion).subscribe(res => {
        this.aparcamientos = res;
      })
    } else if (this.discapacidad) {
      this.dtoU.estacionaBuscarDiscapacitado(this.ubicacion).subscribe(res => {
        this.aparcamientos = res;
      })
    } else {
      this.dtoU.estacionaBuscarNormal(this.ubicacion).subscribe(res => {
        this.aparcamientos = res;
      })
    }
  }

  infoFuncion() {
    this.dtoU.infoFuncion(this.cookieService.get("funcionario")).subscribe(res => {
      console.log(res)
      this.jefe = res[0].jefe;
      this.discapacidad = res[0].discapacidad;
      console.log(this.jefe, this.discapacidad)
    })
  }

}
