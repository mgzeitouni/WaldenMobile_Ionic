import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { BLE } from '@ionic-native/ble';
import { HomePage } from '../pages/home/home';
import { SettingsProvider } from '../providers/settings/settings';

import { IonicStorageModule } from '@ionic/storage';
import { NativeAudio } from '@ionic-native/native-audio';

import { BackgroundMode } from '@ionic-native/background-mode';
import { HttpClient, HttpClientModule } from '@angular/common/http';

// import {
//   IMqttMessage,
//   MqttModule,
//   MqttService
// } from 'ngx-mqtt';
// import { MqttProvider } from '../providers/mqtt/mqtt';
// import { HttpClient, HttpHandler } from '@angular/common/http';

// export const MQTT_SERVICE_OPTIONS = {
//   hostname: 'lcx26z.messaging.internetofthings.ibmcloud.com',
//   port: 8883,
//   path:'/',
//   protocol:'ws',
//   clientId: 'a:lcx26z:myapp',
//   username:'a-lcx26z-ke5cisfbb5',
//   password:'DdWHEHn0z9Dci4qD!k'
// };

// export function mqttServiceFactory() {
//   return new MqttService(MQTT_SERVICE_OPTIONS);
// }


@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    TabsPage,
    HomePage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    TabsPage,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    NativeAudio,
    BackgroundMode,
    HttpClient,
    // MqttProvider,
    // HttpClient,
    BLE,
    SettingsProvider
  ]
})
export class AppModule {}
