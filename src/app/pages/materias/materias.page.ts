import { Component, OnInit } from '@angular/core';
import { IMateria } from 'src/app/models/IMateria.model';
import { FireConectionService } from 'src/app/firebase/db/fire-conection.service';
import { CallNumber } from '@ionic-native/call-number/ngx';

@Component({
  selector: 'app-materias',
  templateUrl: './materias.page.html',
  styleUrls: ['./materias.page.scss'],
})
export class MateriasPage implements OnInit {
  public lstMaterias: Array<IMateria> = [];

  constructor(
    public firebase: FireConectionService,
    private callNumber: CallNumber
  ) { }

  ngOnInit() {
  }


  listarChats(){
    this.firebase.obtenerMaterias().subscribe(lstMaterias => {
      this.lstMaterias = lstMaterias;
    })
  }
  llamar(materia: IMateria){
    this.callNumber.callNumber(materia.cel_docente, true)
  .then(res => console.log('Launched dialer!', res))
  .catch(err => console.log('Error launching dialer', err));
  }

}
