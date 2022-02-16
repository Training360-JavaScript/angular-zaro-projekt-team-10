import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  products$: Observable<Product[]> = this.productService.getAll();
  columns: string[] = [];
  listName: string = 'product';
  color: string[] = ['bg-success', 'btn-outline-success'];

  constructor(
    private productService: ProductService,
  ) {
    const temp = new Product();
    this.columns =  Object.getOwnPropertyNames(temp);

  }

  ngOnInit(): void {
  }

  onDeleteOne(product: Product): void {
    if (window.confirm('Biztosan törli ezt a terméket?')) {
      this.productService.delete(product.id).subscribe(
        () => this.products$ = this.productService.getAll()
      )
    }
  }

}
