import { Component, Input, ViewChild } from '@angular/core';

import { Beacon } from '../../share/models/beacon.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

const TABLE_COLUMNS = ['id', 'createdAt', 'moduleName', 'beaconId', 'x', 'y'];

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @Input() set data(data: Beacon[]) {
    if (data) {
      this.dataSource = new MatTableDataSource<Beacon>(data);
      this.dataSource.paginator = this.paginator;
    }
  }

  public dataSource: MatTableDataSource<Beacon>;
  public displayedColumns: string[];

  constructor() {
    this.displayedColumns = TABLE_COLUMNS;
  }
}
