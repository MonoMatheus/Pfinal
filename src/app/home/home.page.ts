import { Component } from '@angular/core';
import { IUsuario } from '../models/IUsuario.model';
import { MydbService } from '../services/mydb.service';
import { AlertController, ToastController, NavController  } from '@ionic/angular';
import { Router } from '@angular/router';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';
import { FireConectionService } from '../firebase/db/fire-conection.service';
import { IMateria } from '../models/IMateria.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public usuario: IUsuario = <IUsuario>{};
  public usuarioBD:IUsuario[] = [];
  public user: IUsuario;



  constructor(
    public mydbService: MydbService,
    public alertController: AlertController,
    public toasController: ToastController,
    public router: Router,
    public tts: TextToSpeech,
    public navController: NavController,
    public firebase: FireConectionService
  ) {}
  

  public async alerta(mensaje: string) {
    const alerta = await this.alertController.create({
      header: 'Alerta!',
      message: mensaje,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            console.log('ingreso OK');
          }
        }
      ]
    });
    alerta.present();
  }
  public async toast(mensaje: string) {
    const toastMessage = await this.toasController.create({
      message: mensaje,
      duration: 2000
    });
    toastMessage.present();
  }
  ngOnInit() {
    this.tts.speak({
      text: 'Estamos validando tus datos',
      locale: 'es-MX'
    })
    .then(() => {
      this.ingresar();
    });
  }
  public async crearUsuario() {
    let us: IUsuario = {
      id: 123,
      nombre: 'JUAN',
      pass: '123',
      usuario: 'usuario',
      telefono: 65632016
    }
    let usuario: IUsuario = await this.mydbService.addUsuario(us);
  }
  public async login(){
    this.usuarioBD = await this.mydbService.getUsuario();
    if(this.usuarioBD[0].pass === this.usuario.pass) {
      this.toast('Usuario Atentificado Correctamente, Bienvenido ' + this.usuarioBD[0].nombre);
      this.router.navigate(['list']);
    }else{
      this.alerta('El usuario no ha podido autentificarse');
    }
  }
  async ingresar() { 

  
    this.usuarioBD = await this.mydbService.getUsuario();
    if(this.usuarioBD) {
      if(this.usuarioBD.length > 0) {
        this.firebase.getUsuario(this.usuarioBD[0].usuario).subscribe(us => {
          if(!(us.length< 1)){
            if(this.usuarioBD[0].pass == us[0].pass){
              this.tts.speak({
                text: 'Bienvenido ' + this.usuarioBD[0].nombre,
                locale: 'es-MX'
              });
             
            }
          }
        })

      }
    }
  }

}
