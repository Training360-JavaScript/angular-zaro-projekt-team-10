import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, switchMap } from 'rxjs';
import { Order, OrderDisplay } from 'src/app/model/order';
import { OrderLine, OrderLineDisplay } from 'src/app/model/order-line';
import { OrderLineService } from 'src/app/service/order-line.service';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {
  orders$: Observable<OrderDisplay[]> = new Observable<OrderDisplay[]>();
  orderColumns: string[] = [];
  orderListName: string = 'order';

  color: string[] = ['bg-success', 'btn-outline-success'];

  orderLines: Map<number, Observable<OrderLineDisplay[]>> = new Map<number, Observable<OrderLineDisplay[]>>();
  orderLineColumns: string[] = [];
  orderLineListName: string = 'orderline';

  constructor(
    private orderService: OrderService,
    private orderLineService: OrderLineService,
    private activatedRoute: ActivatedRoute,
  ) {
    const tempOrder = new OrderDisplay();
    this.orderColumns =  Object.getOwnPropertyNames(tempOrder);

    const tempOrderLine = new OrderLineDisplay();
    this.orderLineColumns =  Object.getOwnPropertyNames(tempOrderLine);
    console.log(this.orderLineColumns);
    this.orderLineColumns.splice(this.orderLineColumns.findIndex(col => col === 'orderID'), 1);
    this.orderLineColumns.splice(this.orderLineColumns.findIndex(col => col === 'productID'), 1);
    
    console.log(this.orderLineColumns);

    this.getItems();
  }

  ngOnInit(): void {
  }

  getItems(): void {
    this.orders$ = this.activatedRoute.queryParams.pipe(
      switchMap((params) => {
        console.log(params);
        if(params['status']) {
          return this.orderService.getFilteredDisplay(params['status']);
        } else {
          return this.orderService.getAllDisplay();
        }
      })
    )
  }

  onDeleteOne(order: Order): void {
    if (window.confirm('Biztosan törli ezt a megrendelést?')) {
      this.orderService.delete(order.id).subscribe(
        () => this.getItems()
      )
    }
  }

  onOpenDetail(orderId: number): void {
    if (!this.orderLines.has(orderId)) {
      this.orderLines.set(orderId, this.orderLineService.getAllDisplayByOrderId(orderId));
    }
  }

  onDeleteDetail(orderLineId: number) {
    if (window.confirm('Biztosan törli ezt a megrendelés sort?')) {
      this.orderLineService.get(orderLineId).pipe(
        map((orderLine) => { 
          this.orderLineService.delete(orderLineId).subscribe(             
            () => {
              console.log(orderLine.orderID);
              this.orderLines.set(orderLine.orderID, this.orderLineService.getAllDisplayByOrderId(orderLine.orderID));
            }
          )
        }
      )).subscribe();
    }
  }

}
