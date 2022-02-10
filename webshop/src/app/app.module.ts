import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { GenericTableModule } from '@angular-generic-table/core';
// import { GenericTableModule } from 'angular-generic-table';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './common/sidebar/sidebar.component';
import { HomeComponent } from './page/home/home.component';
import { HeaderComponent } from './common/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HomeComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GenericTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
