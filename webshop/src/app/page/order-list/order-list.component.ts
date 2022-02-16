import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from 'src/app/model/order';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {

  orders$: Observable<Order[]> = this.orderService.getAll();
  columns: string[] = [];
  listName: string = 'order';
  color: string[] = ['bg-success', 'btn-outline-success'];

  constructor(
    private orderService: OrderService,
  ) {
    const temp = new Order();
    this.columns =  Object.getOwnPropertyNames(temp);

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

}
