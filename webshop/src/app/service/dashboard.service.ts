import { Injectable } from '@angular/core';
import { forkJoin, map, Observable } from 'rxjs';
import { ActiveCustomers, ActiveProducts, NewOrders, NotPayedBills, ShippedOrders } from '../model/dashboard';
import { OrderDisplay } from '../model/order';
import { BillService } from './bill.service';
import { CustomerService } from './customer.service';
import { OrderLineService } from './order-line.service';
import { OrderService } from './order.service';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
    private customerService: CustomerService,
    private productService: ProductService,
    private billService: BillService,
    private orderService: OrderService,
    private orderlineService: OrderLineService
  ) { }

  activeCustomers(): Observable<ActiveCustomers> {
    return this.customerService.actives().pipe(map((customers) => 
      new ActiveCustomers(customers.length, customers.sort(() => Math.random() - Math.random()).slice(0,5))
    ))
  }

  activeProducts(): Observable<ActiveProducts> {
    return this.productService.getActivesDisplay().pipe(map((products) => 
      new ActiveProducts(products.length, products.sort(() => Math.random() - Math.random()).slice(0,5))
    ))
  }

  newOrders(): Observable<NewOrders> {
    const observable = forkJoin([
      this.orderService.filtered("new"),
      this.orderlineService.getAll(),
      this.customerService.getAll(),
    ]);

    return observable.pipe(map((result) => 
      new NewOrders(
        result[0].length,
        result[0].slice(0,5).map((order) => {
          const customer = result[2].find((cust) => cust.id === order.customerID);
          const orderLines = result[1].filter((line) => line.orderID === order.id);
          return new OrderDisplay(
            order.id,
            `${customer?.firstName} ${customer?.lastName}`,
            order.status,
            orderLines?.length
          );
        })  
      )
    ));
  }

  shippedOrders(): Observable<ShippedOrders> {
    const observable = forkJoin([
      this.orderService.filtered("shipped"),
      this.orderlineService.getAll(),
      this.customerService.getAll(),
    ]);

    return observable.pipe(map((result) => 
      new ShippedOrders(
        result[0].length,
        result[0].slice(0,5).map((order) => {
          const customer = result[2].find((cust) => cust.id === order.customerID);
          const orderLines = result[1].filter((line) => line.orderID === order.id);
          return new OrderDisplay(
            order.id,
            `${customer?.firstName} ${customer?.lastName}`,
            order.status,
            orderLines?.length
          );
        })  
      )
    ));
  }

  notPayedBills() : Observable<NotPayedBills> {
    return this.billService.filtered('new').pipe(map((bills) => 
      new NotPayedBills(
        bills.length, 
        bills.reduce((prev, curr) => prev + curr.amount, 0), 
        bills.sort(() => Math.random() - Math.random()).slice(0,5))
    ))

  }

}
