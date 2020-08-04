import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { DataService } from '../../share/services/data.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  public filterCtrl: FormControl;

  constructor(
    public dataService: DataService
  ) {
    this.filterCtrl = new FormControl();
  }

  public ngOnInit(): void {
    this.dataService.fetchMockData();
    this.filterCtrl.valueChanges
    .pipe(
      debounceTime(700),
      distinctUntilChanged()
    )
    .subscribe(() => this.dataService.filterData(this.filterCtrl.value));
  }
}
