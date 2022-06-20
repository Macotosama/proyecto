import { Component, OnInit } from '@angular/core';
import { DTOUsuario } from 'src/app/controler/DTO/dtoUsuario';
import { CookieService } from 'ngx-cookie-service';
import { Reservacion } from 'src/app/modelo/Reservacion';

@Component({
  selector: 'app-reservaciones',
  templateUrl: './reservaciones.component.html',
  styleUrls: ['./reservaciones.component.scss']
})
export class ReservacionesComponent implements OnInit {
  resercaiones: Array<Reservacion> = new Array<Reservacion>();

  id: string = '';

  constructor(private dtoU: DTOUsuario, private cookieService: CookieService) { }

  ngOnInit(): void {
    this.infoFuncion();
  }

  obtnerReservas() {
    this.dtoU.obtenerReservacioness(this.id).subscribe(res => {
      console.log(res)
      this.resercaiones = res;
      var temp: Reservacion;
      console.log(res.length)
      for(let j = 0; j < res.length; j++) {
        console.log("holllaaaa")
        temp = {
          activa: res[j].activa,
          final: this.parceTime(new Date(res[j].inicio._seconds * 1000)),
          id: res[j].id, 
          id_estacionamiento: res[j].id_estacionamiento,
          idfuncionario: res[j].idfuncionario,
          inicio: this.parceTime(new Date(res[j].final._seconds * 1000)),
          dia: this.parceDay(new Date(res[j].final._seconds * 1000)),
        }
        console.log(temp)
        this.resercaiones.push(temp);
      }
    });
  }

  infoFuncion() {
    this.dtoU.infoFuncion(this.cookieService.get("funcionario")).subscribe(res => {
      console.log(res)
      this.id = res[0].id;
      this.obtnerReservas();
    })
  }

  parceTime(date: Date) {
    var hora = date.getHours()+":"+date.getMinutes();
    return hora;
  }

  parceDay(date: Date) {
    var day = date.getDay();
    return day+"";
  }

}
