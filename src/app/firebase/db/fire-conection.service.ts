import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { IUsuario } from 'src/app/models/IUsuario.model';
import { IMateria } from 'src/app/models/IMateria.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FireConectionService {

  constructor(public afdb: AngularFireDatabase) { }

  crearUsuario(usuario: IUsuario){
    usuario.id = Date.now();
   return  this.afdb.database.ref('usuario/' + usuario.id).set(usuario);
  }

  crearMateria(materia: IMateria){
    materia.id = Date.now();
    return this.afdb.database.ref('materia/' + materia.id).set(materia);
  
  }

  getUsuario(usuario: string): Observable<IUsuario[]>{
    return this.afdb.list<IUsuario>('usuario', ref => ref.orderByChild('usuario').equalTo(usuario)).valueChanges();
  }

  obtenerUsuario(id: number){
    return this.afdb.object<IUsuario>('usuario/' + id)
  }

  obtenerUsuarios(){
  return this.afdb.list<IUsuario>('usuario').valueChanges(); 
  }

  obtenerMaterias(){
    return this.afdb.list<IMateria>('materias').valueChanges(); 
  }

}
