import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './common/sidebar/sidebar.component';
import { HomeComponent } from './page/home/home.component';
import { GenericTableComponent } from './common/generic-table/generic-table.component';
import { HeaderComponent } from './common/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { TestComponent } from './page/test/test.component';
import { ProductEditorComponent } from './page/product-editor/product-editor.component';
import { CategoryEditorComponent } from './page/category-editor/category-editor.component';
import { AddressEditorComponent } from './page/address-editor/address-editor.component';
import { CustomerEditorComponent } from './page/customer-editor/customer-editor.component';
import { OrderEditorComponent } from './page/order-editor/order-editor.component';
import { BillEditorComponent } from './page/bill-editor/bill-editor.component';
import { ProductListComponent } from './page/product-list/product-list.component';
import { SorterPipe } from './pipe/sorter.pipe';
import { StringCutterPipe } from './pipe/string-cutter.pipe';
import { FilterPipe } from './pipe/filter.pipe';
import { CustomerListComponent } from './page/customer-list/customer-list.component';
import { OrderListComponent } from './page/order-list/order-list.component';
import { BillListComponent } from './page/bill-list/bill-list.component';
import { CategoryListComponent } from './page/category-list/category-list.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HomeComponent,
    HeaderComponent,
    GenericTableComponent,
    ProductEditorComponent,
    CategoryEditorComponent,
    AddressEditorComponent,
    CustomerEditorComponent,
    OrderEditorComponent,
    BillEditorComponent,
    TestComponent,
    ProductListComponent,
    SorterPipe,
    StringCutterPipe,
    FilterPipe,
    CustomerListComponent,
    OrderListComponent,
    BillListComponent,
    CategoryListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
