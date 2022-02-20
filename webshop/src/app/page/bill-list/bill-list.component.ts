import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { Bill } from 'src/app/model/bill';
import { BillService } from 'src/app/service/bill.service';

@Component({
  selector: 'app-bill-list',
  templateUrl: './bill-list.component.html',
  styleUrls: ['./bill-list.component.scss']
})
export class BillListComponent implements OnInit {


  bills$: Observable<Bill[]> = this.activatedRoute.queryParams.pipe(
    switchMap((params) => {
      console.log(params);
      if(params['status']) {
        return this.billService.filtered(params['status']);
      } else {
        return this.billService.getAll();
      }
    }) 
  )
  columns: string[] = [];
  listName: string = 'bill';
  color: string[] = ['bg-success', 'btn-outline-success'];

  constructor(
    private billService: BillService,
    private activatedRoute: ActivatedRoute,
  ) {
    const temp = new Bill();
    this.columns =  Object.getOwnPropertyNames(temp);

  }

  ngOnInit(): void {
  }

  onDeleteOne(bill: Bill): void {
    if (window.confirm('Biztosan törli ezt a számlát?')) {
      this.billService.delete(bill.id).subscribe(
        () => this.bills$ = this.billService.getAll()
      )
    }
  }

}
