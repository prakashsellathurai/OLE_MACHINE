import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import {OnChanges} from '@angular/core';
import * as d3 from 'd3';
import { Hotspot, HotspotNetwork } from '@ionic-native/hotspot/ngx';
import { LoadingController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnChanges {
  public demand:Number;
  public checked = false;
  private svgElement: HTMLElement;
  private chartProps: any;
  private ssid = "test";
  private password = "password";
  constructor(
    public loadingController: LoadingController,
    private hotspot: Hotspot,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: Storage
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.getDemand ();
      this.buildchart();
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  onInputTime (evt) {
    this.storage.set('demand', evt);
  }
  async getDemand () {
    this.demand = await this.storage.get('demand');
      this.demand = (this.demand === null) ? 0 : this.demand; 
      console.log(this.demand);
    return this.demand;
  }
  ngOnChanges() {
  
  }
  buildchart() {
   
  } 
  handleToggleChange(evt) {

    console.log(evt.detail.checked);
    if (evt.detail.checked) {
      this.presentLoadingWithOptions();
      this.hotspot
      .connectToWifi(this.ssid, this.password )
      .then( () => {
        console.log('connected to wifi');
   }).catch( (e) => {
     console.error(e);
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