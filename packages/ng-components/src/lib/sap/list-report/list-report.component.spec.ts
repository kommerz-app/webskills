import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListReportComponent } from './list-report.component';

window.ResizeObserver =
  window.ResizeObserver ||
  jest.fn().mockImplementation(() => ({
    disconnect: jest.fn(),
    observe: jest.fn(),
    unobserve: jest.fn(),
  }));

describe('ListReportComponent', () => {
  let component: ListReportComponent;
  let fixture: ComponentFixture<ListReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListReportComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
