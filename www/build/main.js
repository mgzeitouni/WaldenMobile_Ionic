webpackJsonp([1],{

/***/ 184:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 217:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_ble__ = __webpack_require__(155);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, toastCtrl, ble, ngZone, cd) {
        this.navCtrl = navCtrl;
        this.toastCtrl = toastCtrl;
        this.ble = ble;
        this.ngZone = ngZone;
        this.cd = cd;
        // devices: any[] = [];
        // statusMessage: string;
        this.device = null;
        this.blinkSpeed = 15;
        this.newBlinkSpeed = 15;
        this.discovered = false;
        this.connected = false;
        this.weight = 0;
    }
    HomePage.prototype.ionViewDidEnter = function () {
        console.log('ionViewDidEnter');
        this.scan();
    };
    HomePage.prototype.ionViewWillLeave = function () {
        this.onDeviceDisconnected(this.peripheral);
    };
    HomePage.prototype.scan = function () {
        var _this = this;
        //this.setStatus('Scanning for BLE Device...');
        //this.devices = [];  // clear list
        this.ble.scan([], 5).subscribe(function (device) { return _this.onDeviceDiscovered(device); });
        //  setTimeout(this.setStatus.bind(this), 5000, 'Scan complete');
    };
    HomePage.prototype.onConnected = function (peripheral) {
        var _this = this;
        // this.setStatus('');
        this.connected = true;
        this.peripheral = peripheral;
        this.ble.startNotification(this.peripheral.id, this.peripheral.services[0], this.peripheral.characteristics[0].characteristic)
            .subscribe(function (buf) {
            //let data = this.bytesToString(new Uint8Array(buf));
            var json = JSON.parse(JSON.stringify(new Uint8Array(buf)));
            var arr = Object.values(json);
            _this.weight = new Float32Array(new Uint8Array(arr).buffer)[0];
            console.log(_this.weight);
            _this.cd.detectChanges();
        });
    };
    HomePage.prototype.onDeviceDisconnected = function (peripheral) {
        var _this = this;
        this.ble.disconnect(this.peripheral.id).then(function () { return console.log('Disconnected ' + JSON.stringify(_this.peripheral)); }, function () { return console.log('ERROR disconnecting ' + JSON.stringify(_this.peripheral)); });
        this.connected = false;
    };
    HomePage.prototype.readData = function () {
        console.log('requested dataaaaaa');
        var that = this;
        this.ble.startNotification(this.peripheral.id, this.peripheral.services[0], this.peripheral.characteristics[0].characteristic)
            .subscribe(function (buf) {
            //let data = this.bytesToString(new Uint8Array(buf));
            var json = JSON.parse(JSON.stringify(new Uint8Array(buf)));
            var arr = Object.values(json);
            that.weight = new Float32Array(new Uint8Array(arr).buffer)[0];
            console.log(that.weight);
        });
    };
    HomePage.prototype.bytesToString = function (buffer) {
        return String.fromCharCode.apply(null, new Uint8Array(buffer));
    };
    HomePage.prototype.onDeviceDiscovered = function (device) {
        console.log('Discovered ' + JSON.stringify(device, null, 2));
        if (device.name !== undefined && device.name.toString().indexOf("Kitty") > -1) {
            console.log("--------------------------FOUND-------------------");
            this.device = device;
            this.discovered = true;
        }
    };
    HomePage.prototype.connectDevice = function () {
        var _this = this;
        this.ble.connect(this.device.id).subscribe(function (peripheral) { return _this.onConnected(peripheral); }, function (peripheral) { return _this.onDeviceDisconnected(peripheral); });
        this.connected = true;
    };
    HomePage.prototype.str2ab = function (str) {
        var buf = new ArrayBuffer(str.length * 2); // 2 bytes for each char
        var bufView = new Uint16Array(buf);
        for (var i = 0, strLen = str.length; i < strLen; i++) {
            bufView[i] = str.charCodeAt(i);
        }
        return buf;
    };
    HomePage.prototype.rangeChange = function (input) {
        var sendBLE;
        if (this.newBlinkSpeed > this.blinkSpeed) {
            sendBLE = 'a';
        }
        else if (this.newBlinkSpeed < this.blinkSpeed) {
            sendBLE = 'aa';
        }
        this.blinkSpeed = this.newBlinkSpeed;
        console.log(sendBLE);
        var value = this.str2ab(sendBLE);
        this.ble.write(this.peripheral.id, this.peripheral.services[0], this.peripheral.characteristics[0].characteristic, value).then(function (result) {
        }).catch(function (error) {
            alert(JSON.stringify(error));
        });
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/Users/morris/smart-products/smartDog/src/pages/home/home.html"*/'<ion-header>\n    <ion-navbar>\n      <ion-title>\n        BLE Connect\n      </ion-title>\n      <ion-buttons end>\n        <button ion-button (click)="scan()">\n          Scan\n        </button>\n      </ion-buttons>\n    </ion-navbar>\n  </ion-header>\n\n  <ion-content>\n\n\n\n\n        <ion-card >\n        <ion-row >\n         \n          <ion-item *ngIf="!discovered"><h1>Searching for litter box...</h1></ion-item>\n          <ion-item *ngIf="discovered && !connected"><h1>Litter Box found!</h1></ion-item>\n          <ion-item *ngIf="connected"><h1>Litter Box connected!</h1></ion-item>\n        </ion-row>\n        <ion-row>\n          <ion-col>\n          <button ion-button large round color="secondary" (click)="connectDevice();" >Connect</button>\n        </ion-col>\n        <ion-col>\n            <button ion-button large round color="danger" (click)="onDeviceDisconnected(peripheral)" >Disconnect</button>\n          </ion-col>\n       \n      </ion-row>\n  \n    </ion-card >\n       <!-- <ion-row>\n         <ion-card *ngIf="connected">\n           <ion-card-header>\n           Change blinking frequency...\n          </ion-card-header>\n\n          <ion-card-content>\n              <ion-item >\n                  <ion-range min="0" max="30" [(ngModel)]="newBlinkSpeed" color="secondary" (ionChange)="rangeChange()">\n                      <ion-label range-left>0 Hz</ion-label>\n                      <ion-label range-right>5 Hz</ion-label>\n                    </ion-range>\n                </ion-item>\n      \n          </ion-card-content>\n           </ion-card>\n        </ion-row>-->\n     \n       \n      <ion-item no-lines text-center class="circle" *ngIf="connected">\n        <br><br>\n          <h1 style="font-size:40px;">Weight:</h1>\n          <br><br>\n          <h1 *ngIf="weight>0" style="font-size:60px;"> {{weight | number:\'0.1-1\'}}</h1>\n          <br>\n          <h2 *ngIf="weight>0" style="font-size:40px;">lbs</h2>\n        </ion-item>\n\n\n\n        <!-- <ion-row>\n          <ion-card *ngIf="connected">\n            <ion-card-header>\n              Weight:\n            </ion-card-header>\n            <ion-card-content>\n              \n                <h1>{{weight | number:\'0.2-2\'}} lbs</h1>\n            </ion-card-content>\n        \n          </ion-card>\n        </ion-row> -->\n\n      \n\n</ion-content>\n  \n  <!-- <ion-content>\n     <ion-list> \n      <button ion-item *ngFor="let device of devices" (click)="deviceSelected(device)">\n        <h2>{{ device.name || \'Unnamed\' }}</h2>\n        <p>{{ device.id }}</p>\n        <p>RSSI: {{ device.rssi }}</p>\n      </button>  \n     </ion-list> \n  </ion-content> -->\n  \n'/*ion-inline-end:"/Users/morris/smart-products/smartDog/src/pages/home/home.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_ble__["a" /* BLE */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgZone */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* ChangeDetectorRef */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 226:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 226;

/***/ }),

/***/ 267:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/home/home.module": [
		744,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 267;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 310:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AboutPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(72);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AboutPage = /** @class */ (function () {
    function AboutPage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    AboutPage.prototype.rangeChange = function () { };
    AboutPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-about',template:/*ion-inline-start:"/Users/morris/smart-products/smartDog/src/pages/about/about.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      About\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n    <ion-item>\n        <ion-range min="0" max="200" [(ngModel)]="blink" color="secondary" (ionChange)="rangeChange()">\n            <ion-label range-left>0</ion-label>\n            <ion-label range-right>200</ion-label>\n          </ion-range>\n      </ion-item>\n\n      <p>Blink: {{blink}}</p>\n</ion-content>\n'/*ion-inline-end:"/Users/morris/smart-products/smartDog/src/pages/about/about.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* NavController */]])
    ], AboutPage);
    return AboutPage;
}());

//# sourceMappingURL=about.js.map

/***/ }),

/***/ 311:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContactPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(72);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ContactPage = /** @class */ (function () {
    function ContactPage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    ContactPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-contact',template:/*ion-inline-start:"/Users/morris/smart-products/smartDog/src/pages/contact/contact.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      Contact\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <ion-list>\n    <ion-list-header>Follow us on Twitter</ion-list-header>\n    <ion-item>\n      <ion-icon name="ionic" item-start></ion-icon>\n      @ionicframework\n    </ion-item>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"/Users/morris/smart-products/smartDog/src/pages/contact/contact.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* NavController */]])
    ], ContactPage);
    return ContactPage;
}());

//# sourceMappingURL=contact.js.map

/***/ }),

/***/ 433:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(434);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(456);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_aws_amplify__ = __webpack_require__(509);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_aws_amplify___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_aws_amplify__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__aws_exports__ = __webpack_require__(743);




__WEBPACK_IMPORTED_MODULE_2_aws_amplify___default.a.configure(__WEBPACK_IMPORTED_MODULE_3__aws_exports__["a" /* default */]);
Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 456:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(507);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_about_about__ = __webpack_require__(310);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_contact_contact__ = __webpack_require__(311);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_tabs_tabs__ = __webpack_require__(508);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_status_bar__ = __webpack_require__(308);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_splash_screen__ = __webpack_require__(309);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_ble__ = __webpack_require__(155);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_home_home__ = __webpack_require__(217);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};











// import {
//   IMqttMessage,
//   MqttModule,
//   MqttService
// } from 'ngx-mqtt';
// import { MqttProvider } from '../providers/mqtt/mqtt';
// import { HttpClient, HttpHandler } from '@angular/common/http';
// export const MQTT_SERVICE_OPTIONS = {
//   hostname: 'lcx26z.messaging.internetofthings.ibmcloud.com',
//   port: 8883,
//   path:'/',
//   protocol:'ws',
//   clientId: 'a:lcx26z:myapp',
//   username:'a-lcx26z-ke5cisfbb5',
//   password:'DdWHEHn0z9Dci4qD!k'
// };
// export function mqttServiceFactory() {
//   return new MqttService(MQTT_SERVICE_OPTIONS);
// }
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_4__pages_about_about__["a" /* AboutPage */],
                __WEBPACK_IMPORTED_MODULE_5__pages_contact_contact__["a" /* ContactPage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_tabs_tabs__["a" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_home_home__["a" /* HomePage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/home/home.module#HomePageModule', name: 'HomePage', segment: 'home', priority: 'low', defaultHistory: [] }
                    ]
                })
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_4__pages_about_about__["a" /* AboutPage */],
                __WEBPACK_IMPORTED_MODULE_5__pages_contact_contact__["a" /* ContactPage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_tabs_tabs__["a" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_home_home__["a" /* HomePage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_7__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_8__ionic_native_splash_screen__["a" /* SplashScreen */],
                // MqttProvider,
                // HttpClient,
                __WEBPACK_IMPORTED_MODULE_9__ionic_native_ble__["a" /* BLE */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 507:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(308);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(309);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_ble__ = __webpack_require__(155);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_home_home__ = __webpack_require__(217);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen, ble) {
        this.ble = ble;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_5__pages_home_home__["a" /* HomePage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/Users/morris/smart-products/smartDog/src/app/app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"/Users/morris/smart-products/smartDog/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_ble__["a" /* BLE */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 508:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__about_about__ = __webpack_require__(310);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__contact_contact__ = __webpack_require__(311);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var TabsPage = /** @class */ (function () {
    function TabsPage() {
        this.tab1Root = 'HomePage';
        this.tab2Root = __WEBPACK_IMPORTED_MODULE_1__about_about__["a" /* AboutPage */];
        this.tab3Root = __WEBPACK_IMPORTED_MODULE_2__contact_contact__["a" /* ContactPage */];
    }
    TabsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/Users/morris/smart-products/smartDog/src/pages/tabs/tabs.html"*/'<ion-tabs>\n  <ion-tab [root]="tab1Root" tabTitle="Home" tabIcon="home"></ion-tab>\n  <ion-tab [root]="tab2Root" tabTitle="About" tabIcon="information-circle"></ion-tab>\n  <ion-tab [root]="tab3Root" tabTitle="Contact" tabIcon="contacts"></ion-tab>\n</ion-tabs>\n'/*ion-inline-end:"/Users/morris/smart-products/smartDog/src/pages/tabs/tabs.html"*/
        }),
        __metadata("design:paramtypes", [])
    ], TabsPage);
    return TabsPage;
}());

//# sourceMappingURL=tabs.js.map

/***/ }),

/***/ 574:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 576:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 608:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 609:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 743:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// WARNING: DO NOT EDIT. This file is Auto-Generated by AWS Mobile Hub. It will be overwritten.
// Copyright 2017-2018 Amazon.com, Inc. or its affiliates (Amazon). All Rights Reserved.
// Code generated by AWS Mobile Hub. Amazon gives unlimited permission to
// copy, distribute and modify it.
// AWS Mobile Hub Project Constants
var awsmobile = {
    'aws_app_analytics': 'enable',
    'aws_cognito_identity_pool_id': 'us-east-1:fd772ff0-503c-4698-8971-61a9f546106f',
    'aws_cognito_region': 'us-east-1',
    'aws_content_delivery': 'enable',
    'aws_content_delivery_bucket': 'smartdog-hosting-mobilehub-1591034241',
    'aws_content_delivery_bucket_region': 'us-east-1',
    'aws_content_delivery_cloudfront': 'enable',
    'aws_content_delivery_cloudfront_domain': 'd2ylwmfzzmdr11.cloudfront.net',
    'aws_mobile_analytics_app_id': 'd6753a521949428eac644fe000d7ba9a',
    'aws_mobile_analytics_app_region': 'us-east-1',
    'aws_project_id': 'f09d4e78-8cb3-41a9-b729-4404631980ea',
    'aws_project_name': 'smartDog-2018-04-28-23-43-59',
    'aws_project_region': 'us-east-1',
    'aws_resource_name_prefix': 'smartdog-mobilehub-1591034241',
    'aws_sign_in_enabled': 'enable',
    'aws_user_files': 'enable',
    'aws_user_files_s3_bucket': 'smartdog-userfiles-mobilehub-1591034241',
    'aws_user_files_s3_bucket_region': 'us-east-1',
    'aws_user_pools': 'enable',
    'aws_user_pools_id': 'us-east-1_6RKdx32yO',
    'aws_user_pools_mfa_type': 'ON',
    'aws_user_pools_web_client_id': '4gkgj8qnp54qluimci6ik4vk1p',
};
/* harmony default export */ __webpack_exports__["a"] = (awsmobile);
//# sourceMappingURL=aws-exports.js.map

/***/ })

},[433]);
//# sourceMappingURL=main.js.map