import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-generic-table',
  templateUrl: './generic-table.component.html',
  styleUrls: ['./generic-table.component.scss']
})

export class GenericTableComponent<T extends {[propname: string]: any}> {

  @Input() entity: Observable<any> = new Observable();
  @Input() columns: string[] = [];
  @Input() listName: string = '';
  @Input() color: string[] = [];

  @Output() deleteOne: EventEmitter<T> = new EventEmitter<T>();

  constructor() { }

  onDelete(entity: T): void {
    this.deleteOne.emit(entity);
  }
}
