import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Bill } from 'src/app/model/bill';
import { BillService } from 'src/app/service/bill.service';

@Component({
  selector: 'app-bill-list',
  templateUrl: './bill-list.component.html',
  styleUrls: ['./bill-list.component.scss']
})
export class BillListComponent implements OnInit {


  bills$: Observable<Bill[]> = this.billService.getAll();
  columns: string[] = [];
  listName: string = 'bill';
  color: string[] = ['bg-success', 'btn-outline-success'];

  constructor(
    private billService: BillService,
  ) {
    const temp = new Bill();
    this.columns =  Object.getOwnPropertyNames(temp);

  }

  ngOnInit(): void {
  }

  onDeleteOne(bill: Bill): void {
    if (window.confirm('Biztosan törli ezt a terméket?')) {
      this.billService.delete(bill.id).subscribe(
        () => this.bills$ = this.billService.getAll()
      )
    }
  }

}
