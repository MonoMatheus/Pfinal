import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {


  constructor(public alertController: AlertController) { }

  public async invocarAlerta(titulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: [
        {
          text: 'Aceptar',
          handler: () => {
            console.log('ok');
          }
        }
      ]
    });
    alert.present();
  }
}
