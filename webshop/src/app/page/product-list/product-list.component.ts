import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { Product, ProductDisplay } from 'src/app/model/product';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  products$: Observable<ProductDisplay[]> = this.activatedRoute.queryParams.pipe(
    switchMap((params) => {
      return params['actives'] 
        ? this.productService.getActivesDisplay() 
        : this.productService.getAllDisplay();
    }) 
  );
  columns: string[] = [];
  listName: string = 'product';
  color: string[] = ['bg-success', 'btn-outline-success'];

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
  ) {
    const temp = new ProductDisplay();
    this.columns =  Object.getOwnPropertyNames(temp);
    this.columns.splice(this.columns.findIndex(col => col === 'catID'), 1);
    this.columns.splice(this.columns.findIndex(col => col === 'type'), 1);
  }

  ngOnInit(): void {
  }

  onDeleteOne(product: Product): void {
    if (window.confirm('Biztosan törli ezt a terméket?')) {
      this.productService.delete(product.id).subscribe(
        () => this.products$ = this.productService.getAllDisplay()
      )
      // this.toastr.showSuccessWithTimeout(`
      // <table class="table">
      //   <thead>
      //     <tr>
      //       <th>Termék azonosítója</th>
      //     </tr>
      //   </thead>
      //   <tbody>
      //     <tr>
      //       <td>${product._id}</td>
      //     </tr>
      //   </tbody>
      // </table>
      // </span>`,
      //   "A termék sikeresen törlődött:",
      //   5000)
    }
  }

}
