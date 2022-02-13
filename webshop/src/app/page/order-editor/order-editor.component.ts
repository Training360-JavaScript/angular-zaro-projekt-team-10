import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/model/order';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-order-editor',
  templateUrl: './order-editor.component.html',
  styleUrls: ['./order-editor.component.scss']
})
export class OrderEditorComponent implements OnInit {

  order$: Observable<Order> = this.activatedRoute.params.pipe(
    switchMap( params => this.OrderService.get(params['id']))
  )

  constructor(
    private activatedRoute: ActivatedRoute,
    private OrderService: OrderService,
  ) { }

  ngOnInit(): void {
  }

}
