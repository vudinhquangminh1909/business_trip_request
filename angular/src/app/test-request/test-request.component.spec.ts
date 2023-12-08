import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestRequestComponent } from './TestRequestComponent';

describe('TestRequestComponent', () => {
  let component: TestRequestComponent;
  let fixture: ComponentFixture<TestRequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestRequestComponent]
    });
    fixture = TestBed.createComponent(TestRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
