import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { OrderLine } from '../model/order-line';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class OrderLineService extends BaseService<OrderLine> {
  constructor(private http: HttpClient) {
    super(http, 'orderline');
  }

  getAllByOrderId(orderId: number): Observable<OrderLine[]> {
    return this.getAll().pipe(
      map((lines) => lines.filter((line) => line.orderID === orderId))
    )
  }
}
