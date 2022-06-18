import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Parqueos } from 'src/app/modelo/Parqueos';
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

  export class GestorUsuario {
    port = 'http://localhost:4000/';
    login = 'user/login-user/';
    buscar = 'user/buscar-usuario/';
    parqueoNombre = 'parqueo/parqueos-nombre';
    vehiculos = 'user/buscar-vehiculo/';
    editVehiculo = 'user/edit-vehiculos';
    crearVehiculo = 'user/crear-vehiculo';
    buscarHorario = 'user/buscar-horario/';
    buscarEstacionamientos = 'user/buscar-estacionamientos/';

    constructor(private _http: HttpClient) {}

    loginUsuario(userUsuario: string, contrasenaAUsuario: string):Observable<any> {
        return this._http.get(`${this.port}${this.login}${userUsuario}/${contrasenaAUsuario}`, httpOption);
    }

    parqueosNombre():Observable<any> {
        return this._http.get(`${this.port}${this.parqueoNombre}`, httpOption);
    }

    busquedaId(id: string):Observable<any> {
      return this._http.get(`${this.port}${this.buscar}${id}`, httpOption);
    }

    vehiculosId(id: string):Observable<any> {
      console.log(`${this.port}${this.vehiculos}${id}`);
      return this._http.get(`${this.port}${this.vehiculos}${id}`, httpOption);
    }

    vehiculoEdit(vehiculo: Vehiculo):Observable<any> {
      return this._http.put(`${this.port}${this.editVehiculo}`, vehiculo, httpOption);
    }

    vehiculoNew(vehiculo: Vehiculo):Observable<any> {
      return this._http.post(`${this.port}${this.crearVehiculo}`, vehiculo, httpOption);
    }

    horariosBus(id: string):Observable<any> {
      return this._http.get(`${this.port}${this.buscarHorario}${id}`, httpOption);
    }

    estacionaBuscar(id: string):Observable<any> {
      return this._http.get(`${this.port}${this.buscarEstacionamientos}${id}`, httpOption);
    }
  }