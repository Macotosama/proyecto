import { Injectable } from '@angular/core';
import { Control } from '../control';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class DTOAdmin {

    constructor(private control: Control) { }

    loginAdmin (userAdmin: string, contrasenaAdmin: string):Observable<any> {
        return this.control.loginAdmin(userAdmin, contrasenaAdmin);
    }

    buscarUsuario (nombre: string, apellido1: string, apellido2: string):Observable<any> {
        return this.control.buscarUsuario(nombre, apellido1, apellido2);
    }
}