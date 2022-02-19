import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer, CustomerWithAddress } from 'src/app/model/customer';
import { CustomerService } from 'src/app/service/customer.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {

  customers$: Observable<CustomerWithAddress[]> = this.customerService.addAddress();
  columns: string[] = [];
  listName: string = 'customer';
  color: string[] = ['bg-success', 'btn-outline-success'];
  constructor(
    private customerService: CustomerService,
  ) {
    const temp = new CustomerWithAddress();
    this.columns =  Object.getOwnPropertyNames(temp);
  }

  ngOnInit(): void {
  }

  onDeleteOne(customer: CustomerWithAddress): void {
    if (window.confirm('Biztosan törli ezt a vásárlót?')) {
      this.customerService.delete(customer.id).subscribe(
        () => this.customers$ = this.customerService.addAddress()
      )
    }
  }

}
