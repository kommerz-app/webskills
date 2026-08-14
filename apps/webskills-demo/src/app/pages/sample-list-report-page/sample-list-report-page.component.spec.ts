import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { SampleListReportPageComponent } from './sample-list-report-page.component';

describe('SampleListReportPageComponent', () => {
  let fixture: ComponentFixture<SampleListReportPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SampleListReportPageComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(SampleListReportPageComponent);
    await fixture.whenStable();
  });

  it('should render the list report floorplan', () => {
    // Given the list report page

    // When it has been rendered
    const element: HTMLElement = fixture.nativeElement;

    // Then the library floorplan is present
    expect(element.querySelector('wsk-list-report')).not.toBeNull();
  });

  it('should render a filter field for every filter', () => {
    // Given the list report page

    // When its filter fields are counted
    const fields =
      fixture.nativeElement.querySelectorAll('mat-form-field').length;

    // Then each of the five sample filters has one
    expect(fields).toBe(5);
  });
});
