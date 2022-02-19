import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { Customer } from '../model/customer';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class CustomerService extends BaseService<Customer> {
  constructor(private http: HttpClient) {
    super(http, 'customer');
  }

  actives(): Observable<Customer[]> {
    return this.getAll().pipe(map((customers) => 
      customers.filter(customer => customer.active)
    ));
  }

}
