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
import { ProductListComponent } from './page/product-list/product-list.component';
import { CustomerListComponent } from './page/customer-list/customer-list.component';
import { OrderListComponent } from './page/order-list/order-list.component';
import { BillListComponent } from './page/bill-list/bill-list.component';
import { CategoryListComponent } from './page/category-list/category-list.component';

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
  {
    path: 'products',
    component: ProductListComponent,
  },
  {
    path: 'customers',
    component: CustomerListComponent,
  },
  {
    path: 'orders',
    component: OrderListComponent,
  },
  {
    path: 'bills',
    component: BillListComponent,
  },
  {
    path: 'categories',
    component: CategoryListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
