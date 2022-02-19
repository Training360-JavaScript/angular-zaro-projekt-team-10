import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/model/customer';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from 'src/app/service/customer.service';
import { Address } from 'src/app/model/address';
import { AddressService } from 'src/app/service/address.service';

@Component({
  selector: 'app-customer-editor',
  templateUrl: './customer-editor.component.html',
  styleUrls: ['./customer-editor.component.scss']
})
export class CustomerEditorComponent implements OnInit {

  customer$: Observable<Customer> = this.activatedRoute.params.pipe(
    switchMap( params => this.CustomerService.get(params['id']))
  )

  addresses$: Observable<Address[]> = this.AddressService.getAll();

  constructor(
    private activatedRoute: ActivatedRoute,
    private CustomerService: CustomerService,
    private AddressService: AddressService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  onUpdate(customer: Customer): void {
    this.CustomerService.update(customer).subscribe(
      customer => this.router.navigate(['/', 'customers'])
    )
  }
}
