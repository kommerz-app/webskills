import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SplitButtonComponent } from './split-button.component';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

describe('SplitButtonComponent', () => {
  let component: SplitButtonComponent;
  let fixture: ComponentFixture<SplitButtonComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [SplitButtonComponent, MatIconModule, MatMenuModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SplitButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
