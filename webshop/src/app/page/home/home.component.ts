import { Component, NgModule, OnInit } from '@angular/core';
import { ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { Observable } from 'rxjs';
import { Bill } from 'src/app/model/bill';
import {
  ActiveCustomers,
  ActiveProducts,
  NewOrders,
  NotPayedBills,
  ShippedOrders,
} from 'src/app/model/dashboard';
import { BillService } from 'src/app/service/bill.service';
import { DashboardService } from 'src/app/service/dashboard.service';
import { Customer } from 'src/app/model/customer';
import { CustomerService } from 'src/app/service/customer.service';
import { CategoryService } from 'src/app/service/category.service';
import { Category } from 'src/app/model/category';
import { ProductService } from 'src/app/service/product.service';
import { Product } from 'src/app/model/product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  billList$: Observable<Bill[]> = this.billService.getAll();
  customerList$: Observable<Customer[]> = this.customerService.getAll();
  categoryList$: Observable<Category[]> = this.categoryService.getAll();
  productList$: Observable<Product[]> = this.productService.getAll();

  categoryChartData: ChartDataSets[] = [
    {
      data: [0],
      label: 'aktív  ',
      borderColor: ['#fff'],
      borderWidth: [2],
    },
    {
      data: [1],
      label: 'inaktív  ',
      borderColor: ['#fff'],
      borderWidth: [2],
    },
  ];
  categoryChartLabels: Label[] = [''];
  categoryChartColor: Color[] = [
    {
      backgroundColor: ['rgba(180, 250, 150, 0.9)'],
    },
    {
      backgroundColor: ['rgba(110, 215, 110, 0.9)'],
    },
    {
      backgroundColor: ['rgba(255,255,200,.8)'],
    },
  ];

  billChartData: ChartDataSets[] = [{ data: [0, 0] }];
  billChartLabels: Label[] = ['új számlák száma', 'kifizetett számlák száma'];
  billChartColor: Color[] = [
    {
      backgroundColor: ['rgba(0,230,230,.9)', 'rgba(10, 160, 180, 0.9)'],
    },
  ];

  billSumChartLabels: Label[] = [
    'új számlák összege',
    'kifizetett számlák összege',
  ];
  billSumChartData: ChartDataSets[] = [{ data: [0, 0] }];
  billSumChartColor: Color[] = [
    {
      backgroundColor: ['rgba(0,170,170,.9)', 'rgba(10, 110, 130, 0.9)'],
    },
  ];
  barChartLegend: string = 'Számlák száma';

  customerChartData: ChartDataSets[] = [
    {
      data: [0, 0],
    },
  ];
  customerChartLabels: Label[] = ['aktív vásárlók', 'inaktív vásárlók'];
  customerChartColor: Color[] = [
    {
      backgroundColor: ['rgba(255, 190, 20, 0.9)', 'rgba(255,255,150,.8)'],
    },
  ];

  constructor(
    private dashboardService: DashboardService,
    private billService: BillService,
    private customerService: CustomerService,
    private categoryService: CategoryService,
    private productService: ProductService
  ) {}

  activeCustomers: Observable<ActiveCustomers> =
    this.dashboardService.activeCustomers();
  activeProducts: Observable<ActiveProducts> =
    this.dashboardService.activeProducts();
  newOrders: Observable<NewOrders> = this.dashboardService.newOrders();
  shippedOrders: Observable<ShippedOrders> =
    this.dashboardService.shippedOrders();
  notPayedBills: Observable<NotPayedBills> =
    this.dashboardService.notPayedBills();

  ngOnInit(): void {
    this.categoryList$.subscribe((data) => {

      let catCount: number[] = [];

      data.map((o, i) => {
        this.productList$.subscribe((p) => {
          catCount[i] = p.filter((curr) => curr.catID === o.id).length;
        this.categoryChartData[i] = {
          data: [catCount[i]],
          label: o.name,
          borderColor: ['#fff'],
          borderWidth: [2],
          backgroundColor: `rgba(${Math.floor(Math.random() * 255)},
                                       ${Math.floor(Math.random() * 255)},
                                       ${Math.floor(Math.random() * 255)},
                                       .7)`,
        };
        });
      });

    });

    this.billList$.subscribe((data) => {
      //Bill chart
      const newBills: number = data.filter((o) => o.status === 'new').length;
      const paidBills: number = data.filter((o) => o.status === 'paid').length;
      const newBillsSum: number = data
        .filter((o) => o.status === 'new')
        .reduce((acc, one) => acc + parseInt('' + one.amount), 0);
      const paidBillsSum: number = data
        .filter((o) => o.status === 'paid')
        .reduce((acc, one) => acc + parseInt('' + one.amount), 0);

      this.billChartData[0].data = [newBills, paidBills];
      this.billSumChartData[0].data = [newBillsSum, paidBillsSum];
    });

    this.customerList$.subscribe((data) => {
      //Customer chart
      const activeCustomers: number = data.filter((o) => o.active).length;
      const inactiveCustomers: number = data.filter(
        (o) => o.active === false
      ).length;

      this.customerChartData[0].data = [activeCustomers, inactiveCustomers];
    });

    this.billService.getAll();
    this.customerService.getAll();
  }
}
