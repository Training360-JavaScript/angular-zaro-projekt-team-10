import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
})
export class PaginatorComponent implements OnInit {
  @Input('totalRecords') totalRecords: any[] = [];
  @Input('perPage') perPage: number = 10;
  @Input('curPage') curPage: number | null = 1;
  @Input('baseUrl') baseUrl: string = '';
  prev: number | null = null;
  next: number | null = null;
  totalPages: number = 0;
  numOfAllRecords: number = 0;

  @Input('totalRecords') set totalRecordsChanged(records: any[]) {
    this.totalRecords = records;
    this.numOfAllRecords = records ? records.length : 0;
    this.totalPages = Math.ceil(this.numOfAllRecords / this.perPage);
    this.setPaginator();
  }

  @Input('curPage') set curPageChanged(page: number | null) {
    if (!page) return;

    if (page > this.totalPages) {
      this.curPage = 1;
    } else {
      this.curPage = page;
    }

    this.setPaginator();
  }

  constructor() {}

  ngOnInit(): void {}

  createRange(number: number = 0): number[] {
    const rangeArray = [];
    for (let i = 0; i < number; i++) {
      rangeArray.push(i + 1);
    }
    return rangeArray;
  }

  setPaginator() {
    if (this.curPage && this.totalRecords?.length && this.curPage > 1) {
      this.prev = this.curPage - 1;
    } else {
      this.prev = null;
    }

    if (
      this.curPage &&
      this.totalRecords?.length &&
      this.curPage < this.totalPages
    ) {
      this.next = this.curPage + 1;
    } else {
      this.next = null;
    }
  }
}
