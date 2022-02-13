import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './page/home/home.component';
import { TestComponent } from './page/test/test.component';
import { ProductEditorComponent } from './page/product-editor/product-editor.component';
import { CategoryEditorComponent } from './page/category-editor/category-editor.component';
import { AddressEditorComponent } from './page/address-editor/address-editor.component';
import { CustomerEditorComponent } from './page/customer-editor/customer-editor.component';
import { OrderEditorComponent } from './page/order-editor/order-editor.component';
import { BillEditorComponent } from './page/bill-editor/bill-editor.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'test',
    component: TestComponent,
  },
  {
    path: 'product/edit/:id',
    component: ProductEditorComponent,
  },
  {
    path: 'category/edit/:id',
    component: CategoryEditorComponent,
  },
  {
    path: 'address/edit/:id',
    component: AddressEditorComponent,
  },
  {
    path: 'customer/edit/:id',
    component: CustomerEditorComponent,
  },
  {
    path: 'order/edit/:id',
    component: OrderEditorComponent,
  },
  {
    path: 'bill/edit/:id',
    component: BillEditorComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
