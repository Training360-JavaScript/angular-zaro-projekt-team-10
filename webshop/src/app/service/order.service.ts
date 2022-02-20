import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Order, OrderDisplay } from '../model/order';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService extends BaseService<Order> {
  constructor(private http: HttpClient) {
    super(http, 'order');
  }

  filtered(status: 'new' | 'shipped' | 'paid'): Observable<Order[]> {
    return this.getAll().pipe(map((orders) =>       
      orders.filter(order => order.status === status)
    ));
  }

}