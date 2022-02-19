import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderlineEditorComponent } from './orderline-editor.component';

describe('OrderlineEditorComponent', () => {
  let component: OrderlineEditorComponent;
  let fixture: ComponentFixture<OrderlineEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderlineEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderlineEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
