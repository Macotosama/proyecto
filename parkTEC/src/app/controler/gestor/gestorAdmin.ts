import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/modelo/Usuario';
import { Vehiculo } from 'src/app/modelo/Vehiculo';

const httpOption = {
    headers: new HttpHeaders({
      'Contend-Type': 'aplication/json'
    })
  };

  @Injectable({
    providedIn: 'root'
  })

  export class GestorAdmin {
    port = 'http://localhost:4000/';
    login = 'admin/login-admin/';
    buscarUsuarioCompleto = 'user/buscar-usuario/';

    constructor(private _http: HttpClient) {}

    loginAdmin(userAdmin: string, contrasenaAdmin: string):Observable<any> {
      return this._http.get(`${this.port}${this.login}${userAdmin}/${contrasenaAdmin}`, httpOption);
    }

    buscarUsuario(nombre: string, apellido1: string, apellido2: string):Observable<any> {
      return this._http.get(`${this.port}${this.buscarUsuarioCompleto}${nombre}/${apellido1}/${apellido2}`, httpOption);
    }
  }