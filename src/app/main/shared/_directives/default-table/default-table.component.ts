import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { TableLoaderService } from 'src/app/app-support/services/general/table-loader.service';


@Component({
  selector: 'app-default-table',
  templateUrl: './default-table.component.html',
  styleUrls: ['default-table.component.css']
})

export class DefaultTableComponent implements OnInit {
  @Input() title: string;
  @Input() tableData: any;
  @Input() calculateTotal: boolean;

  @Output() refreshTable: EventEmitter<any> = new EventEmitter();

  total: any[] = [];

  constructor(public loaderService: TableLoaderService) {}

  ngOnInit(): void {
    console.log(this.tableData);
    if (this.calculateTotal) {
      this.calculateTotalData();
    }
  }

  calculateTotalData(): void {
    const total: any[] = [];
    this.tableData.headerRow.map((item) => {
      total.push(0);
    });
    this.tableData.bodyRows.map((row) => {
      row.map((cell, index) => {
        total[index] += parseFloat(cell);
      });
    });
    total[0] = 'Total';
    this.total = total;
  }

  checkToSend(ev): void {
    if (ev.keyCode === 13) {
      this.getTableData();
    }
  }

  getTableData(initialize = false): void {
    this.refreshTable.emit(initialize);
  }
}
