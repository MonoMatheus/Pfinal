import { Injectable } from '@angular/core'
import { IUsuario } from '../models/IUsuario.model';
import { Storage } from '@ionic/storage';


const DB_NAME: string = 'my-db-practica'

@Injectable({
  providedIn: 'root'
})
export class MydbService {
  constructor(private storage: Storage) { }

  addUsuario(usuario: IUsuario): Promise<any>{
    return this.storage.get(DB_NAME).then( (data: Array<IUsuario>) => {
      if(data){
      if(data.length < 1){
        return this.storage.set(DB_NAME, [usuario]);
      }
    }else{
      return this.storage.set(DB_NAME, [usuario]);
    }
    })
  }

getUsuario(): Promise<IUsuario[]> {
  return this.storage.get(DB_NAME);
}

deleteUsuario(idUsuario: string){
  return this.storage.get(DB_NAME).then((usuarios: IUsuario[]) => {
    if(usuarios.length === 0){
      return null;
    }
    let usuariosEliminados: IUsuario[] = [];
    for(let user of usuarios){
      if(idUsuario != user.usuario){
        usuariosEliminados.push(user);
      }
    }

    this.storage.set(DB_NAME, usuariosEliminados);


  })
}
}
