import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { Customer } from 'src/app/model/customer';
import { CustomerService } from 'src/app/service/customer.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {

  customers$: Observable<Customer[]> = this.activatedRoute.queryParams.pipe(
    switchMap((params) => {
      if(params['actives']) {
        return this.customerService.actives();
      } else {
        return this.customerService.getAll();
      }
    }) 
  );
  columns: string[] = [];
  listName: string = 'customer';
  color: string[] = ['bg-success', 'btn-outline-success'];
  constructor(
    private customerService: CustomerService,
    private activatedRoute: ActivatedRoute,
  ) {
    const temp = new Customer();
    this.columns =  Object.getOwnPropertyNames(temp);
  }

  ngOnInit(): void {
  }

  onDeleteOne(customer: Customer): void {
    if (window.confirm('Biztosan törli ezt a vásárlót?')) {
      this.customerService.delete(customer.id).subscribe(
        () => this.customers$ = this.customerService.getAll()
      )
    }
  }

}
