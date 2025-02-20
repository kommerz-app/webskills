import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaunchpadSpaceComponent } from './launchpad-space.component';

describe('LaunchpadSpaceComponent', () => {
  let component: LaunchpadSpaceComponent;
  let fixture: ComponentFixture<LaunchpadSpaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LaunchpadSpaceComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LaunchpadSpaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
