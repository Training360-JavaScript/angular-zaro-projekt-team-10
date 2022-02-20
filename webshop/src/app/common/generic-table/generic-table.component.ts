import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';

import { registerLocaleData } from '@angular/common';
import localeHu from '@angular/common/locales/hu';
registerLocaleData(localeHu, 'hu');

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

  draggedColumnIndex: number = 0;

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

  public arrayMove(arr: string[], from: number, to: number) {
    let cutOut = arr.splice(from, 1)[0]; // remove the dragged element at index 'from'
    arr.splice(to, 0, cutOut);            // insert it at index 'to'
  }

  public dragStartColumn(index: number) {
    this.draggedColumnIndex = index;
  }

  public allowDrop(event: Event) {
    event.preventDefault();
  }

  public dropColumn(index: number, columns: string[]) {
    this.arrayMove(columns, this.draggedColumnIndex, index);
  }

}
