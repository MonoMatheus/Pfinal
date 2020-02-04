import { Component, OnInit } from '@angular/core';
import { IMateria } from 'src/app/models/IMateria.model';
import { FireConectionService } from 'src/app/firebase/db/fire-conection.service';

@Component({
  selector: 'app-notas',
  templateUrl: './notas.page.html',
  styleUrls: ['./notas.page.scss'],
})
export class NotasPage implements OnInit {
  public lstMaterias: Array<IMateria> = [];
  constructor(
    public firebase: FireConectionService
  ) { }

  ngOnInit() {
  }


  listarChats(){
    this.firebase.obtenerMaterias().subscribe(lstMaterias => {
      this.lstMaterias = lstMaterias;
    })
  }
}
