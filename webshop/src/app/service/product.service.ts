import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from '../model/product';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService extends BaseService<Product> {
  constructor(private http: HttpClient) {
    super(http, 'product');
  }

  actives(): Observable<Product[]> {
    return this.getAll().pipe(map((products) => 
      products.filter(product => product.active)
    ));
  }

}
