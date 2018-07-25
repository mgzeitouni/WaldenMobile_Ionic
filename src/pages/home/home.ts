import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { BLE } from '@ionic-native/ble';
import { ChangeDetectorRef } from '@angular/core';
// import { timer } from 'rxjs/observable/timer';
import { Observable, Subscription } from 'rxjs/Rx';
import { SettingsProvider } from '../../providers/settings/settings';
import { NativeAudio } from '@ionic-native/native-audio';
import { BackgroundMode } from '@ionic-native/background-mode';
import { HttpClient } from '@angular/common/http';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

 // devices: any[] = [];
  // statusMessage: string;
  device: any = null;
  blinkSpeed=15;
  newBlinkSpeed=15;
  discovered:boolean=false;
  connected:boolean=false;
  peripheral;
  reading=0;

  meditationStarted:boolean=false;

  threshold_reading=500;


  constructor(public navCtrl: NavController, 
              private toastCtrl: ToastController,
              private ble: BLE,
              private ngZone: NgZone,
              private cd: ChangeDetectorRef,
              public settingsProvider: SettingsProvider,
              private nativeAudio: NativeAudio,
              private backgroundMode: BackgroundMode,
              private http: HttpClient) { 

                //this.meditationStarted=true;
                // this.startTimer();

               this.nativeAudio.preloadSimple('uniqueId1', 'assets/audio/bell.mp3')
                
              this.backgroundMode.enable();
          

  }

  callAPI(){
    this.http.get("https://connected-litter.mybluemix.net/test-background?ticks="+this.ticks).subscribe(res=>console.log(res))
  }

  play(){
    this.nativeAudio.play('uniqueId1', () => console.log('uniqueId1 is done playing'));
  }

  error(){

  }
  ionViewDidEnter() {
    console.log('ionViewDidEnter');
    this.scan();

  }

  // ionViewWillLeave(){
  //   this.onDeviceDisconnected(this.peripheral);
  // }

  testReading(){
    
   // console.log(this.reading + ": "+this.settingsProvider.thresholdReading +" - "+(this.reading>this.settingsProvider.thresholdReading))

    if (this.reading>this.settingsProvider.thresholdReading && !this.meditationStarted){

      this.meditationStarted=true;
      this.cd.detectChanges();
      this.startTimer();

      this.callAPI();
      
      


    }
   // return this.reading>this.threshold_reading
  }

  sub: Subscription;
  ticks = 2;
  minutesDisplay: number = 0;
  hoursDisplay: number = 0;
  secondsDisplay: number = 0;


 finishMeditation(){
  this.vibrateOn();
  this.meditationStarted=false;
  
  this.play();

  this.cd.detectChanges();

  // this.http.get('https://connected-litter.mybluemix.net/api').subscribe(res=>console.log(res))

  var that = this;

  setTimeout(function(){
    that.vibrateOff();
  },3000)
 }


  startTimer(){

     var that = this;

    let timer = Observable.timer(1, 1000);
    this.sub = timer.subscribe(
        t => {
            that.ticks = Math.floor((that.settingsProvider.timerLength)*60)-t;
            
            that.secondsDisplay = that.getSeconds(that.ticks);
            that.minutesDisplay = that.getMinutes(that.ticks);
           // that.hoursDisplay = that.getHours(that.ticks);

            // At 0, trigger vibration
            if(that.ticks==0){

              that.finishMeditation();

            }


        }
    );
  }

  private getSeconds(ticks: number) {
    return this.pad(ticks % 60);
}

private getMinutes(ticks: number) {
     return this.pad((Math.floor(ticks / 60)) % 60);
}

private getHours(ticks: number) {
    return this.pad(Math.floor((ticks / 60) / 60));
}

private pad(digit: any) { 
    return digit <= 9 ? '0' + digit : digit;
}


  scan() {
    //this.setStatus('Scanning for BLE Device...');
    //this.devices = [];  // clear list
    this.ble.scan([], 5).subscribe(
      device => this.onDeviceDiscovered(device), 
    //  error => this.scanError(error)
    );

  //  setTimeout(this.setStatus.bind(this), 5000, 'Scan complete');
  }

  vibrateOn(){

    var value =this.str2ab("1")

    this.ble.write(this.peripheral.id, this.peripheral.services[0],this.peripheral.characteristics[1].characteristic,value).then(
      result=> {
      }).catch(error=> {
          alert(JSON.stringify(error));
      });
  }

  vibrateOff(){

    var value =this.str2ab("0")

    this.ble.write(this.peripheral.id, this.peripheral.services[0],this.peripheral.characteristics[1].characteristic,value).then(
      result=> {
      }).catch(error=> {
          alert(JSON.stringify(error));
      });
  }


  onConnected(peripheral) {

     // this.setStatus('');
     this.connected=true;
      this.peripheral = peripheral;

      console.log(JSON.stringify(this.peripheral))

      this.backgroundMode.enable();

      // this.backgroundMode.on("activate").subscribe(()=>{
      //   console.log('in the background!')


          var service = "AFC672E8-6CA4-4252-BE86-B6F20E3F7467";
          var char = "8204321F-D4BE-4556-9537-2EADB108D28E"
          this.ble.startNotification(this.peripheral.id, service,char)
        .subscribe(buf=>{
           

      let json=JSON.parse(JSON.stringify(new Uint8Array(buf)))
      let arr =Object.values(json)

      this.reading =  new Float32Array(new Uint8Array(arr).buffer)[0];

     console.log(this.reading)

      this.testReading();
          
          this.cd.detectChanges();

          })

    // })

    
   
  }
  onDeviceDisconnected(peripheral) {
    this.ble.disconnect(this.peripheral.id).then(
      () => console.log('Disconnected ' + JSON.stringify(this.peripheral)),
      () => console.log('ERROR disconnecting ' + JSON.stringify(this.peripheral))
    )
    this.connected=false;
  }


  arrayBufferToString(buffer){

    var bufView = new Uint8Array(buffer);
    var length = bufView.length;
    var result = '';
    var addition = 19;
    
    for(var i = 0;i<length;i+=addition){
    
        if(i + addition > length){
            addition = length - i;
        }
        result += String.fromCharCode.apply(null, 
    bufView.subarray(i,i+addition));
    }
    
    return result;
    
    }

  bytesToString(buffer) {
    return String.fromCharCode.apply(null, new Uint8Array(buffer));
  }


  onDeviceDiscovered(device) {
 console.log(JSON.stringify(device))
    if ( device.advertising.kCBAdvDataLocalName !==undefined && device.advertising.kCBAdvDataLocalName.toString().indexOf("Walden")>-1 || (device.name && device.name.toString().indexOf("Walden")>-1)){
    console.log("--------------------------FOUND-------------------") 
    console.log('Discovered ' + JSON.stringify(device, null, 2));
      this.device = device;
      this.discovered = true;
    }
  }

  connectDevice(){
    this.ble.connect(this.device.id).subscribe(

      peripheral => this.onConnected(peripheral),
      peripheral => this.onDeviceDisconnected(peripheral)
    
    );

    this.connected=true;

  }



  str2ab(str) {
    var buf = new ArrayBuffer(str.length * 2); // 2 bytes for each char
    var bufView = new Uint16Array(buf);
    for (var i = 0, strLen = str.length; i < strLen; i++) {
      bufView[i] = str.charCodeAt(i);
    }
    return buf;
  }

  rangeChange(input){

    var sendBLE;
    if (this.newBlinkSpeed > this.blinkSpeed){
      sendBLE = 'a';
    }else if (this.newBlinkSpeed < this.blinkSpeed){
      sendBLE = 'aa';
    }

    this.blinkSpeed = this.newBlinkSpeed;
console.log(sendBLE)
    var value = this.str2ab(sendBLE)
    
    this.ble.write(this.peripheral.id, this.peripheral.services[0],this.peripheral.characteristics[0].characteristic,value).then(
      result=> {
      }).catch(error=> {
          alert(JSON.stringify(error));
      });

  }

  goBackground(){
    var that =this;

    this.backgroundMode.enable();

    this.backgroundMode.on("activate").subscribe(()=>{
      setInterval(function(){
        console.log('in the background!');
        that.callAPI();
       // that.http.get("https://connected-litter.mybluemix.net/test-background")
      }, 2000 )
  
    })
  }

  // If location permission is denied, you'll end up here
  // scanError(error) {
  //   this.setStatus('Error ' + error);
  //   let toast = this.toastCtrl.create({
  //     message: 'Error scanning for Bluetooth low energy devices',
  //     position: 'middle',
  //     duration: 5000
  //   });
  //   toast.present();
  // }



  // setStatus(message) {
  //   console.log(message);
  //   this.ngZone.run(() => {
  //     this.statusMessage = message;
  //   });
  // }

  // deviceSelected(device) {
  //   console.log(JSON.stringify(device) + ' selected');
  //   this.navCtrl.push(DetailPage, {
  //     device: device
  //   });
  // }


}
