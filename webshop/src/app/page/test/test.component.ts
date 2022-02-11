import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  constructor(
    private productService: ProductService
  ) { }
  
  products: Observable<Product[]> = this.productService.getAll();
  product: Observable<Product> = this.productService.get(1);
  
  ngOnInit(): void {
  }

}
