import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from 'src/app/model/customer';
import { CustomerService } from 'src/app/service/customer.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {

  customers$: Observable<Customer[]> = this.customerService.getAll();
  columns: string[] = [];
  listName: string = 'customer';
  color: string[] = ['bg-success', 'btn-outline-success'];
  constructor(
    private customerService: CustomerService,
  ) {
    const temp = new Customer();
    this.columns =  Object.getOwnPropertyNames(temp);

  }

  ngOnInit(): void {
  }

  onDeleteOne(customer: Customer): void {
    if (window.confirm('Biztosan törli ezt a terméket?')) {
      this.customerService.delete(customer.id).subscribe(
        () => this.customers$ = this.customerService.getAll()
      )
    }
  }

}
