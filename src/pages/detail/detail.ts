import { Component, NgZone} from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { BLE } from '@ionic-native/ble';
import { PagPProvider } from '../../providers/pag-p/pag-p';


@IonicPage()

@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})

export class DetailPage {
  peripheral:any={}
  statusMessage:string
  dp:any=''
  periferica:any
  valore:any
  verifica:boolean
  constructor(private pag:PagPProvider,private alertCtrl:AlertController,private navParams:NavParams,public navCtrl: NavController,private ble:BLE,private toastCtrl:ToastController,private ngZone:NgZone) {
    this.pag.loadDevice()
  this.verifica=this.navParams.get('verifica')
  if(this.verifica==true)
  {
    let device=this.pag.getDevice()
this.valore=this.navParams.get('string')
this.setStatus('Connecting to'+ device.name || device.id)

this.ble.connect(device.id).subscribe(
  peripheral=>this.onConnected(peripheral),
  peripheral=>this.onDeviceDisconnected(peripheral)

)
  } 
  else{
let device=this.navParams.get('device')
this.valore=this.navParams.get('string')
this.setStatus('Connecting to'+ device.name || device.id)

this.ble.connect(device.id).subscribe(
  peripheral=>this.onConnected(peripheral),
  peripheral=>this.onDeviceDisconnected(peripheral)

)}
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailPage');
  }
  setStatus(message) {
    console.log(message);
    this.ngZone.run(() => {
      this.statusMessage = message;
    });
  }
  stringToBytes() {
    let string=this.valore
    var array = new Uint8Array(string.length);
    for (var i = 0, l = string.length; i < l; i++) {
        array[i] = string.charCodeAt(i);
     }
     return array.buffer;
 }
  sendData()
  {
    this.ble.write(this.periferica.id,'9800','9802',this.stringToBytes())
  }
  onclick()
  {
    //possibile sostituirlo con ble.startNotification per una lettura automatica del valore
    //ogni volta che viene cambiato il valore
    this.ble.read(this.periferica.id,'9800','9802').then(
      buffer => 
      {
        
        let data = new Uint8Array(buffer);
        console.log('switch characteristic ' + data[0]);
        this.ngZone.run(() => {
            
            this.dp =JSON.stringify(data[0]); 
        } );}
    )
  }
  onConnected(peripheral)
  {
    this.ngZone.run(()=>{
      this.setStatus('connected');
      this.peripheral=peripheral
      this.periferica=peripheral
    })
  }
  onDeviceDisconnected(peripheral){
    let toast=this.toastCtrl.create({
      message: peripheral + ' disconected',
      duration: 3000,
      position:'middle'
    });
    toast.present();
  }
  ionViewWillLeave()
  {
    console.log('ionWiewWillLeave disconnecting blue');
    this.ble.disconnect(this.peripheral.id).then(
      () => console.log('Disconnected ' + JSON.stringify(this.peripheral)),
      () => console.log('ERROR disconnecting ' + JSON.stringify(this.peripheral))
    )
  }
  showAlert(title, message) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }
}
