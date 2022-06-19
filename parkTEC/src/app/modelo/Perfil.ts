import { Horarios } from "./Horarios";
import { Usuario } from "./Usuario";

export interface Perfil {
    horarios: Horarios;
    usuario: Usuario;
    idFuncionario: string;
}