import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { Customer, CustomerDisplay } from 'src/app/model/customer';
import { CustomerService } from 'src/app/service/customer.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {

  customers$: Observable<CustomerDisplay[]> = new Observable<CustomerDisplay[]>();
  columns: string[] = [];
  listName: string = 'customer';
  color: string[] = ['bg-success', 'btn-outline-success'];
  constructor(
    private customerService: CustomerService,
    private activatedRoute: ActivatedRoute,
  ) {
    const temp = new CustomerDisplay();
    this.columns =  Object.getOwnPropertyNames(temp);
    this.columns.splice(this.columns.findIndex(col => col === 'addressID'), 1);

    this.getItems();
  }

  ngOnInit(): void {
  }

  getItems(): void {
    this.customers$ = this.activatedRoute.queryParams.pipe(
      switchMap((params) => {
        if(params['actives']) {
          return this.customerService.getActivesDisplay();
        } else {
          return this.customerService.getAllDisplay();
        }
      }) 
    );
  }

  onDeleteOne(customer: Customer): void {
    if (window.confirm('Biztosan törli ezt a terméket?')) {
      this.customerService.delete(customer.id).subscribe(
        () => this.getItems()
      )
    }
  }

}
