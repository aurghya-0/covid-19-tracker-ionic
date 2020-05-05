import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../services/api.service';
import axios from 'axios';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-detail-view',
  templateUrl: './detail-view.page.html',
  styleUrls: ['./detail-view.page.scss'],
})
export class DetailViewPage implements OnInit {
  countries: string[] = []
  @ViewChild('lineChart', { static: false }) lineChart;
  @ViewChild('barChart', { static: false }) barChart;
  country: string = "";

  lines: any;
  bars: any;

  infected: number = 0;
  recovered: number = 0;
  deaths: number = 0;

  showList: boolean = false;

  constructor(private readonly api: ApiService) {

  }

  ngOnInit() {
    this.api.fetchCountries().then((countries) => {
      this.countries = countries;
    });
    this.createLineChart();
  }

  selectClicked = (country) => {
    this.country = country;
    this.createBarChart(country);
  }

  async createLineChart() {
    const modifiedData = await this.api.fetchDailyData();
    this.lines = new Chart(this.lineChart.nativeElement, {
      type: 'line',
      data: {
        labels: modifiedData.map(({ date }) => date),
        datasets: [{
          data: modifiedData.map(({ confirmed }) => confirmed),
          label: "Infected",
          backgroundColor: 'rgba(0, 0, 255, 0.5)',
          borderColor: '#3333ff',
          fill: true,
        }, {
          data: modifiedData.map(({ deaths }) => deaths),
          label: "Deaths",
          borderColor: 'red',
          backgroundColor: 'rgba(255, 0, 0, 0.5)',
          fill: true,
        }]
      },
    })
  }

  async createBarChart(country: string) {
    const { confirmed, recovered, deaths } = await this.api.fetchData(country);
    this.bars = new Chart(this.barChart.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Infected', 'Recovered', 'Deaths'],
        datasets: [{
          label: 'People',
          backgroundColor: [
            '#3880ff',
            '#2dd36f',
            '#eb445a',
          ],
          data: [confirmed.value, recovered.value, deaths.value]
        }]
      },
    })
  }
}
