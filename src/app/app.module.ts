import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {AngularFireModule} from '@angular/fire'
import {AngularFireDatabaseModule} from '@angular/fire/database'
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
import { IonicStorageModule } from '@ionic/storage';
export const firebaseConfig = {
  apiKey: "AIzaSyBa4aBka5Y4MvwSMsPP77CLhp7LGSsqiBc",
  authDomain: "practica-ionic-fe1ef.firebaseapp.com",
  databaseURL: "https://practica-ionic-fe1ef.firebaseio.com",
  projectId: "practica-ionic-fe1ef",
  storageBucket: "practica-ionic-fe1ef.appspot.com",
  messagingSenderId: "1003475899744",
  appId: "1:1003475899744:web:10aef98ba16a6663d83a05"

}

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    IonicStorageModule.forRoot()
  ],
  providers: [
    StatusBar,
    SplashScreen,   
    SpeechRecognition,
    TextToSpeech,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
