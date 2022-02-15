import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Order } from 'src/app/model/order';
import { OrderLine } from 'src/app/model/order-line';
import { OrderLineService } from 'src/app/service/order-line.service';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {

  orders$: Observable<Order[]> = this.orderService.getAll();
  orderColumns: string[] = [];
  orderListName: string = 'order';

  color: string[] = ['bg-success', 'btn-outline-success'];

  orderLines: Map<number, Observable<OrderLine[]>> = new Map<number, Observable<OrderLine[]>>();
  orderLineColumns: string[] = [];
  orderLineListName: string = 'orderline';

  constructor(
    private orderService: OrderService,
    private orderLineService: OrderLineService,
  ) {
    const tempOrder = new Order();
    this.orderColumns =  Object.getOwnPropertyNames(tempOrder);

    const tempOrderLine = new OrderLine();
    this.orderLineColumns =  Object.getOwnPropertyNames(tempOrderLine);
  }

  ngOnInit(): void {
  }

  onDeleteOne(order: Order): void {
    if (window.confirm('Biztosan törli ezt a megrendelést?')) {
      this.orderService.delete(order.id).subscribe(
        () => this.orders$ = this.orderService.getAll()
      )
    }
  }

  onOpenDetail(orderId: number): void {
    if (!this.orderLines.has(orderId)) {
      this.orderLines.set(orderId, this.orderLineService.getAllByOrderId(orderId));
    }
  }

  onDeleteDetail(orderLineId: number) {
    if (window.confirm('Biztosan törli ezt a megrendelés sort?')) {
      this.orderLineService.get(orderLineId).pipe(
        map((orderLine) => { 
          this.orderLineService.delete(orderLineId).subscribe(             
            () => {
              console.log(orderLine.orderID);
              this.orderLines.set(orderLine.orderID, this.orderLineService.getAllByOrderId(orderLine.orderID));
            }
          )
        }
      )).subscribe();
    }
  }

}
