import { Injectable } from '@angular/core';
import { Control } from '../control';
import { Observable } from 'rxjs';
import { Estacionamiento } from 'src/app/modelo/Estacionamiento';

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

    editarUsuario(usuario: any) :Observable<any> {
        return this.control.editarUsuario(usuario);
    }

    crearUsuario(usuario: any) :Observable<any> {
        return this.control.crearUsuario(usuario);
    }

    eliminarUsuario(id: string) :Observable<any> {
        return this.control.eliminarUsuario(id);
    }

    parqueos() :Observable<any> {
        return this.control.parqueos();
    }

    editarParqueos(paruqeo: any) :Observable<any> {
        return this.control.editarParqueos(paruqeo);
    }

    crearParqueos(paruqeo: any) :Observable<any> {
        return this.control.crearParqueos(paruqeo);
    }

    obtnerEstacionemientos(id: string):Observable<any> {
        return this.control.obtnerEstacionemientos(id);
    }

    editarEstacionamientos(esta: Array<Estacionamiento>):Observable<any> {
        return this.control.editarEstacionamientos(esta);
    }

    parqueoPorNombre(nombre: string):Observable<any> {
        return this.control.parqueoPorNombre(nombre);
    }
}