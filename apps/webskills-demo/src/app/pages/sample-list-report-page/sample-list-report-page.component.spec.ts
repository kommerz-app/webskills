import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SampleListReportPageComponent } from './sample-list-report-page.component';

describe('SampleListReportPageComponent', () => {
  let component: SampleListReportPageComponent;
  let fixture: ComponentFixture<SampleListReportPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SampleListReportPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SampleListReportPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
