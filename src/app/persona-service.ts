import { Injectable } from '@angular/core';
import { DataService } from './data-service';
import { Persona } from './persona.model';

@Injectable()
export class PersonaService {
    personas : Persona[] = [];


    constructor(private dataService: DataService){
        
    }

    /**
     * Se usa para modificar el valor del arreglo debido a la llamada asincrona
     * @param personas Objeto tipo Persona a setear
     */
    setPersonas(personas : Persona[]){
        this.personas = personas;
    }

    /**
     * Manda a llamar al dataservice para obtener personas registradas
     * @returns Todas las personas cargadas en bd
     */
    obtenerPersonas(){
        return this.dataService.cargarPersonas();
    }

    /**
     * Manda a llamar al dataservice para agregar Persona
     * @param persona Persona a agregar
     */
    agregarPersona(persona: Persona){
        console.log('persona a agegar:' + persona.nombre);
        this.dataService.agregarPersona(persona)
            .subscribe(
                (p : Persona) =>{
                    //Recuperamso el objeto persona ocn el id Persona recien agregado, esto es gracias al method flush en el backend en Java se puede recuperar este valor
                    console.log("se agrega al arreglo la persona recien insertada suscriber: " + p.idPersona);
                    this.personas.push(p);
                }
            );
    }

    /**
     * Busca personas en el arreglo de personas
     * @param id Id de la persona a buscar
     * @returns Persona encontrada
     */
    encontrarPersona(id: number){
        const persona_encontrada = this.personas.find((p => p.idPersona == id));
         
        if(persona_encontrada !== undefined)
        {
            console.log('persona encontrada: ' + persona_encontrada.idPersona + ' ' + persona_encontrada.nombre);
        }
        return persona_encontrada;    
    }

    /**
     * Manda a llamar al dataservice para modificar Persona
     * @param id Id de la persona a modificar        
     * @param persona Persona a modificar
     */
    modificarPersona(id: number, persona: Persona){
        console.log('persona a modificar: ' + persona.idPersona);
        this.dataService.modificarPersona(id, persona);
    }

    /**
     * Manda a llamar al dataservice para eliminar una Persona
     * @param id Id de la persona a eliminar
     */
    eliminarPersona(id: number){
        console.log('eliminar persona con id: ' + id);
        const index  = this.personas.findIndex(persona => persona.idPersona  == id);
        this.personas.splice(index, 1);
        this.dataService.eliminarPersona(id);
    }
}
