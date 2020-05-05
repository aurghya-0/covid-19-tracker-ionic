import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url: string = "https://covid19.mathdro.id/api";

  constructor() { }

  async fetchData(country?: string) {
    let changeableUrl = this.url;
    if (country) {
      changeableUrl = `${this.url}/countries/${country}`;
    }
    try {
      const { data: { confirmed, recovered, deaths, lastUpdate } } = await axios.get(changeableUrl);
      return { confirmed, recovered, deaths, lastUpdate };
    } catch (error) {
      console.log(error);
    }
  }

  async fetchDailyData() {
    try {
      const { data } = await axios.get(`${this.url}/daily`);
      const modifiedData = data.map((dailyData) => ({
        confirmed: dailyData.confirmed.total,
        deaths: dailyData.deaths.total,
        date: dailyData.reportDate,
      }));
      return modifiedData;
    } catch (error) {
      console.log(error);
    }
  }

  async fetchCountries() {
    try {
      const { data: { countries } } = await axios.get(`${this.url}/countries`);
      return countries.map((country) => country.name);
    } catch (error) {
      console.log(error);
    }
  }
}
