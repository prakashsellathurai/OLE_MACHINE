import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { IonicStorageModule } from '@ionic/storage';
import { ChartsModule } from 'ng2-charts';
import {LivechartService} from './livechart.service';
import {Http, HttpModule} from '@angular/http';
import { Observable, Subscriber } from 'rxjs';
@NgModule({
  declarations: [
    AppComponent
  ],
  entryComponents: [],
  imports: [
      HttpModule,
      BrowserModule,
      IonicModule.forRoot(),
      AppRoutingModule,
      FormsModule,
      IonicStorageModule.forRoot(),
      ChartsModule,
    ],
  providers: [
    StatusBar,
    SplashScreen,
    LivechartService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
