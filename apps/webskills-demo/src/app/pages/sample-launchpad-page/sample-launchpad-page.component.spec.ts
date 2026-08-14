import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { SampleLaunchpadPageComponent } from './sample-launchpad-page.component';

describe('SampleLaunchpadPageComponent', () => {
  let fixture: ComponentFixture<SampleLaunchpadPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SampleLaunchpadPageComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(SampleLaunchpadPageComponent);
    await fixture.whenStable();
  });

  it('should render the launchpad and its top level navigation', () => {
    // Given the launchpad page

    // When it has been rendered
    const element: HTMLElement = fixture.nativeElement;

    // Then both library components are present
    expect(element.querySelector('wsk-launchpad')).not.toBeNull();
    expect(
      element.querySelector('wsk-launchpad-top-level-navigation'),
    ).not.toBeNull();
  });

  it('should offer a tile for every configured group', () => {
    // Given the launchpad page
    const component = fixture.componentInstance;

    // When its groups are inspected
    const groupTitles = component.groups.map((group) => group.groupTitle);

    // Then both sample floorplans can be reached
    expect(groupTitles).toEqual(['Object page', 'List report page']);
  });
});
