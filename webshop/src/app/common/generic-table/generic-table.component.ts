import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderLine } from 'src/app/model/order-line';

@Component({
  selector: 'app-generic-table',
  templateUrl: './generic-table.component.html',
  styleUrls: ['./generic-table.component.scss']
})

export class GenericTableComponent<T extends {[propname: string]: any, id: number}> {

  @Input() entity: Observable<any> = new Observable();
  @Input() columns: string[] = [];
  @Input() listName: string = '';
  @Input() color: string[] = [];
  
  @Input() detailColums: string[] = [];
  @Input() detailLines: Map<number, Observable<any>> = new Map<number, Observable<any>>();
  @Input() detailListName: string = '';

  @Output() deleteOne: EventEmitter<T> = new EventEmitter<T>();
  @Output() openDetail: EventEmitter<number> = new EventEmitter<number>();
  @Output() deleteDetail: EventEmitter<number> = new EventEmitter<number>();

  sorterKey: string = 'id';
  sorterDirection: number = 1;
  phrase: string = '';

  draggedColumnIndex: number = 0;

  hasDetail: boolean = false;
  
  constructor() {
    this.hasDetail = this.detailColums && this.detailColums.length > 0;
  }

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

  onDetailOpen(entity: T): void {
    const btn = document.querySelector('#detailbutton-' + entity.id);
    const caret = btn?.querySelector('i');
    if (btn?.attributes.getNamedItem('aria-expanded')?.value == "false") {
      caret?.classList.remove('fa-caret-down');
      caret?.classList.add('fa-caret-up');      
    } else {
      caret?.classList.remove('fa-caret-up');
      caret?.classList.add('fa-caret-down');      
    }
    this.openDetail.emit(entity.id);
  }

  onDeleteDetail(detailId: number): void {
    this.deleteDetail.emit(detailId);
  }

  getDetailLines(masterId: number): Observable<any> {
    return this.detailLines.get(masterId) ?? new Observable();
  }
}
