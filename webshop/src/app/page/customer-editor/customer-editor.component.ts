import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/model/customer';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from 'src/app/service/customer.service';

@Component({
  selector: 'app-customer-editor',
  templateUrl: './customer-editor.component.html',
  styleUrls: ['./customer-editor.component.scss']
})
export class CustomerEditorComponent implements OnInit {

  customer$: Observable<Customer> = this.activatedRoute.params.pipe(
    switchMap( params => this.CustomerService.get(params['id']))
  )

  constructor(
    private activatedRoute: ActivatedRoute,
    private CustomerService: CustomerService,
  ) { }

  ngOnInit(): void {
  }

}
