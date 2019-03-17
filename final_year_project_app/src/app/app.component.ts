import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import {OnChanges} from '@angular/core';
import { Hotspot, HotspotNetwork } from '@ionic-native/hotspot/ngx';
import { LoadingController } from '@ionic/angular';


import { Storage } from '@ionic/storage';
import { Observable, Subscriber } from 'rxjs';
import {Chart } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import {LivechartService} from './livechart.service';
import 'chartjs-plugin-streaming';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnChanges {
  public demand;
  public checked = false;

  private svgElement: HTMLElement;
  private chartProps: any;
  private ssid = "test";
  private password = "password";

  public liveCounts = 0 ;
  public totalCounts;
  public neededPunches = 0;
  public MachineIp = '42.42.42.42';
  public MachineStatus = 'OFF';
  public badgeColor = 'danger';
  constructor(
    public loadingController: LoadingController,
    private hotspot: Hotspot,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: Storage,
    public s: LivechartService,
    public alertController: AlertController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(async () => {
      this.getDemand ();
      this.gettotalpunches();
      this.getneededpunches();
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.connectToHotspot();
      this.s.dataprovider(this.MachineIp)
      .subscribe(val => this.setupMachineUp(), error => this.setMachineDown());
    });
  }
  connectToHotspot () {
    return this.hotspot.connectToWifi(this.ssid, this.password).then( () => {
      this.setupMachineUp();
 }).catch( () => {
  this.setMachineDown();
 });
  }
setupMachineUp () { this.MachineStatus = 'ON'; this.badgeColor = 'success';}
setMachineDown () { this.MachineStatus = 'OFF'; this.badgeColor = 'danger' }
  async gettotalpunches () {
    this.totalCounts = await this.storage.get('total');
    this.totalCounts = (this.totalCounts === null || this.totalCounts >= this.demand) ? 0 : this.totalCounts;
    console.log(this.totalCounts);
 return this.totalCounts;
  }
  async settotalpunches(val) {
   return this.storage.set('total', val)
  }
  async getDemand () {
    this.demand = await this.storage.get('demand');
      this.demand = (this.demand === null) ? 0 : this.demand; 
      console.log(this.demand);
    return this.demand;
  }
  onInputTime (evt) {
    this.storage.set('demand', evt);
  }
  async getneededpunches () {
    let demand = await this.getDemand();
    let total = await this.gettotalpunches();
    this.neededPunches = demand - total;

    if (this.neededPunches < 0) {
      this.presentAlert().then(() => {
        this.neededPunches = (this.neededPunches === null || this.neededPunches <= 0) ? 0 : this.neededPunches; 
        this.totalCounts = 0;
        console.log(this.neededPunches);
        return this.neededPunches;
      })
    }
   else {
    return this.neededPunches;
   }
  }
  async setneededpunches(val) {
   return this.storage.set('neededPunches', val)
  }
  ngOnChanges() {
  
  }

options: any = {

  scales: {

    xAxes: [{

      type: 'realtime',
realtime : {
onRefresh: (chart) => this.onRefresh(chart),
delay: 100,
refresh: 1000
}
    }]

  }

};
public scanNetworks () {
  this.hotspot.scanWifi().then((networks: HotspotNetwork[]) => {
    console.log(networks);
});
}
public lineChartData: Array<any> = [
  {data: [], label: 'number of punches'},
  ];
  public lineChartLabels: Array<any> = [];
  public lineChartOptions: any = {
  responsive: true
  };
  public lineChartColors: Array<any> = [
  { // grey
    backgroundColor: 'rgba(148,159,177,0.2)',
    borderColor: 'rgba(148,159,177,1)',
    pointBackgroundColorcd : 'rgba(148,159,177,1)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(148,159,177,0.8)'
  }
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';


data: any;
Message: any[];
public onRefresh (chart): any {

  const prov =  this.s.dataprovider(this.MachineIp);
  return prov
  .subscribe((res) => {
    this.updateCounts(chart, res.text())
    this.setupMachineUp()
  return this.getneededpunches();
} , (error) => {
  if (error) {
   // this.updateCounts(chart, Math.floor(Math.random()*200)+1);
  this.setMachineDown ();
   console.log(error);
 //   return this.getneededpunches();
  }
});
}
updateCounts (chart, livedata) {

    this.liveCounts = Number(livedata);
    console.log(this.liveCounts);
    this.totalCounts += this.liveCounts;

    const data = {
       y: this.liveCounts,
       x: Date.now()
      };

    chart
    .data
    .datasets
    .forEach(function(dataset: any) {
     dataset.data.push(data);
    });
    
}
async presentAlert() {
  const alert = await this.alertController.create({
    header: 'completed the batch as per demand',
    subHeader: '',
    message: 'press ok to reset',
    buttons: ['OK']
  });

  await alert.present();
}
}