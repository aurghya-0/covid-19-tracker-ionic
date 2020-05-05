import { Component, OnInit, ViewChild } from '@angular/core';
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

  constructor() {
    axios.get('https://covid19.mathdro.id/api/countries').then((data) => {
      this.countries = data.data.countries.map((country, index) => { return country.name });
    });
  }

  ngOnInit() {
    this.createLineChart();
  }

  selectClicked = (country) => {
    this.country = country;
    this.createBarChart(country);
  }

  async createLineChart() {
    try {
      const { data } = await axios.get('https://covid19.mathdro.id/api/daily');
      const modifiedData = data.map((dailyData) => ({
        confirmed: dailyData.confirmed.total,
        deaths: dailyData.deaths.total,
        date: dailyData.reportDate,
      }));
      console.log(modifiedData);

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
        }
      })
    } catch (error) {

    }
  }

  async createBarChart(country: string) {
    try {
      const { data } = await axios.get(`https://covid19.mathdro.id/api/countries/${country}`);
      this.bars = new Chart(this.barChart.nativeElement, {
        type: 'bar',
        data: {
          labels: ['Infected', 'Recovered', 'Deaths'],
          datasets: [{
            label: 'People',
            backgroundColor: [
              'rgba(0,0,255,0.5)',
              'rgba(0,255,0,0.5)',
              'rgba(255,0,0,0.5)',
            ],
            data: [data.confirmed.value, data.recovered.value, data.deaths.value]
          }]
        }
      })
    } catch (error) {
    }
  }

}
