import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import * as moment from 'moment';

import { Beacon } from '../models/beacon.model';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public data: Beacon[];
  public filteredData: Beacon[];
  private _url: string;

  constructor(
    private _httpClient: HttpClient,
    private _notificationService: NotificationService
  ) {
    this._url = 'https://5f2293720e9f660016d8846a.mockapi.io/api/v1/beacons';
    this.data = [];
    this.filteredData = [];
  }

  public fetchMockData(): void {
    this._httpClient.get<Beacon[]>(this._url).subscribe(data => {
      const resultArray = [];
      data.forEach(element => {
        resultArray.push(this._convertDate(element));
      });
      this.data = resultArray;
      this.filteredData = resultArray;
    },
    error => {
      this._notificationService.showError('Error: data unavailable');
    });
  }

  public filterData(query: string): void {
    this.filteredData = this.data.filter(element => {
      const properties = Object.values(element);
      for (const prop of properties) {
        if (prop.toString().includes(query)) {
          return true;
        }
      }
      return false;
    });
  }

  private _convertDate(beaconItem: Beacon): Beacon {
    const date = moment(new Date(beaconItem.createdAt)).format('HH:mm:ss DD.MM.YYYY');
    return {...beaconItem, createdAt: date};
  }
}
