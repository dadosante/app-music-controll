import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Keyboard } from 'ionic-angular';
import { PagPProvider } from '../../providers/pag-p/pag-p';
import { HomePage } from '../home/home';
import { ProfiliPage } from '../profili/profili';

@IonicPage()
@Component({
  selector: 'page-add-pro',
  templateUrl: 'add-pro.html',
})
export class AddProPage {
  isbool:boolean=this.navParams.get('bol');
  isback:boolean=this.navParams.get('back');
  nprofilo:string
  vol:string='0'
  bass:string='0'
  alti:string='0'
  bool:boolean=false;
  
  constructor(private key:Keyboard,public navCtrl: NavController, public navParams: NavParams,private pag:PagPProvider, private alertCtrl:AlertController) {
  
  }
  ionViewDidLoad() {
  
  }
  keyhide()
  {
 if(this.key.isOpen())
 {
   this.key.close()
 }
  }
  back(){
    this.navCtrl.setRoot(HomePage);
  }
  back2(){
    this.navCtrl.setRoot(ProfiliPage)
    
  }
  save(nomeP,vol,bass,alti)
  {
    if(String(nomeP)==""||nomeP==undefined||String(nomeP).length<=1)
    {
      this.presentAlert();
    }
    else
     this.navCtrl.setRoot(ProfiliPage,{'nomeP':nomeP,'vol':vol,'bass':bass,'alti':alti});
     this.isbool=false;
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
