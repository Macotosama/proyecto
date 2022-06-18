import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Parqueos } from 'src/app/modelo/Parqueos';
import { Usuario } from 'src/app/modelo/Usuario';
import { Vehiculo } from 'src/app/modelo/Vehiculo';
import { Estacionamiento } from 'src/app/modelo/Estacionamiento';

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
    ediatarUsuarioad = 'user/edit-usuario';
    crearUsuarioad = 'user/new-usuario';
    eliminarUsuarioad = 'user/delete-usuario/';
    parqueosad = 'parqueo/parqueos';
    parqueoeditad = 'parqueo/edit-parqueo';
    parqueocrearad = 'parqueo/crear-parqueo';
    estacionamientosParqueo = 'parqueo/estacionamientos/';
    editaEstacionamientos = 'parqueo/edit-estacionamientos';
    poqueoPorNombre = 'parqueo/parqueos-nombre/';
    buscarFuncionario = 'user/buscar-funcionario/';
    horariosFuncionario = 'user/buscar-horario/';

    constructor(private _http: HttpClient) {}

    loginAdmin(userAdmin: string, contrasenaAdmin: string):Observable<any> {
      return this._http.get(`${this.port}${this.login}${userAdmin}/${contrasenaAdmin}`, httpOption);
    }

    buscarUsuario(nombre: string, apellido1: string, apellido2: string):Observable<any> {
      return this._http.get(`${this.port}${this.buscarUsuarioCompleto}${nombre}/${apellido1}/${apellido2}`, httpOption);
    }

    editarUsuario(usuario: any) :Observable<any> {
      return this._http.put(`${this.port}${this.ediatarUsuarioad}`, usuario, httpOption);
    }

    crearUsuario(usuario: any) :Observable<any> {
      return this._http.post(`${this.port}${this.crearUsuarioad}`, usuario, httpOption);
    }

    eliminarUsuario(id: string) :Observable<any> {
      console.log(`${this.port}${this.eliminarUsuarioad}${id}`)
      return this._http.delete(`${this.port}${this.login}${id}`, httpOption);
    }

    parqueos() :Observable<any> {
      return this._http.get(`${this.port}${this.parqueosad}`, httpOption);
    }

    editarParqueos(paruqeo: any) :Observable<any> {
      return this._http.put(`${this.port}${this.parqueoeditad}`, paruqeo, httpOption);
    }

    crearParqueos(paruqeo: any) :Observable<any> {
      return this._http.post(`${this.port}${this.parqueocrearad}`, paruqeo, httpOption);
    }

    obtnerEstacionemientos(id: string):Observable<any> {
      return this._http.get(`${this.port}${this.estacionamientosParqueo}${id}`, httpOption);
    }

    editarEstacionamientos(esta: Array<Estacionamiento>):Observable<any> {
      return this._http.put(`${this.port}${this.editaEstacionamientos}`, esta, httpOption);
    }

    parqueoPorNombre(nombre: string):Observable<any> {
      return this._http.get(`${this.port}${this.poqueoPorNombre}${nombre}`, httpOption);
    }

    busquedaFuncionario(id: string):Observable<any> {
      return this._http.get(`${this.port}${this.buscarFuncionario}${id}`, httpOption);
    }

    horarios(id: string):Observable<any> {
      return this._http.get(`${this.port}${this.horariosFuncionario}${id}`, httpOption);
    }
  }