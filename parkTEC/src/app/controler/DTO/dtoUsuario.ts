import { Injectable } from '@angular/core';
import { Control } from '../control';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class DTOUsuario {

    constructor(private control: Control) { }

    infoFuncion(id: string):Observable<any> {
        return this.control.infoFuncion(id);
    }

    loginUsuario (userUusauiro: string, contrasenaUsaurio: string):Observable<any> {
        return this.control.loginUsuario(userUusauiro, contrasenaUsaurio);
    }

    parqueosNombre():Observable<any> {
        return this.control.parqueosNombre();
    }

    busquedaId(id: string):Observable<any> {
        return this.control.busquedaId(id);
    }

    vehiculosId(id: string):Observable<any> {
        return this.control.vehiculosId(id);
    }

    vehiculoEdit(vehiculo: any):Observable<any> {
        return this.control.vehiculoEdit(vehiculo);
    }

    vehiculoNew(vehiculo: any):Observable<any> {
        return this.control.vehiculoNew(vehiculo);
    }

    horariosBus(id: string):Observable<any> {
        return this.control.horariosBus(id);
    }

    estacionaBuscarNormal(id: string):Observable<any> {
        return this.control.estacionaBuscarNormal(id);
    }

    estacionaBuscarDiscapacitado(id: string):Observable<any> {
        return this.control.estacionaBuscarDiscapacitado(id);
    }

    estacionaBuscarJefes(id: string):Observable<any> {
        return this.control.estacionaBuscarDiscapacitado(id);
    }

    editarUsuario(usuario: any):Observable<any> {
        return this.control.editarUsuario(usuario);
    }

    editarHorarios(horarios: any):Observable<any> {
        return this.control.editarHorarios(horarios);
    }

    parqueoPorNombre(nombre: string):Observable<any> {
        return this.control.parqueoPorNombre(nombre);
    }
}