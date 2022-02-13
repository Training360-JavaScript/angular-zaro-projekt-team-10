import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Address } from '../model/address';

import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class AddressService extends BaseService<Address> {
  constructor(private http: HttpClient) {
    super(http, 'address');
  }
}
