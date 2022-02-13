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

  sorterKey: string = 'id';
  sorterDirection: number = 1;
  phrase: string = '';

  constructor() { }

  onDelete(entity: T): void {
    this.deleteOne.emit(entity);
  }

  onSort(key: string): void {
    if (key === this.sorterKey) {
      this.sorterDirection *= -1;
    } else {
      this.sorterDirection = 1;
    }

    this.sorterKey = key;
  }

}
