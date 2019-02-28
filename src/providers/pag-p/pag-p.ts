
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class PagPProvider {
  prArr:Array<Object>=[];
  isError=false;
  stringa:String
  dev:any
  constructor(private storage:Storage) {
}
add(pro,vol,bass,alti)
{
  this.prArr=[{profilo:pro,volume:vol,bassi:bass,alti:alti}]
  this.prArr.splice(0,1)
  console.log(this.prArr)

}
addP(pro,vol,bass,alti)
{
 this.prArr.push({profilo:pro,volume:vol,bassi:bass,alti:alti})
}
  getArr()
{
  return  this.prArr;
}
saveAll()
{
this.storage.set('prof',this.prArr)
}
load()
{
  this.storage.get('prof').then((val)=>{
    this.prArr=val
  })
}
saveDevice(device)
{
  this.storage.set('device',device)
}
loadDevice()
{
  this.storage.get('device').then((d)=>{
   this.dev=d
  })
}
getDevice()
{
  return this.dev
}

}
