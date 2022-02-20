import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, Observable } from 'rxjs';
import { Order, OrderDisplay } from '../model/order';
import { BaseService } from './base.service';
import { CustomerService } from './customer.service';
import { OrderLineService } from './order-line.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService extends BaseService<Order> {
  constructor(
    private http: HttpClient,
    private orderLineService: OrderLineService,
    private customerService: CustomerService,
  ) {
    super(http, 'order');
  }

  getAllDisplay(): Observable<OrderDisplay[]> {
    const join$ = forkJoin({
      orders: this.getAll(),
      orderLines: this.orderLineService.getAll(),
      customers: this.customerService.getAll()
    });

    return join$.pipe(
      map((result) => {
        return result.orders.map((order) => {
          const customer = result.customers.find((cust) => cust.id === order.customerID);
          const lines = result.orderLines.filter((line) => line.orderID === order.id);

          return new OrderDisplay(
            order.id,
            `${customer?.firstName} ${customer?.lastName}`,
            order.status,
            lines.length
          );
        })
      })
    );
  }

  filtered(status: 'new' | 'shipped' | 'paid'): Observable<Order[]> {
    return this.getAll().pipe(map((orders) =>       
      orders.filter(order => order.status === status)
    ));
  }

  getFilteredDisplay(status: 'new' | 'shipped' | 'paid'): Observable<OrderDisplay[]> {
    return this.getAllDisplay().pipe(map((orders) =>       
      orders.filter(order => order.status === status)
    ));
  }

}