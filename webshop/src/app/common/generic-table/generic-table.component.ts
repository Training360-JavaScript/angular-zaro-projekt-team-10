import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
// import { GtConfig } from '@angular-generic-table/core';
// import { GtConfig } from 'angular-generic-table';


@Component({
  selector: 'app-generic-table',
  templateUrl: './generic-table.component.html',
  styleUrls: ['./generic-table.component.scss']
})
export class GenericTableComponent {

  @Input() entity: Observable<any> = new Observable();
  @Input() columns: string[] = [];


  constructor() { }
}
