import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-editor',
  templateUrl: './product-editor.component.html',
  styleUrls: ['./product-editor.component.scss']
})
export class ProductEditorComponent implements OnInit {

  product$: Observable<Product> = this.activatedRoute.params.pipe(
    switchMap( params => this.ProductService.get(params['id']))
  )

  constructor(
    private activatedRoute: ActivatedRoute,
    private ProductService: ProductService,
  ) { }

  ngOnInit(): void {
  }

}
