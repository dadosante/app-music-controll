import { Component} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProfiliPage } from '../profili/profili';
import { AddProPage } from '../add-pro/add-pro';
import { PagPProvider } from '../../providers/pag-p/pag-p';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  
  constructor(public navCtrl:NavController,public navPara: NavParams,private pag:PagPProvider) {
 this.pag.load()
  }
  openPage()
  {
    this.navCtrl.setRoot(ProfiliPage);
    
  }
  openAdd()
  {
    this.navCtrl.push(AddProPage);
  }
}
