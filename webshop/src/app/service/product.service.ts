import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, Observable } from 'rxjs';
import { Product, ProductDisplay } from '../model/product';
import { BaseService } from './base.service';
import { CategoryService } from './category.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService extends BaseService<Product> {
  constructor(
    private http: HttpClient,
    private catService: CategoryService
  ) {
    super(http, 'product');
  }

  getAllDisplay(): Observable<ProductDisplay[]> {
    const join$ = forkJoin({
      products: this.getAll(),
      categories: this.catService.getAll()
    });

    return join$.pipe(
      map((result) => {
        return result.products.map((product) => {
          return new ProductDisplay(
            product.id,
            product.name,
            product.description,
            product.catID,
            result.categories.find((category) => category.id === product.catID)?.name ?? '' + product.catID,
            product.type,
            product.price,
            product.featured,
            product.active,
          );
        })
      })
    );
  }

  getActivesDisplay(): Observable<ProductDisplay[]> {
    return this.getAllDisplay().pipe(map((products) => 
      products.filter(product => product.active)
    ));
  }

}
