import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import {OnChanges} from '@angular/core';
import * as d3 from 'd3';
import { Hotspot, HotspotNetwork } from '@ionic-native/hotspot/ngx';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnChanges {
  public checked = false;
  private svgElement: HTMLElement;
  private chartProps: any;
  constructor(
    public loadingController: LoadingController,
    private hotspot: Hotspot,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.buildchart();
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  ngOnChanges() {
  
  }
  buildchart() {
   
  } 
  handleToggleChange(evt) {

    console.log(evt.detail.checked);
    if (evt.detail.checked) {
      this.presentLoadingWithOptions();
      this.hotspot.connectToWifi(ssid, ).then( () => {
        //connection to the WiFi network was successfull
   }).catch( () => {
       //connection to the WiFi network failed
   });
    }
 }
 async presentLoadingWithOptions() {
  const loading = await this.loadingController.create({
    spinner: null,
    duration: 5000,
    message: 'Please wait...',
    translucent: true,
    cssClass: 'custom-class custom-loading'
  });
  return await loading.present();
}
}