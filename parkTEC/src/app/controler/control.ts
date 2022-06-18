import { Injectable } from '@angular/core';
import { GestorAdmin } from "./gestor/gestorAdmin";
import { Observable } from 'rxjs';
import { GestorUsuario } from './gestor/gestorUsuario';
import { Estacionamiento } from '../modelo/Estacionamiento';

@Injectable({
    providedIn: 'root'
})


export class Control {
    
    constructor(private gestorAdmin: GestorAdmin, private gestorUsuario: GestorUsuario) { }

    loginAdmin (userAdmin: string, contrasenaAdmin: string):Observable<any> {
        return this.gestorAdmin.loginAdmin(userAdmin, contrasenaAdmin);
    }

    buscarUsuario (nombre: string, apellido1: string, apellido2: string):Observable<any> {
        return this.gestorAdmin.buscarUsuario(nombre, apellido1, apellido2);
    }

    editarUsuario(usuario: any) :Observable<any> {
        return this.gestorAdmin.editarUsuario(usuario);
    }

    crearUsuario(usuario: any) :Observable<any> {
        return this.gestorAdmin.crearUsuario(usuario);
    }

    eliminarUsuario(id: string) :Observable<any> {
        return this.gestorAdmin.eliminarUsuario(id);
    }

    parqueos() :Observable<any> {
        return this.gestorAdmin.parqueos();
    }

    editarParqueos(paruqeo: any) :Observable<any> {
        return this.gestorAdmin.editarParqueos(paruqeo);
    }

    crearParqueos(paruqeo: any) :Observable<any> {
        return this.gestorAdmin.crearParqueos(paruqeo);
    }

    loginUsuario (userUusauiro: string, contrasenaUsaurio: string):Observable<any> {
        return this.gestorUsuario.loginUsuario(userUusauiro, contrasenaUsaurio);
    }

    parqueosNombre():Observable<any> {
        return this.gestorUsuario.parqueosNombre();
    }
    
    busquedaId(id: string):Observable<any> {
        return this.gestorUsuario.busquedaId(id);
    }

    vehiculosId(id: string):Observable<any> {
        return this.gestorUsuario.vehiculosId(id);
    }

    vehiculoEdit(vehiculo: any):Observable<any> {
        return this.gestorUsuario.vehiculoEdit(vehiculo);
    }

    vehiculoNew(vehiculo: any):Observable<any> {
        return this.gestorUsuario.vehiculoNew(vehiculo);
    }

    horariosBus(id: string):Observable<any> {
        return this.gestorUsuario.horariosBus(id);
    }

    estacionaBuscar(id: string):Observable<any> {
        return this.gestorUsuario.estacionaBuscar(id);
    }

    obtnerEstacionemientos(id: string):Observable<any> {
        return this.gestorAdmin.obtnerEstacionemientos(id);
    }

    editarEstacionamientos(esta: Array<Estacionamiento>):Observable<any> {
        return this.gestorAdmin.editarEstacionamientos(esta);
    }

    parqueoPorNombre(nombre: string):Observable<any> {
        return this.gestorAdmin.parqueoPorNombre(nombre);
    }
}