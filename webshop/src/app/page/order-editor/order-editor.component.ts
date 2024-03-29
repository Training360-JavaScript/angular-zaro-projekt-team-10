import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/model/order';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from 'src/app/service/order.service';
import { Customer } from 'src/app/model/customer';
import { CustomerService } from 'src/app/service/customer.service';

@Component({
  selector: 'app-order-editor',
  templateUrl: './order-editor.component.html',
  styleUrls: ['./order-editor.component.scss']
})
export class OrderEditorComponent implements OnInit {

  order$: Observable<Order> = this.activatedRoute.params.pipe(
    switchMap( params => this.OrderService.get(params['id']))
  )

  customers$: Observable<Customer[]> = this.CustomerService.getAll();

  constructor(
    private activatedRoute: ActivatedRoute,
    private OrderService: OrderService,
    private CustomerService: CustomerService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  onUpdate(order: Order): void {
    this.OrderService.update(order).subscribe(
      order => this.router.navigate(['/', 'orders'])
    )
  }

}
