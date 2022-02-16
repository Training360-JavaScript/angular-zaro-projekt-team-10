import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, Observable, of } from 'rxjs';
import { Address } from '../model/address';

import { Customer, CustomerWithAddress } from '../model/customer';
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

  actives(): Observable<Customer[]> {
    return this.getAll().pipe(
      map((customers) => customers.filter((customer) => customer.active))
    );
  }

  addAddress(): Observable<CustomerWithAddress[]> {
    const observable = forkJoin([
      this.getAll(),
      this.addressService.getAll()
    ]);
    return observable.pipe(
      map((result) => {
        const cwa: CustomerWithAddress[] = []
        result[0].map((customer,index) => {
          const address: Address | undefined = result[1].find(
            (addr) => addr.id === customer.addressID
            );
            cwa.push(
              {
                id: customer.id,
                firstName: customer.firstName,
                lastName: customer.lastName,
                email: customer.email,
                address: `${address?.zip}, ${address?.country}, ${address?.city}, ${address?.street}, ${address?.notes}`,
                active: customer.active,
              }
            )
        });
        return cwa
      })
    );
  }
}
