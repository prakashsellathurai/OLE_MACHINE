import { Component, OnInit, ChangeDetectionStrategy , ElementRef, Input, OnChanges, ViewChild} from '@angular/core';
import {Chart } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import {LivechartService}from './livechart.service';
import 'chartjs-plugin-streaming';
import {Http} from '@angular/http';
@Component({
  selector: 'app-livechart',
  templateUrl: './livechart.page.html',
  styleUrls: ['./livechart.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LivechartPage implements  OnChanges, OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective;
  chartElement: ElementRef;

  private svgElement: HTMLElement;
  private chartProps: any;

  options: any = {

    scales: {

      xAxes: [{

        type: 'realtime',
realtime : {
	onRefresh: (chart) => this.onRefresh(chart),
	delay: 1000,
	refresh: 1000
}
      }]

    }

	};
	public onRefresh (chart):any {
		let prov =  this.s.dataprovider();
		return prov
		.subscribe((res) => {
			let data = { y: res.json().value,
			x: Date.now()};
		
		  chart.data.datasets.forEach(function(dataset: any) {

				dataset.data.push(data);
		});
	});
	};
	public lineChartData:Array<any> = [
		{data: [], label: 'number of punches'},
		];
		public lineChartLabels:Array<any> = [];
		public lineChartOptions:any = {
		responsive: true
		};
		public lineChartColors:Array<any> = [
		{ // grey
			backgroundColor: 'rgba(148,159,177,0.2)',
			borderColor: 'rgba(148,159,177,1)',
			pointBackgroundColor: 'rgba(148,159,177,1)',
			pointBorderColor: '#fff',
			pointHoverBackgroundColor: '#fff',
			pointHoverBorderColor: 'rgba(148,159,177,0.8)'
		}
		];
		public lineChartLegend:boolean = true;
		public lineChartType:string = 'line';
		
		
  data: any;
  Message: any[];

  constructor(
		public s: LivechartService,) {
    // setInterval(() => this.renderChart(), 10000);
	}
	ngOnInit() { }
  ngOnChanges() { }

   renderChart() {
console.log('rendering chart');
let _lineChartData = []
let _lineChartLabels = []
this.s.dataprovider().subscribe((res) => {
console.log(res.json().value);
_lineChartData.forEach(dataset => dataset.data.push(res.json().value));
_lineChartLabels.push(Date.now())
this.lineChartData= _lineChartData
this.lineChartLabels = _lineChartLabels
})
}

  public randomize():void {
	let _lineChartData:Array<any> = new Array(this.lineChartData.length);
	for (let i = 0; i < this.lineChartData.length; i++) {
	  _lineChartData[i] = {data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label};
	  for (let j = 0; j < this.lineChartData[i].data.length; j++) {
		_lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
	  }
	}
	this.lineChartData = _lineChartData;
  }
  
  // events
  public chartClicked(e:any):void {
	console.log(e);
  }
  
  public chartHovered(e:any):void {
	console.log(e);
  }

}

