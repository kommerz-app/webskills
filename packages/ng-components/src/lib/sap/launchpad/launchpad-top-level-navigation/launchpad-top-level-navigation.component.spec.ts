import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaunchpadTopLevelNavigationComponent } from './launchpad-top-level-navigation.component';

describe('LaunchpadTopLevelNavigationComponent', () => {
  let component: LaunchpadTopLevelNavigationComponent;
  let fixture: ComponentFixture<LaunchpadTopLevelNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LaunchpadTopLevelNavigationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LaunchpadTopLevelNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
