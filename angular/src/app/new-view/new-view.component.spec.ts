import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewViewComponent } from './new-view.component';

describe('NewViewComponent', () => {
  let component: NewViewComponent;
  let fixture: ComponentFixture<NewViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewViewComponent]
    });
    fixture = TestBed.createComponent(NewViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
