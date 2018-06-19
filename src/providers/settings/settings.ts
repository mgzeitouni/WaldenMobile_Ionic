import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

/*
  Generated class for the SettingsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SettingsProvider {

  public timerLength: number=5;

  public thresholdReading:number=100;

  constructor(public storage: Storage) {
    console.log('Hello SettingsProvider Provider');

    var that = this;

    this.storage.get('data').then(data=>{
    
      if (data !== undefined && data !=null){
        
        that.timerLength= parseFloat(data.timerLength);
        that.thresholdReading=parseInt(data.thresholdReading)
        
      }


    })

  }

  setLength(){

  var data = {"timerLength":this.timerLength,
              "thresholdReading": this.thresholdReading
}


  this.storage.set('data',data);
  }

}
