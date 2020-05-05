import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  fetchedData: any = {};
  date: string;
  constructor(private readonly api: ApiService) {
    api.fetchData().then((data) => {
      this.fetchedData = data;
      this.date = new Date(data.lastUpdate).toDateString();
    });
  }
}
