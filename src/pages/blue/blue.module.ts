import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BluePage } from './blue';

@NgModule({
  declarations: [
    BluePage,
  ],
  imports: [
    IonicPageModule.forChild(BluePage),
  ],
})
export class BluePageModule {}
