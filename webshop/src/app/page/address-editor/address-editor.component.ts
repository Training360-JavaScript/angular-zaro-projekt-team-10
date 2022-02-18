import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Address } from 'src/app/model/address';
import { switchMap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AddressService } from 'src/app/service/address.service';

@Component({
  selector: 'app-address-editor',
  templateUrl: './address-editor.component.html',
  styleUrls: ['./address-editor.component.scss']
})
export class AddressEditorComponent implements OnInit {

  address$: Observable<Address> = this.activatedRoute.params.pipe(
    switchMap( params => this.AddressService.get(params['id']))
  )

  constructor(
    private activatedRoute: ActivatedRoute,
    private AddressService: AddressService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  onUpdate(address: Address): void {
    this.AddressService.update(address).subscribe(
      address => this.router.navigate(['/', 'addresses'])
    )
  }

}
