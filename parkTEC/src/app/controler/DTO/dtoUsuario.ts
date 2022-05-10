import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOption = {
    headers: new HttpHeaders({
      'Contend-Type': 'aplication/json'
    })
  };

  @Injectable({
    providedIn: 'root'
  })

  export class dtoUsuario {
    port = 'http://localhost:4000/';
    login = 'admin/delete-contact/';

    constructor(private _http: HttpClient) {}

    loguin(userAdmin: string, contrasenaAdmin: string):Observable<any> {
      return this._http.get(`${this.port}${this.login}${'123456'}`, httpOption);
    }
  }