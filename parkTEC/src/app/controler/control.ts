import { Injectable } from '@angular/core';
import { GestorAdmin } from "./gestor/gestorAdmin";
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})


export class Control {
    
    constructor(private gestorAdmin: GestorAdmin) { }

    loginAdmin (userAdmin: string, contrasenaAdmin: string):Observable<any> {
        return this.gestorAdmin.loginAdmin(userAdmin, contrasenaAdmin);
    }

    buscarUsuario (nombre: string, apellido1: string, apellido2: string):Observable<any> {
        return this.gestorAdmin.buscarUsuario(nombre, apellido1, apellido2);
    }
}