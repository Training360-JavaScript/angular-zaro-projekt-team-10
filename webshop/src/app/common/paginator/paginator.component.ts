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

  createRange(): number[] {
    const rangeArray: number[] = [];
    let min: number = (this.curPage ?? 1) - 5;
    min = Math.max(min, 1);
    let max = min + 10;
    max = Math.min(max, this.totalPages);
    if (max === this.totalPages) {
      min = Math.max(max - 10, 1);
    }
    for (let i = min; i <= max; i++) {
      rangeArray.push(i);
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
