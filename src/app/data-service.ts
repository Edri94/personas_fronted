import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Persona } from "./persona.model";

@Injectable()
export class DataService {
    constructor(private httpClient: HttpClient){
        
    }

    urlBase = 'http://localhost:8080/personas-backend-java/webservice/personas';
    
    /**
     * Obtiene personas
     * @returns Obtine las personas en el WS
     */
    cargarPersonas(){
        return this.httpClient.get<Persona[]>(this.urlBase);
    }

    /**
     * Manda un POST al WS de Personas
     * @param persona Persona a agregar
     * @returns la persona agregada
     */
    agregarPersona(persona: Persona){
        return this.httpClient.post<Persona>(this.urlBase, persona);
    }

    /**
     * Manda un PUT al WS de Personas
     * @param idPersona id de la Persona a modificar
     * @param persona Persona modificada
     */
    modificarPersona(idPersona: number, persona: Persona){
        let url: string;
        url = this.urlBase + '/' + idPersona;

        this.httpClient.put<Persona>(url, persona)
            .subscribe(
                (response) => {
                    console.log('resultado de modificar persona: ' + response)
                },
                (error) =>{
                    console.log("error en modificar persona: " + error )
                }
            )
    }

    /**
     * Manda un DELETE al WS de Personas
     * @param idPersona id de la Persona a borrar
     */
    eliminarPersona(idPersona : number){
        let url : string;

        url = this.urlBase + '/' + idPersona;
        
        this.httpClient.delete(url)
            .subscribe(
                (response) => {
                    console.log('resultado de eliminar persona: ' + response)
                },
                (error) =>{
                    console.log("error en eliminar persona: " + error )
                }
            )
    }
    

}

