import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SampleLaunchpadPageComponent } from './sample-launchpad-page.component';

describe('SampleLaunchpadPageComponent', () => {
  let component: SampleLaunchpadPageComponent;
  let fixture: ComponentFixture<SampleLaunchpadPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SampleLaunchpadPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SampleLaunchpadPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
