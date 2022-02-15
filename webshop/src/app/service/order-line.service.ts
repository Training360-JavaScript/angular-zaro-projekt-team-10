import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { OrderLine } from '../model/order-line';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class OrderLineService extends BaseService<OrderLine> {
  constructor(private http: HttpClient) {
    super(http, 'orderline');
  }
}
