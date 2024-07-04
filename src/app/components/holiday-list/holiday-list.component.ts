import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {MatList, MatListItem} from "@angular/material/list";
import {NgForOf, NgIf} from "@angular/common";

import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';

export interface Holiday {
  id: string;
  name: any;
  startDate: string;
  endDate: string;
}

@Component({
  selector: 'app-holiday-list',
  templateUrl: './holiday-list.component.html',
  styleUrl: './holiday-list.component.css',
  standalone: true,
  imports: [MatList, MatListItem, NgIf, NgForOf, MatTableModule, MatPaginatorModule]
})
export class HolidayListComponent implements AfterViewInit, OnChanges {
  @Input() holidays: Array<any> = [];

  displayedColumns: string[] = ['name', 'startDate'];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator: MatPaginator;

    ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
    }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['holidays']) {
      this.dataSource.data = this.holidays; // Update the dataSource with new data
    }
  }
}


