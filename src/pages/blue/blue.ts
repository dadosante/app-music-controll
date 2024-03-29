import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController,ToastController } from 'ionic-angular';
import { DetailPage } from '../detail/detail';
import { BLE } from '@ionic-native/ble';
import { PagPProvider } from '../../providers/pag-p/pag-p';
/**
 * Generated class for the BluePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-blue',
  templateUrl: 'blue.html',
})
export class BluePage {
  devices: any[]=[]
statusMessage:string
  constructor(private pag:PagPProvider,public navCtrl: NavController,private ble:BLE,private toastCtrl:ToastController,private ngZone:NgZone) {
  this.pag.loadDevice()
  }
  ionViewDidEnter() {
    console.log('ionViewDidEnter');
    this.scan();
  }

  scan() {
    this.setStatus('Scanning for Bluetooth LE Devices');
    this.devices = [];  // clear list
   
    this.ble.scan([], 5).subscribe(
      device => this.onDeviceDiscovered(device), 
      error => this.scanError(error)
    );

    setTimeout(this.setStatus.bind(this), 5000, 'Scan complete');
  }

  onDeviceDiscovered(device) {
    console.log('Discovered ' + JSON.stringify(device, null, 2));
    this.ngZone.run(() => {
      this.devices.push(device);
    });
  }

  // If location permission is denied, you'll end up here
  scanError(error) {
    this.setStatus('Error ' + error);
    let toast = this.toastCtrl.create({
      message: 'Error scanning for Bluetooth low energy devices',
      position: 'middle',
      duration: 5000
    });
    toast.present();
  }

  setStatus(message) {
    console.log(message);
    this.ngZone.run(() => {
      this.statusMessage = message;
    });
  }
  deviceSelected(device)
 {
   console.log(JSON.stringify(device)+'selected');
   this.pag.saveDevice(device)
   this.navCtrl.push(DetailPage,{'device':device});
   
 } 
}
