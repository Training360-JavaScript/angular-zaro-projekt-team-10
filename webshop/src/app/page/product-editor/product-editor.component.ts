import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/service/product.service';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/service/category.service';
import { Category } from 'src/app/model/category';
import { BillStatus } from 'src/app/model/bill';

@Component({
  selector: 'app-product-editor',
  templateUrl: './product-editor.component.html',
  styleUrls: ['./product-editor.component.scss']
})
export class ProductEditorComponent implements OnInit {

  product$: Observable<Product> = this.activatedRoute.params.pipe(
    switchMap( params => this.ProductService.get(params['id']))
  )

  categories$: Observable<Category[]> = this.categoryService.getAll();
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private ProductService: ProductService,
    private categoryService: CategoryService,
    private router: Router,
  ) {   }

  ngOnInit(): void {
  }

  onUpdate(product: Product): void {
    this.ProductService.update(product).subscribe(
      product => this.router.navigate(['/', 'products'])
    )
  }
}
