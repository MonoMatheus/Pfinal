import { Component, OnInit } from '@angular/core';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
import * as StringSimilarity from 'string-similarity';
import { NavController } from '@ionic/angular';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  constructor(
    private speechRecognition: SpeechRecognition,
    public navController: NavController,
    public alertService: AlertService
  ) {

    
  }

  ngOnInit() {
  }
  otorgarPermiso(){
    // Request permissions
    this.speechRecognition.requestPermission()
    .then(
      () => console.log('Granted'),
      () => console.log('Denied')
    );
  }
  async validaPermiso() {
    // Check permission
    await this.speechRecognition.hasPermission()
      .then((hasPermission: boolean) => console.log(hasPermission));
    // Check feature available
    this.speechRecognition.isRecognitionAvailable()
    .then((available: boolean) => console.log(available));
  }
  iniciarReconocimiento() {
    // Start the recognition process
    let options = {
      language: 'es-MX',
      matches: 3,
      prompt: 'Desea ver sus notas o sus materias',      // Android only
      showPopup: true
    }
    this.speechRecognition.startListening(options)
    .subscribe(
      (matches: string[]) => {
        //this.speechRecognition.stopListening()
        console.log(matches);
        let mejorResultadoParaNotas: StringSimilarity.BestMatch = StringSimilarity.findBestMatch('notas', matches);
        let mejorResultadoParaMaterias: StringSimilarity.BestMatch = StringSimilarity.findBestMatch('materias', matches);
        if( mejorResultadoParaNotas.bestMatch.rating> 0.5) {
          this.speechRecognition.stopListening()
          this.navController.navigateRoot(['notas']);
        }else if ( mejorResultadoParaMaterias.bestMatch.rating> 0.5){
          this.speechRecognition.stopListening()
          this.navController.navigateRoot(['materias']);
        }else{
          this.alertService.invocarAlerta('Error', 'No pudimos entender lo que dijiste');
        }
      },
      (onerror) => console.log('error:', onerror)
    )
  }

}