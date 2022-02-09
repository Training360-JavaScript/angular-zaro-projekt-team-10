import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Product } from '../model/product';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends BaseService<Product> {
  constructor(
    private http2: HttpClient
  ) {
    super(http2);
    this.entityUrl = environment.backendUrl + 'product'
  }

}
