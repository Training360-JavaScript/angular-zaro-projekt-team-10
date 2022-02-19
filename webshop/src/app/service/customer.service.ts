import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, Observable } from 'rxjs';

import { Customer, CustomerDisplay } from '../model/customer';
import { AddressService } from './address.service';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class CustomerService extends BaseService<Customer> {
  constructor(
    private http: HttpClient,
    private addressService: AddressService
  ) {
    super(http, 'customer');
  }

  getAllDisplay(): Observable<CustomerDisplay[]> {
    const join$ = forkJoin({
      customers: this.getAll(),
      addresses: this.addressService.getAll()
    });

    return join$.pipe(
      map((result) => {
        return result.customers.map((customer) => {
          const address = result.addresses.find((address) => address.id === customer.addressID);
          return new CustomerDisplay(
            customer.id,
            customer.firstName,
            customer.lastName, 
            customer.email,
            customer.addressID,
            this.addressService.addressToString(address),
            customer.active            
          );
        })
      })
    );

  }

  getActivesDisplay(): Observable<CustomerDisplay[]> {
    return this.getAllDisplay().pipe(map((customers) => 
      customers.filter(customer => customer.active)
    ));
  }

  actives(): Observable<Customer[]> {
    return this.getAll().pipe(map((customers) => 
      customers.filter(customer => customer.active)
    ));
  }



}
