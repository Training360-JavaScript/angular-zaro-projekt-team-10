import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {

  // @Input() barChartLabels: Label[] = ['új', 'kiszállított', 'kifizetett'];
  // @Input() barChartData: ChartDataSets[] = [
  //   {
  //     data: [0, 0, 0],
  //     label: 'Megrendelések',
  //   },
  // ];
  // @Input() barChartColor: Color[] = [];

  // public barChartOptions: ChartOptions = {

  //   responsive: true,
  //   scales: {
  //     xAxes: [{
  //       gridLines: {
  //         color: 'rgba(230,230,230,1)',
  //         lineWidth: 1
  //       },
  //       ticks: {
  //         fontColor: 'rgba(255,255,255,1)'
  //       }
  //     }],
  //     yAxes: [{
  //       gridLines: {
  //         color: 'rgba(230,230,230,1)',
  //         lineWidth: 1
  //       },
  //       ticks: {
  //         fontColor: 'rgba(230,230,230,1)',
  //         min: 0,
  //       }
  //     }]
  //   },
  // };

  // public barChartType: ChartType = 'bar';
  // public barChartLegend = true;
  // public barChartPlugins = [];

  constructor() { }

  ngOnInit(): void {
  }

}
