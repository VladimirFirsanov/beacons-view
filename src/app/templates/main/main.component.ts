import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';

import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

import { DataService } from '../../share/services/data.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {

  public filterCtrl: FormControl;
  private _unsub: Subject<void>;

  constructor(
    public dataService: DataService
  ) {
    this.filterCtrl = new FormControl();
    this._unsub = new Subject();
  }

  public ngOnInit(): void {
    this.dataService.fetchMockData();
    this.filterCtrl.valueChanges
    .pipe(
      takeUntil(this._unsub),
      debounceTime(700),
      distinctUntilChanged()
    )
    .subscribe(() => this.dataService.filterData(this.filterCtrl.value));
  }

  public ngOnDestroy(): void {
    this._unsub.next();
    this._unsub.complete();
  }
}
