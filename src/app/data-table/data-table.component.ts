import { Component, OnInit, OnChanges, Input, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table'
import { MatPaginator } from '@angular/material/paginator';
import { User } from '../api-interface';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit, OnChanges {
  @Input() users: User[];

  displayedColumns: string[] = ['sn', 'name', 'companyname', 'username', 'city', 'pincode'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor() { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnChanges() {
    if(this.users) {
      this.dataSource.data = this.users;
    }
  }

}
