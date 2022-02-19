import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, Observable } from 'rxjs';

import { OrderLine, OrderLineDisplay } from '../model/order-line';
import { BaseService } from './base.service';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root',
})
export class OrderLineService extends BaseService<OrderLine> {
  constructor(
    private http: HttpClient,
    private productService: ProductService
  ) {
    super(http, 'order-line');
  }

  getAllByOrderId(orderId: number): Observable<OrderLine[]> {
    return this.getAll().pipe(
      map((lines) => lines.filter((line) => line.orderID === orderId))
    )
  }

  getAllDisplayByOrderId(orderId: number): Observable<OrderLineDisplay[]> {
    const join$ = forkJoin({
      lines: this.getAllByOrderId(orderId),
      products: this.productService.getAll()
    });

    return join$.pipe(
      map((result) => {
        return result.lines.map((line) => {
          const product = result.products.find((product) => product.id === line.productID);

          return new OrderLineDisplay(
            line.id,
            line.orderID,
            line.productID,
            product?.name,
            line.amount,
            product?.price,
            line.amount * (product?.price ?? 0)
          );
        })
      })
    );

  }
}
