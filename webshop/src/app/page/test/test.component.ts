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
  ) { 
  }
  
  product: Observable<Product> = this.productService.get(1);

  onAdd() {
    const product = new Product();
    product.id = 0;
    product.name = 'new product to test';
    product.description = 'This is the description';
    product.type = 'WTF is this field?';
    product.catID = 1;
    product.price = 999;
    product.active = true;
    product.featured = false;

    this.productService.add(product).subscribe(
      (value) => { console.log(value); },
      (err) => { console.error(err); }
    );
  }

  onDelete() {
    this.productService.delete(1).subscribe(
      (value) => { console.log('deleted'); },
      (err) => { console.error(err); }
    );
  }

  onUpdate() {
    const product = new Product();
    product.id = 1;
    product.name = 'updated product to test';
    product.description = 'This is the new description';
    product.type = 'WTF is this field?';
    product.catID = 1;
    product.price = 9999;
    product.active = false;
    product.featured = false;

    this.productService.update(product).subscribe(
      (value) => { console.log(value); },
      (err) => { console.error(err); }
    );
  }

  ngOnInit(): void {
  }

}
