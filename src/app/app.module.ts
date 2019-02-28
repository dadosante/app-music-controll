import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ProfiliPage } from '../pages/profili/profili';
import { ProfiliPageModule } from '../pages/profili/profili.module';
import { PagPProvider } from '../providers/pag-p/pag-p';
import { AddProPage } from '../pages/add-pro/add-pro';
import { AddProPageModule } from '../pages/add-pro/add-pro.module';
import { ModificaPageModule } from '../pages/modifica/modifica.module';
import { ModificaPage } from '../pages/modifica/modifica';
import { IonicStorageModule } from '@ionic/storage';

import { DetailPage } from '../pages/detail/detail';
import { BLE } from '@ionic-native/ble';
import { BluePage } from '../pages/blue/blue';
import { BluePageModule } from '../pages/blue/blue.module';
import { DetailPageModule } from '../pages/detail/detail.module';



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    DetailPage,
    
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    ProfiliPageModule,
    AddProPageModule,
    ModificaPageModule,
    BluePageModule,
 
   
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ProfiliPage,
    AddProPage,
    ModificaPage,
    DetailPage,
    BluePage
   
   
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    PagPProvider,
    BLE
   
  ]
})
export class AppModule {}
