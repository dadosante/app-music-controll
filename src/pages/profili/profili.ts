import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController } from 'ionic-angular';
import { PagPProvider } from '../../providers/pag-p/pag-p';
import { AddProPage } from '../add-pro/add-pro';
import { ModificaPage } from '../modifica/modifica';
import { BluePage } from '../blue/blue';
import { DetailPage } from '../detail/detail';

@IonicPage()
@Component({
  selector: 'page-profili',
  templateUrl: 'profili.html',
})
export class ProfiliPage {
  prArr:any=[];
  nprofilo:string
  vol:string
  bass:string
  alti:string
  bool:boolean=false;
  back:boolean=false
  dev:any
  constructor(private modalCtrl:ModalController,public navCtrl: NavController, public navParams: NavParams,private pag:PagPProvider,private alertCtrl:AlertController) {
  this.pag.loadDevice()
  this.nprofilo=this.navParams.get("nomeP")
  this.vol=this.navParams.get("vol")
  this.bass=this.navParams.get("bass")
  this.alti=this.navParams.get("alti")
  this.prArr=this.pag.getArr();
  console.log(this.prArr)
  if(this.prArr!=null)
  {
if(this.nprofilo!=undefined){
  for (let index = 0; index <Object.keys(this.pag.prArr).length; index++) {
    const element:any = this.pag.prArr[index];
    
   if(this.nprofilo == String(element.profilo))
   {
 this.bool=true;
   }
  }
  if(this.bool==true)
  {this.presentAlert();
 this.navCtrl.push(AddProPage,{'bol':this.bool=true});
  }
  else
 { this.pag.addP(this.nprofilo,this.vol,this.bass,this.alti ) ;
  this.pag.saveAll()
 }
}}
else{
  this.pag.add(this.nprofilo,this.vol,this.bass,this.alti ) ;
  this.pag.saveAll()}
}
presentAlert() {
  let alert = this.alertCtrl.create({
    title: 'Errore Inserimento',
    subTitle: 'Profilo Presente',
    buttons: ['Dismiss']
  });
  alert.present();
 
}
  remove(no){
    (this.prArr).splice(no,1)
    this.pag.saveAll()
  }
  addProfilo()
  {
    this.navCtrl.setRoot(AddProPage,{'back':this.back=true})
  }
  modifica(index)
  { 
    let modifica=this.modalCtrl.create(ModificaPage,{'index':index})
    modifica.present();
  }
  saveProfili()
  {
    this.pag.saveAll()
  }
  applica(index)
  {let verifica:boolean=true
   let string='v=' + this.prArr[index].volume+' '+'b='+this.prArr[index].bassi+' '+'a='+this.prArr[index].alti;
   if(this.pag.getDevice()==null)
   {
     
     let alert=this.alertCtrl.create( {
       title: 'Device',
       subTitle: 'Nessun dispositivo connesso',
      buttons: [{
        text:'Seleziona Dispositivo',
        handler:()=>{this.navCtrl.push(BluePage)}}]
   });
   alert.present(); 
   }
   else{
     this.navCtrl.push(DetailPage,{'string':string,'verifica':verifica})
   }
  }
}
