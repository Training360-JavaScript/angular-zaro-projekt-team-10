import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Bill } from 'src/app/model/bill';
import { switchMap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { BillService } from 'src/app/service/bill.service';

@Component({
  selector: 'app-bill-editor',
  templateUrl: './bill-editor.component.html',
  styleUrls: ['./bill-editor.component.scss']
})
export class BillEditorComponent implements OnInit {

  bill$: Observable<Bill> = this.activatedRoute.params.pipe(
    switchMap( params => this.BillService.get(params['id']))
  )

  constructor(
    private activatedRoute: ActivatedRoute,
    private BillService: BillService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  onUpdate(bill: Bill): void {
    this.BillService.update(bill).subscribe(
      bill => this.router.navigate(['/', 'bills'])
    )
  }

}
