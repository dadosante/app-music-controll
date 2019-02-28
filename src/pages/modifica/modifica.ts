import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { PagPProvider } from '../../providers/pag-p/pag-p';

@IonicPage()
@Component({
  selector: 'page-modifica',
  templateUrl: 'modifica.html',
})
export class ModificaPage {
  ind:any=this.navParams.get('index')
  prArr:any=[]
  nomeP:String
  vol:string
  bass:string
  alti:string
  
  constructor(public navCtrl: NavController, public navParams: NavParams,private pag:PagPProvider,private alertCtrl:AlertController) {
 this.prArr=this.pag.getArr();
  }

  ionViewDidLoad() {
  this.nomeP=this.prArr[this.ind].profilo
  this.vol=this.prArr[this.ind].volume
  this.bass=this.prArr[this.ind].bassi
  this.alti=this.prArr[this.ind].alti
  }
 back()
 {
   this.navCtrl.pop()
 }
 save(){
   
  if(String(this.nomeP)==""||this.nomeP==undefined||String(this.nomeP).length<=1)
    {
      this.presentAlert();
    }
    else
     { 
          this.prArr.splice(this.ind,1,{profilo:this.nomeP,volume:this.vol,bassi:this.bass,alti:this.alti})
          this.pag.saveAll()
              this.navCtrl.pop();
     }
 }
 presentAlert() {
  let alert = this.alertCtrl.create({
    title: 'Errore Inserimento',
    subTitle: 'Inserisci nome Profilo',
    buttons: ['Dismiss']
  });
  alert.present();
}
}
