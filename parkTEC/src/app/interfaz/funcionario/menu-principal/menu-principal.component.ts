import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-menu-principal',
  templateUrl: './menu-principal.component.html',
  styleUrls: ['./menu-principal.component.scss']
})
export class MenuPrincipalComponent implements OnInit {
  nombre: string = '';

  constructor(private cookieService: CookieService) {
    this.nombreFuncionario();
  }

  ngOnInit(): void {
  }

  nombreFuncionario() {
    this.nombre = this.cookieService.get('nombre');
  }
}
