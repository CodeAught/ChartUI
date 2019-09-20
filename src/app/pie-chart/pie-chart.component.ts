import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {
  @Input() geoLocation: number[];
  @ViewChild('chart', {static: true}) chart: ElementRef;
  pieChart: any;

  constructor() { }

  ngOnInit() {
    this.createPieChart();
  }

  ngOnChanges() {
    if(this.geoLocation) {
      this.createPieChart();
    }
  }

  createPieChart() {
    this.pieChart = new Chart(this.chart.nativeElement, {
      type: 'pie',
      data: {
          labels: ['Latitude > 0', 'Latitude < 0', 'Longitude > 0', 'Longitude < 0'],
          datasets: [{

              label: '# of Votes',
              data: this.geoLocation ? Object.values(this.geoLocation) : [0, 0, 0, 0],
              backgroundColor: [
                  'rgba(255, 50, 50, 0.8)',
                  'rgba(54, 162, 235, 0.8)',
                  'rgba(255, 206, 86, 0.8)',
                  'rgba(75, 192, 192, 0.8)'
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
              ],
              borderWidth: 1
          }]
      }
    });
  }

  beforePrintHandler () {
    for (var id in Chart.instances) {
        Chart.instances[id].resize();
    }
  }
}
