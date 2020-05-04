import { Component } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  fetchedData: any = {};
  constructor() {
    axios.get('https://covid19.mathdro.id/api').then((data) => {
      this.fetchedData = data.data;
    })
  }

}
