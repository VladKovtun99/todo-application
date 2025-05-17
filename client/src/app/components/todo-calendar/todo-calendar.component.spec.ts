import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoCalendarComponent } from './todo-calendar.component';

describe('TodoCalendarComponent', () => {
  let component: TodoCalendarComponent;
  let fixture: ComponentFixture<TodoCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoCalendarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
