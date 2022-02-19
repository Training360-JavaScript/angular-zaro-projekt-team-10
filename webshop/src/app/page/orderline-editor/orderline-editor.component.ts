import { Component, OnInit } from '@angular/core';
import { OrderLine } from 'src/app/model/order-line';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderLineService } from 'src/app/service/order-line.service';
import { switchMap } from 'rxjs';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-orderline-editor',
  templateUrl: './orderline-editor.component.html',
  styleUrls: ['./orderline-editor.component.scss']
})
export class OrderlineEditorComponent implements OnInit {

  orderline$: Observable<OrderLine> = this.activatedRoute.params.pipe(
    switchMap( params => this.orderLineService.get(params['id']))
  )

  products$: Observable<Product[]> = this.productService.getAll();

  constructor(
    private activatedRoute: ActivatedRoute,
    private orderLineService: OrderLineService,
    private productService: ProductService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  onUpdate(product: OrderLine): void {
    this.orderLineService.update(product).subscribe(
      orderLine => this.router.navigate(['/', 'orders'])
    )
  }

}
