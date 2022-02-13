import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActiveCustomers, ActiveProducts, NewOrders, NotPayedBills, ShippedOrders } from 'src/app/model/dashboard';
import { DashboardService } from 'src/app/service/dashboard.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private dashboardService: DashboardService
  ) { }

  activeCustomers: Observable<ActiveCustomers> = this.dashboardService.activeCustomers();
  activeProducts: Observable<ActiveProducts> = this.dashboardService.activeProducts();
  newOrders: Observable<NewOrders> = this.dashboardService.newOrders();
  shippedOrders: Observable<ShippedOrders> = this.dashboardService.shippedOrders();
  notPayedBills: Observable<NotPayedBills> = this.dashboardService.notPayedBills();

  ngOnInit(): void {
  }

}
