import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppComponent} from './app.component';
const routes: Routes = [
  { path: '', component: AppComponent  },
  { path: 'livechart', loadChildren: './pages/livechart/livechart.module#LivechartPageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
